<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
class ShitModels extends Model
{
    protected $table = 'ms_shift_kerja';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'nama',
        'start_time',
        'end_time',
        'jumlah_jam',
        'break_minutes',
        'is_active',
        'user_at',
    ];
}
