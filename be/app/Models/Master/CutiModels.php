<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class CutiModels extends Model
{
    protected $table = 'ms_cuti';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'nama',
        'jumlah',
        'user_at',
    ];
}
