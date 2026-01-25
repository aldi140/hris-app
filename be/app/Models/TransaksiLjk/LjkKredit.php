<?php
namespace App\Models\TransaksiLjk;
use Illuminate\Database\Eloquent\Model;
class LjkKredit extends Model
{
    protected $table = 'ljk_trxkrd';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id_trxkrd";
    protected $fillable = [
        'id_trxkrd',
        'bukti',
        'tanggal',
        'rekening',
        'akad_nmr',
        'payment_no',
        'pemilik',
        'penyetor',
        'alamat',
        'telepon',
        'nik',
        'berita1',
        'berita2',
        'sandi',
        'produk',
        'pembayaran_cara',
        'ditarik',
        'disetor',
        'pokok',
        'bunga_penalti',
        'bunga',
        'pbymad',
        'pbdp',
        'denda',
        'potongan',
        'nominal',
        'selisih',
        'accrual',
        'notabuku',
        'validasi',
        'hapusbuku',
        'kualitas',
        'umur',
        'id_kantortrx',
        'id_kantorsrc',
        'gps_latitude',
        'gps_longitude',
        'gps_alamat',
        'gps_kecamatan',
        'gps_kodepos',
        'gps_dati2',
        'gps_provinsi',
        'gps_score',
        'notifikasi_nmr',
        'notifikasi',
        'notifikasi_tgl',
        'notifikasi_supervisor',
        'id_operator',
        'id_supervisor',
        'status'
    ];
}
