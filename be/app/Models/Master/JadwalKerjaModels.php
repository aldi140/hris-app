<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
use App\Models\Master\ShitModels;
use App\Models\Master\KaryawanModel;
class JadwalKerjaModels extends Model
{
    protected $table = 'ms_jadwal_kerja';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'shift_id',
        'schedule_date',
        'user_at',
    ];

    public function karyawan()
    {
        return $this->belongsTo(KaryawanModel::class, 'id_karyawan');
    }

    public function shift()
    {
        return $this->belongsTo(ShitModels::class, 'shift_id');
    }
}
