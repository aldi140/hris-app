<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\ShitModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class ShiftController extends Controller
{
    public function index()
    {
        $data = new ShitModels;
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
            'nama' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ];

        $messages = [
            'required' => 'Data tidak lengkap, harap di isi dengan lengkap.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            $data_save = new ShitModels;
            $data_save->nama = $request->get('nama');
            $data_save->start_time = $request->get('start_time');
            $data_save->end_time = $request->get('end_time');
            $data_save->jumlah_jam = $request->get('jumlah_jam');
            $data_save->break_minutes = $request->get('break_minutes');
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
            'nama' => 'required',
            'start_time' => 'required',
            'end_time' => 'required',
        ];

        $messages = [
            'required' => 'Data tidak lengkap, harap di isi dengan lengkap.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }
        try {
            ShitModels::where('id',$id)->update([
                'nama' => $request->get('nama'),
                'start_time' => $request->get('start_time'),
                'end_time' => $request->get('end_time'),
                'jumlah_jam' => $request->get('jumlah_jam'),
                'break_minutes' => $request->get('break_minutes'),
                'is_active' => $request->get('is_active'),
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
            ShitModels::where('id',$id)->delete();
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
        $data = new ShitModels;
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