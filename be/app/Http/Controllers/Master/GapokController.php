<?php
namespace App\Http\Controllers\Master;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\GapokModel;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
class GapokController extends Controller
{
    public function index()
    {
        $data = new GapokModel;
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
        $validator = Validator::make($request->all(),[
            'golongan' => 'required',
            'gapok' => 'required',
            'tgl_aktif' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            // $id = IdGenerator::generate(['table' => 'ak_jeniskurikulum','field' => 'kodekurikulum','length' => 10, 'prefix' =>date('m')]);

            $data_save = new GapokModel;
            $data_save->golongan = $request->get('golongan');
            $data_save->gapok = $request->get('gapok');
            $data_save->tgl_aktif = $request->get('tgl_aktif');
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
        $validator = Validator::make($request->all(),[
            'golongan' => 'required',
            'gapok' => 'required',
            'tgl_aktif' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], Response::HTTP_FORBIDDEN);
        }

        try {
            GapokModel::where('id',$id)->update([
                'golongan' => $request->get('golongan'),
                'gapok' => $request->get('gapok'),
                'tgl_aktif' => $request->get('tgl_aktif'),
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
            GapokModel::where('id',$id)->delete();
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