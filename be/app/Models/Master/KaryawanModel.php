<?php
namespace App\Models\Master;
use Illuminate\Database\Eloquent\Model;
use App\Models\Master\JabatanModel;
use App\Models\Master\DepartemenModel;
class KaryawanModel extends Model
{
    protected $table = 'ms_karyawan';
    // public $timestamps = false;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_jabatan',
        'id_departemen',
        'nik',
        'nama',
        'jenis_kelamin',
        'tgl_lahir',
        'tempat_lahir',
        'alamat',
        'alamat_domisili',
        'ktp',
        'bpjs_kesehatan',
        'bpjs_ketenagakerjaan',
        'npwp',
        'ijazah',
        'file_ktp',
        'file_bpjs_kesehatan',
        'file_bpjs_ketenagakerjaan',
        'file_npwp',
        'file_ijazah',
        'file_sertifikat',
        'tgl_masuk',
        'tgl_keluar',
        'status_karyawan',
        'status_kawin',
        'user_at',
    ];

    public function jabatan()
    {
        return $this->belongsTo(JabatanModel::class, 'id_jabatan');
    }

    public function departemen()
    {
        return $this->belongsTo(DepartemenModel::class, 'id_departemen');
    }
}
