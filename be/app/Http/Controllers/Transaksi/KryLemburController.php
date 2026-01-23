<?php
namespace App\Http\Controllers\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transaksi\KaryawanLemburModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class KryLemburController extends Controller
{
    public function index()
    {
        $data = new KaryawanLemburModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan')->get(),
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
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $no_dokumen = IdGenerator::generate(['table' => 'trx_karyawan_lembur','field' => 'no_dokumen','length' => 11, 'prefix' =>"L.".date('ym')]);

            $data_save = new KaryawanLemburModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->no_dokumen = $no_dokumen;
            $data_save->tgl_lembur = $request->get('tgl_lembur');
            $data_save->jam_mulai = $request->get('jam_mulai');
            $data_save->jam_akhir = $request->get('jam_akhir');
            $data_save->total_hours = $request->get('total_hours');
            $data_save->keterangan = $request->get('keterangan');
            $data_save->status = 'Pending';
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
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            KaryawanLemburModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'tgl_lembur' => $request->get('tgl_lembur'),
                'jam_mulai' => $request->get('jam_mulai'),
                'jam_akhir' => $request->get('jam_akhir'),
                'total_hours' => $request->get('total_hours'),
                'keterangan' => $request->get('keterangan'),
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
            $data = KaryawanLemburModels::where('id',$id)->first();
            if($data){
                deleteFile($data->attachment_path);
            }
            KaryawanLemburModels::where('id',$id)->delete();
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
        $data = new KaryawanLemburModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan')->where('id',$id)->first(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}