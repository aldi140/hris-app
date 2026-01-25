<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class PinjamanAngsuranModels extends Model
{
    protected $table = 'ljk_trx_pinjaman_angsuran';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_transaksi',
        'payment_no',
        'nominal',
        'hutang_pokok',
        'bunga',
        'balance',
        'bruto',
        'tgl_jatuh_tempo',
        'status',
        'tgl_bayar',
        'id_denda',
        'persen_denda',
        'pokok_bayar',
        'bunga_bayar',
        'denda',
        'denda_adm',
        'denda_bayar',
        'denda_adm_bayar',
        'potongan',
        'biaya_lain_lain',
        'simpanan_harian',
        'keterangan',
        'id_kantor',
        'user_at',
        'created_at',
        'updated_at',
        'no_kuitansi',
        'kurang_bayar',
        'selisih',
        'cara_bayar'
    ];
}
