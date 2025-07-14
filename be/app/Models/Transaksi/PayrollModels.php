<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
use App\Models\Master\KaryawanModel;

class PayrollModels extends Model
{
    protected $table = 'trx_payroll';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'tgl_absensi',
        'schedule_in_time',
        'schedule_out_time',
        'check_in_time',
        'check_out_time',
        'overtime',
        'overtime_hour',
        'status_absensi',
        'status_hari',
        'jabatan',
        'transportasi',
        'makan',
        'rumah',
        'kehadiran',
        'keluarga',
        'lembur',
        'bonus_kinerja',
        'intensif_penjualan',
        'komisi',
        'shift',
        'dinas_luar',
        'pph_21',
        'jaminan_hari_tua',
        'jaminan_pensiun',
        'jaminan_kematian',
        'jaminan_kecelakaan_kerja',
        'bpjs',
        'pinjaman_karyawan',
        'serikat_pekerja',
        'potongan_absensi',
        'cicilan_koperasi',
        'asuransi_lain',
        'user_at',
    ];

    public function karyawan()
    {
        return $this->belongsTo(KaryawanModel::class, 'id_karyawan');
    }
}
