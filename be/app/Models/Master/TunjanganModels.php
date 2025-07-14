<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class TunjanganModels extends Model
{
    protected $table = 'ms_tunjangan';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
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
        'user_at',
    ];
}
