<?php
namespace App\Models\Transaksi;
use Illuminate\Database\Eloquent\Model;
class PinjamanSurveyModels extends Model
{
    protected $table = 'tbl_survei_calon_nasabah';
    public $timestamps = true;
    public $autoincrement = false;
    public $incrementing  = false;
    protected $primaryKey = "id";
    protected $fillable = [
        'id',
        'id_aplikasi',
        'surveyor_1',
        'surveyor_2',
        'nama_nasabah',
        'alamat_nasabah',
        'alamat_survei',
        'no_tlp',
        'no_tlp_wa',
        'no_tlp_lain',
        'validasi_telp_1',
        'validasi_telp_2',
        'pinjaman',
        'jangka_waktu',
        'jenis_angsuran',
        'angsuran',
        'pinjaman_khusus',
        'status_rumah',
        'long_rumah',
        'lat_rumah',
        'nama_saudara',
        'alamat_saudara',
        'no_tlp_saudara',
        'long_saudara',
        'lat_saudara',
        'validasi_rumah',
        'kantor_id',
        'user_at',
        'created_at',
        'updated_at',
        'sudah_update',
        'file_name',
        'file_name_jaminan',
        'file_name_transaksi',
        'file_name_nasabah',
        'submit',
        'link_maps_rmh',
        'link_maps_rmh_sdr'
    ];
}
