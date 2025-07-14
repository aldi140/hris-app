<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class KaryawanAbsensiModels extends Model
{
    protected $table = 'trx_karyawan_absensi';
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
        'check_in_latitude',
        'check_in_longitude',
        'check_out_latitude',
        'check_out_longitude',
    ];
}
