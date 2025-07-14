<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\JadwalKerjaModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class JadwalkerjaController extends Controller
{
    public function index()
    {
        $data = new JadwalKerjaModels;
        if (count($data->with('karyawan', 'karyawan.jabatan', 'karyawan.departemen', 'shift')->get()) > 0) {
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
            'shift_id' => 'required|integer|exists:ms_shift_kerja,id',
            'schedule_date' => 'required',
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
            'shift_id.required' => 'Shift wajib diisi.',
            'shift_id.exists' => 'Shift yang dipilih tidak valid atau tidak ditemukan.',
            'schedule_date.required' => 'Nama cuti wajib diisi.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save = new JadwalKerjaModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->shift_id = $request->get('shift_id');
            $data_save->schedule_date = $request->get('schedule_date');
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
            'shift_id' => 'required|integer|exists:ms_shift_kerja,id',
            'schedule_date' => 'required',
        ];

        $messages = [
            'id_karyawan.required' => 'Karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
            'shift_id.required' => 'Shift wajib diisi.',
            'shift_id.exists' => 'Shift yang dipilih tidak valid atau tidak ditemukan.',
            'schedule_date.required' => 'Nama cuti wajib diisi.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            JadwalKerjaModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'shift_id' => $request->get('shift_id'),
                'schedule_date' => $request->get('schedule_date'),
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
            JadwalKerjaModels::where('id',$id)->delete();
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
        $data = new JadwalKerjaModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('karyawan', 'karyawan.jabatan', 'karyawan.departemen', 'shift')->where('id',$id)->first(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}