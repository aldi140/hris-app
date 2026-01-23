<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

use App\Exports\UsersExport; // Import Export Class yang baru Anda buat
use App\Imports\UsersImport; // Import Import Class yang baru Anda buat
use Maatwebsite\Excel\Facades\Excel; // Import Facade Excel

class UserController extends Controller
{
    public function index()
    {
        $data = new User;
        if (count($data->with('karyawan', 'karyawan.jabatan', 'karyawan.departemen')->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan.jabatan', 'karyawan.departemen')->get(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            // $id = IdGenerator::generate(['table' => 'ak_jeniskurikulum','field' => 'kodekurikulum','length' => 10, 'prefix' =>date('m')]);

            $User = new User;
            $User->name = $request->get('name');
            $User->email = $request->get('email');
            $User->user_at = 'System';
            $User->save();
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil menambahkan data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            User::where('id',$id)->update([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'user_at' => 'System',
            ]);

            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil mengganti data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            User::where('id',$id)->delete();
            return response()->json(
                [
                    'status' => true,
                    'message' => 'Berhasil menghapus data',
                ],Response::HTTP_OK);

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function setupRolesAndPermissions()
    {
        // 1. Reset cache izin (penting setelah perubahan)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 2. Buat Roles
        $roleAdmin = Role::create(['name' => 'admin']);
        $roleEditor = Role::create(['name' => 'editor']);
        $roleUser = Role::create(['name' => 'user']);

        // 3. Buat Permissions
        $permissionCreatePost = Permission::create(['name' => 'create post']);
        $permissionEditPost = Permission::create(['name' => 'edit post']);
        $permissionDeletePost = Permission::create(['name' => 'delete post']);
        $permissionPublishPost = Permission::create(['name' => 'publish post']);
        $permissionManageUsers = Permission::create(['name' => 'manage users']);

        // 4. Berikan Permissions ke Roles
        $roleAdmin->givePermissionTo([$permissionCreatePost, $permissionEditPost, $permissionDeletePost, $permissionPublishPost, $permissionManageUsers]);
        $roleEditor->givePermissionTo([$permissionCreatePost, $permissionEditPost, $permissionPublishPost]);
        // Role 'user' tidak diberi permission khusus di sini, hanya akan memiliki role saja.

        // 5. Berikan Role ke User (contoh)
        $user = User::find(1); // Ambil user dengan ID 1
        if ($user) {
            $user->assignRole($roleAdmin); // Berikan role 'admin'
            // Atau $user->assignRole('admin');
        }

        $anotherUser = User::find(2); // Ambil user dengan ID 2
        if ($anotherUser) {
            $anotherUser->assignRole('editor'); // Berikan role 'editor'
        }

        // 6. Memberikan permission langsung ke user (jarang, tapi bisa)
        // $user->givePermissionTo('delete post');

        return response()->json(['message' => 'Roles and permissions setup complete!']);
    }

    public function checkUserPermissions(Request $request, $userId)
    {
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $canEdit = $user->hasPermissionTo('edit post');
        $hasAdminRole = $user->hasRole('admin');
        $canManageUsers = $user->can('manage users'); // Alias dari hasPermissionTo

        return response()->json([
            'user_id' => $user->id,
            'name' => $user->name,
            'roles' => $user->getRoleNames(), // Mendapatkan nama-nama role user
            'permissions' => $user->getAllPermissions()->pluck('name'), // Mendapatkan semua permission (dari role dan langsung)
            'can_edit_post' => $canEdit,
            'has_admin_role' => $hasAdminRole,
            'can_manage_users' => $canManageUsers,
        ]);
    }

    public function exportUsers()
    {
        $fileName = 'users_' . date('Ymd_His') . '.xlsx';
        // Panggil Facade Excel dan metode download()
        return Excel::download(new UsersExport, $fileName);
    }

    public function importUsers(Request $request)
    {
        // Validasi file yang diunggah
        $this->validate($request, [
            'file' => 'required|mimes:xls,xlsx,csv' // Pastikan file adalah Excel/CSV
        ]);

        // Pastikan ada file yang diunggah
        if ($request->hasFile('file')) {
            try {
                // Panggil Facade Excel dan metode import()
                Excel::import(new UsersImport, $request->file('file'));

                return response()->json([
                    'message' => 'Data pengguna berhasil diimpor!'
                ], 200);

            } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
                $failures = $e->failures();

                $errors = [];
                foreach ($failures as $failure) {
                    $errors[] = [
                        'row' => $failure->row(),
                        'attribute' => $failure->attribute(),
                        'errors' => $failure->errors(),
                        'values' => $failure->values()
                    ];
                }
                return response()->json([
                    'message' => 'Gagal mengimpor data karena validasi.',
                    'errors' => $errors
                ], 422); // Unprocessable Entity
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Terjadi kesalahan saat mengimpor data.',
                    'error' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'message' => 'Tidak ada file yang diunggah.'
        ], 400); // Bad Request
    }
}