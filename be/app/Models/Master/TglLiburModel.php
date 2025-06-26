<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class TglLiburModel extends Model
{
    protected $table = 'ms_tgl_libur';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'tgl_libur',
        'keterangan',
        'user_at',
    ];
}
