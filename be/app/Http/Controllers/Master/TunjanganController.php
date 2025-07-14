<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\TunjanganModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class TunjanganController extends Controller
{
    public function index()
    {
        $data = new TunjanganModels;
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
        $rules = [
            'id_karyawan' => 'required|integer|exists:ms_karyawan,id',
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib dipilih.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save = new TunjanganModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->jabatan = $request->get('jabatan');
            $data_save->transportasi = $request->get('transportasi');
            $data_save->makan = $request->get('makan');
            $data_save->rumah = $request->get('rumah');
            $data_save->kehadiran = $request->get('kehadiran');
            $data_save->keluarga = $request->get('keluarga');
            $data_save->lembur = $request->get('lembur');
            $data_save->bonus_kinerja = $request->get('bonus_kinerja');
            $data_save->intensif_penjualan = $request->get('intensif_penjualan');
            $data_save->komisi = $request->get('komisi');
            $data_save->shift = $request->get('shift');
            $data_save->dinas_luar = $request->get('dinas_luar');
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
            'id_karyawan.required' => 'Karyawan wajib dipilih.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            TunjanganModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'jabatan' => $request->get('jabatan'),
                'transportasi' => $request->get('transportasi'),
                'makan' => $request->get('makan'),
                'rumah' => $request->get('rumah'),
                'kehadiran' => $request->get('kehadiran'),
                'keluarga' => $request->get('keluarga'),
                'lembur' => $request->get('lembur'),
                'bonus_kinerja' => $request->get('bonus_kinerja'),
                'intensif_penjualan' => $request->get('intensif_penjualan'),
                'komisi' => $request->get('komisi'),
                'shift' => $request->get('shift'),
                'dinas_luar' => $request->get('dinas_luar'),
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
            TunjanganModels::where('id',$id)->delete();
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
        $data = new TunjanganModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->where('id',$id)->first(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}