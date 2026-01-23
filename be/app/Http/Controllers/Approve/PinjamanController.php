<?php
namespace App\Http\Controllers\Approve;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\TransaksiCalculationHelper;
use App\Models\Transaksi\PinjamanModels;
use App\Models\Transaksi\PinjamanAngsuranModels;

use Redirect, Response;
use DateTime;
use DB;

class PinjamanController extends Controller
{
    public function approve(PinjamanModels $transaksi,Request $request)
    {
        DB::beginTransaction();
        // $transaksi->where('id',$request->sysid)->update([
        //     'nominal' => $request->nilai_pokok_pinjaman,
        //     'harga_pembelian' => $request->harga_pembelian,
        //     'dp' => $request->dp,
        //     'administrasi' => $request->biaya_administrasi,
        //     'jumlah_materai' => $request->jumlah_materai,
        //     'bunga' => $request->nominal_bunga,
        //     'tenor' => $request->jangka_waktu,
        //     'id_jenis_cicilan' => $request->jenis_cicilan,
        //     'id_kriteria' => 1,
        //     'tgl_transaksi' => $request->tgl_transaksi,
        //     'kantor_id' => auth()->user()->kantor_id,
        //     'approve' => 1,
        //     // 'unique_code' => $kode_trx_after.''.$request->custom_code.''.$kode_trx_before,
        // ]);
       
        // // $transaksi->touch();
      
        try {
                $trxAngsuran = new TransaksiCalculationHelper($transaksi->where('id',$request->sysid)->first());
                $trxAngsuran->datapinjamanCal();
                $datapinjaman = $transaksi->angsuran->where('status',0)->first();
                
                DB::commit();
        } catch (\Exception $th) {
            DB::rollBack();
            // return redirect()->back()->with('toast_error',$th->getMessage());
            return response()->json(['success' => false, 'message' => $th->getMessage()]);
        }

        $msg = 'Data berhasil di simpan';
        return response()->json(['success' => true, 'message' => $msg]);
    }
}