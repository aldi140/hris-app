<?php
namespace App\Http\Controllers\Transaksi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transaksi\PinjamanModels;
class PinjamanController extends Controller
{
    public function index()
    {

    }

    public function list_data(Request $request)
    {
        $data = new PinjamanModels;
        if (count($data->get()) > 0) {
            return response()->json([
                'status' => true,
                'message' => 'Berhasil menampilkan data',
                'data' => $data->with('nasabah', 'debitur', 'debitur.angsuran')
                                ->where('id_kantor', 'AA')
                                ->whereHas('debitur', function ($query) {
                                    $query->whereNull('id_debitur');
                                })
                                ->get(),
            ], Response::HTTP_OK);
        }else{
            return response()->json([
                'status' => false,
                'message' => 'Tidak ada data',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}