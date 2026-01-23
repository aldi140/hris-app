<?php
namespace App\Http\Controllers\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transaksi\KaryawanCutiModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class KryCutiController extends Controller
{
    public function index()
    {
        $data = new KaryawanCutiModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan_pengganti', 'cuti')->get(),
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
        $rules = [
            'id_karyawan' => 'required|integer|exists:ms_karyawan,id',
            'id_karyawan_pengganti' => 'required|integer|exists:ms_karyawan,id',
            'id_cuti' => 'required|integer|exists:ms_cuti,id',
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
            'id_karyawan_pengganti.required' => 'Karyawan pengganti wajib diisi.',
            'id_karyawan_pengganti.exists' => 'Karyawan pengganti yang dipilih tidak valid atau tidak ditemukan.',
            'id_cuti.required' => 'Jenis cuti wajib diisi.',
            'id_cuti.exists' => 'jenis cuti yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $no_dokumen = IdGenerator::generate(['table' => 'trx_karyawan_cuti','field' => 'no_dokumen','length' => 11, 'prefix' =>"I.".date('ym')]);

            $fileName['nama'] = '';
            if($request->file('attachment_path')){
                $fileName = uploadFile($request->file('attachment_path'),'CT');
            }

            $data_save = new KaryawanCutiModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->id_karyawan_pengganti = $request->get('id_karyawan_pengganti');
            $data_save->no_dokumen = $no_dokumen;
            $data_save->id_cuti = $request->get('id_cuti');
            $data_save->tgl_mulai = $request->get('tgl_mulai');
            $data_save->tgl_akhir = $request->get('tgl_akhir');
            $data_save->total_hari = $request->get('total_hari');
            $data_save->alasan = $request->get('alasan');
            $data_save->status = 'Pending';
            $data_save->attachment_path = $fileName['nama'];
            $data_save->user_at = auth()->user()->name;
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
        $rules = [
            'id_karyawan' => 'required|integer|exists:ms_karyawan,id',
            'id_karyawan_pengganti' => 'required|integer|exists:ms_karyawan,id',
            'id_cuti' => 'required|integer|exists:ms_cuti,id',
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
            'id_karyawan_pengganti.required' => 'Karyawan pengganti wajib diisi.',
            'id_karyawan_pengganti.exists' => 'Karyawan pengganti yang dipilih tidak valid atau tidak ditemukan.',
            'id_cuti.required' => 'Jenis cuti wajib diisi.',
            'id_cuti.exists' => 'jenis cuti yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            if($request->file('attachment_path')){
                $fileName = uploadFile($request->file('attachment_path'),'CT');
                KaryawanCutiModels::where('id',$id)->update([
                    'attachment_path' => $fileName['nama'],
                ]);
            }
            KaryawanCutiModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'id_karyawan_pengganti' => $request->get('id_karyawan_pengganti'),
                'id_cuti' => $request->get('id_cuti'),
                'tgl_mulai' => $request->get('tgl_mulai'),
                'tgl_akhir' => $request->get('tgl_akhir'),
                'total_hari' => $request->get('total_hari'),
                'alasan' => $request->get('alasan'),
                // 'attachment_path' => $fileName['nama'],
                'user_at' => auth()->user()->name,
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
            $data = KaryawanCutiModels::where('id',$id)->first();
            if($data){
                deleteFile($data->attachment_path);
            }
            KaryawanCutiModels::where('id',$id)->delete();
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

    public function show($id)
    {
        $data = new KaryawanCutiModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan_pengganti', 'cuti')->where('id',$id)->first(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function ls_checked()
    {
        $data = new KaryawanCutiModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan_pengganti', 'cuti')->whereNull('checked_by')->get(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function checked(Request $request)
    {
        try {
            KaryawanCutiModels::where('id',$id)->update([
                    'status' => 'Checked',
                    'checked_by' => $request->get('checked_by'),
                    'checked_at' => date('Y-m-d H:i:s'),
                ]);
        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function ls_approved()
    {
        $data = new KaryawanCutiModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan_pengganti', 'cuti')
                            ->whereNotNull('checked_by')
                            ->whereNull('approved_by')
                            ->get(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function approved(Request $request)
    {
        try {
            KaryawanCutiModels::where('id',$id)->update([
                    'status' => 'Approved',
                    'approved_by' => $request->get('approved_by'),
                    'approved_at' => date('Y-m-d H:i:s'),
                ]);
        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }
}