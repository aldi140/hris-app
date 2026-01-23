<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\PotonganModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class PotonganController extends Controller
{
    public function index()
    {
        $data = new PotonganModels;
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
            'bpjs' => 'required|numeric',
            'id_karyawan' => 'required|integer|exists:ms_karyawan,id',
        ];

        $messages = [
            'bpjs.required' => 'BPJS wajib diisi.',
            'bpjs.numeric' => 'BPJS harus beruba angka.',
            'id_karyawan.required' => 'Karyawan wajib dipilih.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save = new PotonganModels;
            $data_save->id_karyawan = $request->get('id_karyawan');
            $data_save->pph_21 = $request->get('pph_21');
            $data_save->jaminan_hari_tua = $request->get('jaminan_hari_tua');
            $data_save->jaminan_pensiun = $request->get('jaminan_pensiun');
            $data_save->jaminan_kematian = $request->get('jaminan_kematian');
            $data_save->jaminan_kecelakaan_kerja = $request->get('jaminan_kecelakaan_kerja');
            $data_save->bpjs = $request->get('bpjs');
            $data_save->pinjaman_karyawan = $request->get('pinjaman_karyawan');
            $data_save->serikat_pekerja = $request->get('serikat_pekerja');
            $data_save->potongan_absensi = $request->get('potongan_absensi');
            $data_save->cicilan_koperasi = $request->get('cicilan_koperasi');
            $data_save->asuransi_lain = $request->get('asuransi_lain');
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
            'bpjs' => 'required|numeric',
            'id_karyawan' => 'required|integer|exists:ms_karyawan,id',
        ];

        $messages = [
            'bpjs.required' => 'BPJS wajib diisi.',
            'bpjs.numeric' => 'BPJS harus beruba angka.',
            'id_karyawan.required' => 'Karyawan wajib dipilih.',
            'id_karyawan.exists' => 'Karyawan yang dipilih tidak valid atau tidak ditemukan.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            PotonganModels::where('id',$id)->update([
                'id_karyawan' => $request->get('id_karyawan'),
                'pph_21' => $request->get('pph_21'),
                'jaminan_hari_tua' => $request->get('jaminan_hari_tua'),
                'jaminan_pensiun' => $request->get('jaminan_pensiun'),
                'jaminan_kematian' => $request->get('jaminan_kematian'),
                'jaminan_kecelakaan_kerja' => $request->get('jaminan_kecelakaan_kerja'),
                'bpjs' => $request->get('bpjs'),
                'pinjaman_karyawan' => $request->get('pinjaman_karyawan'),
                'serikat_pekerja' => $request->get('serikat_pekerja'),
                'potongan_absensi' => $request->get('potongan_absensi'),
                'cicilan_koperasi' => $request->get('cicilan_koperasi'),
                'asuransi_lain' => $request->get('asuransi_lain'),
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
            PotonganModels::where('id',$id)->delete();
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
        $data = new PotonganModels;
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