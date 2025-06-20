<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class GapokModel extends Model
{
    protected $table = 'ms_gapok';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'golongan',
        'gapok',
        'tgl_aktif',
        'user_at',
    ];
}
