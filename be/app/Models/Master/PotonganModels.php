<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class PotonganModels extends Model
{
    protected $table = 'ms_potongan';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
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
}
