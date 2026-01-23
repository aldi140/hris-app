<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
use App\Models\Master\CutiModels;
use App\Models\Master\KaryawanModel;
class KaryawanCutiModels extends Model
{
    protected $table = 'trx_karyawan_cuti';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'id_karyawan_pengganti',
        'no_dokumen',
        'id_cuti',
        'tgl_mulai',
        'tgl_akhir',
        'total_hari',
        'alasan',
        'status',
        'checked_by',
        'checked_at',
        'approved_by',
        'approved_at',
        'attachment_path',
        'user_at',
    ];

    public function karyawan()
    {
        return $this->belongsTo(KaryawanModel::class, 'id_karyawan');
    }

    public function karyawan_pengganti()
    {
        return $this->belongsTo(KaryawanModel::class, 'id_karyawan_pengganti');
    }

    public function cuti()
    {
        return $this->belongsTo(CutiModels::class, 'id_cuti');
    }
}
