<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class BungaPinjamanModels.php extends Model
{
    protected $table = 'tbl_bunga';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'tipe_pinjaman',
        'jenis_bunga',
        'suku_bunga',
        'denda',
        'denda_adm',
        'status',
        'id_kantor',
        'created_at',
        'updated_at'
    ];
}
