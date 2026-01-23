<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class KaryawanLemburModels extends Model
{
    protected $table = 'trx_karyawan_lembur';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_karyawan',
        'no_dokumen',
        'tgl_lembur',
        'jam_mulai',
        'jam_akhir',
        'total_hours',
        'keterangan',
        'status',
        'checked_by',
        'checked_at',
        'approved_by',
        'approved_at',
        'user_at',
    ];
}
