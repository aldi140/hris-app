<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class BungaDendaModels extends Model
{
    protected $table = 'tbl_pengaturan_denda';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'jenis_denda',
        'nominal',
        'status',
        'key',
        'keterangan',
        'id_kantor',
        'created_at',
        'updated_at'
    ];

    public function scopeJenisDendaKeterlambatanTerpakai($query)
    {
        return $query->where('key','denda_keterlambatan')->where('status',1)->first();
    }
}
