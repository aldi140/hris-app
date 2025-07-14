<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class KaryawanKasbonModels extends Model
{
    protected $table = 'trx_karyawan_kasbon';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'user_at',
    ];
}
