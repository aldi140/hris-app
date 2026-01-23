<?php
namespace App\Http\Controllers\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\JadwalKerjaModels;
use App\Models\Transaksi\KaryawanAbsensiModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class KryAbsensiController extends Controller
{
    public function index()
    {
        $data = new KaryawanAbsensiModels;
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
            'id_karyawan' => 'required|exists:ms_jabatan,id'
        ];

        $messages = [
            'id_karyawan.required' => 'Nama karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save = new KaryawanAbsensiModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->tgl_absensi = $request->get('tgl_absensi');
            $data_save->check_in_time = $request->get('check_in_time');
            $data_save->check_out_time = $request->get('check_out_time');
            $data_save->check_in_latitude = $request->get('check_in_latitude');
            $data_save->check_in_longitude = $request->get('check_in_longitude');
            $data_save->check_out_latitude = $request->get('check_out_latitude');
            $data_save->check_out_longitude = $request->get('check_out_longitude');
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
            'id_karyawan' => 'required|exists:ms_jabatan,id'
        ];

        $messages = [
            'id_karyawan.required' => 'Nama karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            KaryawanAbsensiModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'tgl_absensi' => $request->get('tgl_absensi'),
                'check_in_time' => $request->get('nama'),
                'check_out_time' => $request->get('jumlah'),
                'check_in_latitude' => $request->get('nama'),
                'check_in_longitude' => $request->get('jumlah'),
                'check_out_latitude' => $request->get('nama'),
                'check_out_longitude' => $request->get('check_out_longitude'),
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
            KaryawanAbsensiModels::where('id',$id)->delete();
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
        $data = new KaryawanAbsensiModels;
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

    public function checkin(Request $request)
    {
        $rules = [
            'id_karyawan' => 'required|exists:ms_karyawan,id'
        ];

        $messages = [
            'id_karyawan.required' => 'Nama karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save      = new KaryawanAbsensiModels;
            $tgl            = date('Y-m-d');
            $id_karyawan    = $request->get('id_karyawan');

            $dat_jadwal     = JadwalKerjaModels::with('shift')
                                ->whereDate('schedule_date', '<=', $tgl)
                                ->where('id_karyawan', '=', $id_karyawan)
                                ->first();
            $jam_in         = '';
            $jam_out        = '';
            if($dat_jadwal){
                if($dat_jadwal->shift){
                    $jam_in = $dat_jadwal->shift->start_time;
                    $jam_out = $dat_jadwal->shift->end_time;
                }else{
                    return response()->json([
                        'status' => false,
                        'message' => 'Karyawan tidak ada shift masuk hari ini',
                    ], Response::HTTP_BAD_REQUEST);
                }
            }else{
                return response()->json([
                    'status' => false,
                    'message' => 'Karyawan tidak ada jadwal masuk hari ini',
                ], Response::HTTP_BAD_REQUEST);
            }

            if (count($data_save->where([['id_karyawan','=',$id_karyawan], ['tgl_absensi','=',$tgl]])->get()) == 0) {
                $data_save->id_karyawan = $request->get('id_karyawan');
                $data_save->tgl_absensi = date('Y-m-d');
                $data_save->schedule_in_time = $jam_in;
                $data_save->schedule_out_time = $jam_out;
                $data_save->check_in_time = date('H:i:s');
                $data_save->check_in_latitude = $request->get('check_in_latitude');
                $data_save->check_in_longitude = $request->get('check_in_longitude');
                $data_save->save();

                return response()->json(
                    [
                        'status' => true,
                        'message' => 'Check in berhasil.',
                    ],Response::HTTP_OK);
            }else{
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Anda sudah check in.',
                    ],Response::HTTP_OK);
            }

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }

    public function checkout(Request $request)
    {
        $rules = [
            'id_karyawan' => 'required|exists:ms_karyawan,id'
        ];

        $messages = [
            'id_karyawan.required' => 'Nama karyawan wajib diisi.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $id_karyawan    = $request->get('id_karyawan');
            $tgl            = date('Y-m-d');
            $data           = KaryawanAbsensiModels::where([['id_karyawan','=',$id_karyawan], ['tgl_absensi','=',$tgl]])->first();
            if ($data) {
                if(!$data->check_out_time){
                    KaryawanAbsensiModels::where([['id_karyawan','=',$id_karyawan], ['tgl_absensi','=',$tgl]])->update([
                        'check_out_time' => date('H:i:s'),
                        'check_out_latitude' => $request->get('check_out_latitude'),
                        'check_out_longitude' => $request->get('check_out_longitude'),
                    ]);
    
                    return response()->json(
                        [
                            'status' => true,
                            'message' => 'Anda berhasil check out.',
                        ],Response::HTTP_OK);
                }else{
                    return response()->json(
                        [
                            'status' => false,
                            'message' => 'Hari ini anda sudah check out.',
                        ],Response::HTTP_OK);
                }
                
            }else{
                return response()->json(
                    [
                        'status' => false,
                        'message' => 'Hari ini anda belum check in.',
                    ],Response::HTTP_OK);
            }
            

        } catch (Exception $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()]);
        } catch (QueryException $e){
            return response()->json(['status' => false, 'message' => $e->getMessage()]);
        }
    }
}