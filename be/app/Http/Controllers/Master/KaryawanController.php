<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\KaryawanModel;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class KaryawanController extends Controller
{
    public function index()
    {
        $data = new KaryawanModel;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->all(),
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
        // Mendefinisikan aturan validasi
        $rules = [
            'nik' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            // 'price' => 'required|numeric|min:0',
            // 'stock' => 'required|integer|min:0',
            'id_jabatan' => 'required|integer|exists:ms_jabatan,id', // Contoh aturan exists
        ];

        // Mendefinisikan pesan kesalahan custom
        $messages = [
            'nik.required' => 'NIK wajib diisi.',
            'nama.required' => 'Nama wajib diisi.',
            'nama.string' => 'Nama karyawan harus berupa teks.',
            'nama.max' => 'Nama karyawan tidak boleh lebih dari :max karakter.',
            // 'price.required' => 'Harga produk wajib diisi.',
            // 'price.numeric' => 'Harga produk harus berupa angka.',
            // 'price.min' => 'Harga produk tidak boleh kurang dari :min.',
            // 'stock.required' => 'Stok produk wajib diisi.',
            // 'stock.integer' => 'Stok produk harus berupa bilangan bulat.',
            // 'stock.min' => 'Stok produk tidak boleh kurang dari :min.',
            'id_jabatan.required' => 'Jabatan karyawan wajib dipilih.',
            // 'id_jabatan.integer' => 'ID kategori harus berupa bilangan bulat.',
            'id_jabatan.exists' => 'Jabatan yang dipilih tidak valid atau tidak ditemukan.',
            // Anda juga bisa membuat pesan custom untuk semua aturan 'required' sekaligus:
            // 'required' => 'Kolom :attribute wajib diisi.',
            // Catatan: :attribute akan diganti dengan nama kolom (name, price, stock, category_id)
        ];

        // Melakukan validasi
        $validator = Validator::make($request->all(), $rules, $messages);

        // $validator = Validator::make($request->all(),[
        //     'golongan' => 'required',
        //     'gapok' => 'required',
        //     'tgl_aktif' => 'required',
        // ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            // $id = IdGenerator::generate(['table' => 'ak_jeniskurikulum','field' => 'kodekurikulum','length' => 10, 'prefix' =>date('m')]);

            $data_save = new KaryawanModel;
            $data_save->id_jabatan = $request->get('id_jabatan');
            $data_save->id_departemen = $request->get('id_departemen');
            $data_save->nik = $request->get('nik');
            $data_save->nama = $request->get('nama');
            $data_save->jenis_kelamin = $request->get('jenis_kelamin');
            $data_save->tgl_lahir = $request->get('tgl_lahir');
            $data_save->tempat_lahir = $request->get('tempat_lahir');
            $data_save->alamat = $request->get('alamat');
            $data_save->alamat_domisili = $request->get('alamat_domisili');
            $data_save->ktp = $request->get('ktp');
            $data_save->bpjs_kesehatan = $request->get('bpjs_kesehatan');
            $data_save->bpjs_ketenagakerjaan = $request->get('bpjs_ketenagakerjaan');
            $data_save->npwp = $request->get('npwp');
            $data_save->ijazah = $request->get('ijazah');
            $data_save->file_ktp = $request->get('file_ktp');
            $data_save->file_bpjs_kesehatan = $request->get('file_bpjs_kesehatan');
            $data_save->file_bpjs_ketenagakerjaan = $request->get('file_bpjs_ketenagakerjaan');
            $data_save->file_npwp = $request->get('file_npwp');
            $data_save->file_ijazah = $request->get('file_ijazah');
            $data_save->file_sertifikat = $request->get('file_sertifikat');
            $data_save->tgl_masuk = $request->get('tgl_masuk');
            // $data_save->tgl_keluar = $request->get('tgl_keluar');
            $data_save->status_karyawan = $request->get('status_karyawan');
            $data_save->status_kawin = $request->get('status_kawin');
            $data_save->user_at = 'System';
            $data_save->save();
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
        // Mendefinisikan aturan validasi
        $rules = [
            'nik' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'id_jabatan' => 'required|integer|exists:ms_jabatan,id', // Contoh aturan exists
        ];

        // Mendefinisikan pesan kesalahan custom
        $messages = [
            'nik.required' => 'NIK wajib diisi.',
            'nama.required' => 'Nama wajib diisi.',
            'nama.string' => 'Nama karyawan harus berupa teks.',
            'nama.max' => 'Nama karyawan tidak boleh lebih dari :max karakter.',
            'id_jabatan.required' => 'Jabatan karyawan wajib dipilih.',
            'id_jabatan.exists' => 'Jabatan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        // Melakukan validasi
        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            KaryawanModel::where('id',$id)->update([
                'id_jabatan' => $request->get('id_jabatan'),
                'id_departemen' => $request->get('id_departemen'),
                'nik' => $request->get('nik'),
                'golongan' => $request->get('golongan'),
                'gapok' => $request->get('gapok'),
                'nama' => $request->get('nama'),
                'jenis_kelamin' => $request->get('jenis_kelamin'),
                'tgl_lahir' => $request->get('tgl_lahir'),
                'tempat_lahir' => $request->get('tempat_lahir'),
                'alamat' => $request->get('alamat'),
                'alamat_domisili' => $request->get('alamat_domisili'),
                'ktp' => $request->get('ktp'),
                'bpjs_kesehatan' => $request->get('bpjs_kesehatan'),
                'bpjs_ketenagakerjaan' => $request->get('bpjs_ketenagakerjaan'),
                'npwp' => $request->get('npwp'),
                'ijazah' => $request->get('ijazah'),
                'file_ktp' => $request->get('file_ktp'),
                'file_bpjs_kesehatan' => $request->get('file_bpjs_kesehatan'),
                'file_bpjs_ketenagakerjaan' => $request->get('file_bpjs_ketenagakerjaan'),
                'file_npwp' => $request->get('file_npwp'),
                'file_ijazah' => $request->get('file_ijazah'),
                'file_sertifikat' => $request->get('file_sertifikat'),
                'tgl_masuk' => $request->get('tgl_masuk'),
                'tgl_keluar' => $request->get('tgl_keluar'),
                'status_karyawan' => $request->get('status_karyawan'),
                'status_kawin' => $request->get('status_kawin'),
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
            KaryawanModel::where('id',$id)->delete();
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
}