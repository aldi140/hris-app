<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class KaryawanKontrakModels extends Model
{
    protected $table = 'trx_karyawan_kontrak';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'no_kontrak',
        'tgl_mulai',
        'tgl_akhir',
        'tgl_perpanjang',
        'tipe_kontrak',
        'kontrak_ke',
        'status',
        'is_active',
        'user_at',
    ];
}
