<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
use App\Models\Master\NasabahModels;
use App\Models\Transaksi\PinjamanDaftarModels;
use App\Models\Transaksi\PinjamanAngsuranModels;
use App\Models\TransaksiLjk\LjkDebitur;

class PinjamanModels extends Model
{
    protected $table = 'ljk_trx_pinjaman';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_nasabah',
        'id_aplikasi',
        'no_transaksi',
        'tgl_transaksi',
        'nominal',
        'bunga',
        'tenor',
        'termin',
        'jenis_bunga_bayar',
        'id_jenis_cicilan',
        'pencairan',
        'administrasi',
        'agen',
        'provisi',
        'fidusa',
        'biaya_lain',
        'jumlah_materai',
        'biaya_transport',
        'nama_penjamin',
        'ktp_penjamin',
        'id_referensi',
        'id_surveyor',
        'id_kriteria',
        'id_jaminan',
        'id_asuransi',
        'biaya_asuransi',
        'denda_administrasi',
        'denda_status',
        'foto_utama',
        'foto_detail1',
        'foto_detail2',
        'foto_detail3',
        'foto_detail4',
        'status_pk',
        'approve',
        'ket_reject',
        'tgl_reject',
        'print_perjanjian',
        'id_kantor',
        'id_pos',
        'user_at',
        'created_at',
        'updated_at',
        'level_approve',
        'rekening',
        'produk',
        'cara_realisasi',
        'realisasi_notabuku',
        'cara_pembayaran',
        'pembayaran_notabuku',
        'id_marketing',
        'id_accountofficer',
        'id_kolektor',
        'status',
        'submit',
        'app_name_1',
        'app_name_2',
        'app_name_3',
        'app_name_4',
        'sturk_pencairan',
        'titip_angsuran'
    ];

    public function aplikasi()
    {
        return $this->belongsTo(PinjamanDaftarModels::class, 'id_aplikasi');
    }

    public function nasabah()
    {
        return $this->belongsTo(NasabahModels::class, 'id_nasabah');
    }

    public function angsuran()
    {
        return $this->hasMany(PinjamanAngsuranModels::class, 'id_transaksi');
    }

    public function debitur()
    {
        return $this->belongsTo(LjkDebitur::class, 'no_transaksi', 'akadawal_nmr');
    }

    // public function kriteria()
    // {
    //     return $this->belongsTo(KriteriaModels::class, 'id_kriteria');
    // }
}
