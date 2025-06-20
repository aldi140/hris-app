<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class JabatanModel extends Model
{
    protected $table = 'ms_jabatan';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'nama',
        'user_at',
    ];
}
