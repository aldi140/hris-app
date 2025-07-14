<?php
namespace App\Http\Controllers\Payroll;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Master\JadwalKerjaModels;
use App\Models\Master\KaryawanModel;
use App\Models\Master\TunjanganModels;
use App\Models\Transaksi\KaryawanAbsensiModels;
use App\Models\Transaksi\KaryawanCutiModels;
use App\Models\Transaksi\KaryawanKasbonModels;
use App\Models\Transaksi\KaryawanLemburModels;
use App\Models\Transaksi\PayrollModels;
use Exception;
use Haruncpi\LaravelIdGenerator\IdGenerator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class GenerateController extends Controller
{
    public function absensi(Request $request)
    {
        $tgl_dari = $request->get('tgl_dari');
        $tgl_sampai = $request->get('tgl_sampai');
        $statuscuti = false;
        $statusAbsensi  = 'Masuk';
        $statusHari     = 'HK';

        $holidays = getHolidays($tgl_dari, $tgl_sampai);
        $startDate = Carbon::parse($tgl_dari);
        $endDate = Carbon::parse($tgl_sampai);
        $currentDate = $startDate->copy();

        $tgl        = '2025-07-02';
        $tgl_dari   = Carbon::parse($tgl.'  07:55:00');
        $tgl_sampai = Carbon::parse($tgl.'  14:10:00');
        $tgl_jadwal_in = Carbon::parse($tgl.'  08:00:00');
        $tgl_jadwal_out = Carbon::parse($tgl.'  17:00:00');
        $jamHitung = getTimeInOut($tgl_jadwal_in, $tgl_jadwal_out, $tgl_dari, $tgl_sampai);
        dd($jamHitung);
        while ($currentDate->lte($endDate)) {
            // Periksa apakah hari ini adalah hari kerja (Senin-Jumat)
            if ($currentDate->isWeekday()) {
                $isHoliday = false;
                $formattedDate = $currentDate->format('Y-m-d');

                // Periksa apakah hari ini termasuk dalam daftar hari libur
                if (in_array($formattedDate, $holidays)) {
                    $isHoliday  = true;
                    $statusHari = 'HL';
                }

                // if (!$isHoliday) {
                    $dataKaryawan = KaryawanModel::WhereNull('tgl_keluar')->get();
                    foreach ($dataKaryawan as $value) {
                        $idKaryawan = $value->id;

                        // cek absensi
                        $dataAbsensi = KaryawanAbsensiModels::whereDate('tgl_absensi', '=', $formattedDate)->where('id_karyawan', $idKaryawan)->first();
                        $jadwalIn       = '00:00:00';
                        $jadwalOut      = '00:00:00';
                        $absenIn        = '00:00:00';
                        $absenOut       = '00:00:00';
                        $overtime       = '00:00:00';
                        $overtime_jam   = 0;
                        if($dataAbsensi){
                            $jadwalIn    = $dataAbsensi->schedule_in_time;
                            $jadwalOut    = $dataAbsensi->schedule_out_time;
                            $absenIn    = $dataAbsensi->check_in_time;
                            $absenOut    = $dataAbsensi->check_out_time;

                            $absen_in_jadwal    = Carbon::parse($formattedDate.$jadwalIn);
                            $absen_out_jadwal   = Carbon::parse($formattedDate.$jadwalOut);
                            $absen_in           = Carbon::parse($formattedDate.$absenIn);
                            $absen_out          = Carbon::parse($formattedDate.$absenOut);
                            $jamHitung = getTimeInOut($absen_in_jadwal, $absen_out_jadwal, $absen_in, $absen_out);
                            $overtime   = $jamHitung['format_over'];
                            $overtime_jam   = $jamHitung['jam_over'];
                            if($jamHitung['menit_telat'] > 0){
                                $statusAbsensi  = 'Telat';
                            }

                            if($jamHitung['jam_masuk'] < 0){
                                $statusAbsensi  = 'Izin Pulang';
                            }
                        }

                        // cek cuti
                        $dataCuti = KaryawanCutiModels::whereDate('tgl_mulai', '>=', $formattedDate)
                                ->whereDate('tgl_akhir', '<=', $formattedDate)
                                ->where('id_karyawan', $idKaryawan)
                                ->first();
                        if($dataCuti){
                            $statuscuti     = true;
                            $statusAbsensi  = 'Cuti';
                        }

                        // cek tunjangan
                        $dataTunjangan = TunjanganModels::where('id_karyawan', $idKaryawan)
                                            ->first();
                        $tu_jabatan         = 0;
                        $tu_transportasi    = 0;
                        $tu_makan           = 0;
                        $tu_rumah           = 0;
                        $tu_kehadiran       = 0;
                        $tu_keluarga        = 0;
                        $tu_lembur          = 0;
                        $tu_bonus_kinerja   = 0;
                        $tu_intensif_penjualan  = 0;
                        $tu_komisi          = 0;
                        $tu_shift           = 0;
                        $tu_dinas_luar      = 0;
                        if($dataTunjangan){
                            $tu_jabatan         = $dataTunjangan->jabatan;
                            $tu_transportasi    = $dataTunjangan->transportasi;
                            $tu_makan           = $dataTunjangan->makan;
                            $tu_rumah           = $dataTunjangan->rumah;
                            $tu_kehadiran       = $dataTunjangan->kehadiran;
                            $tu_keluarga        = $dataTunjangan->keluarga;
                            $tu_lembur          = $dataTunjangan->lembur;
                            $tu_bonus_kinerja   = $dataTunjangan->bonus_kinerja;
                            $tu_intensif_penjualan  = $dataTunjangan->intensif_penjualan;
                            $tu_komisi          = $dataTunjangan->komisi;
                            $tu_shift           = $dataTunjangan->shift;
                            $tu_dinas_luar      = $dataTunjangan->dinas_luar;
                        }

                        // $tu_lembur
                        if($isHoliday){
                            $tu_makan           = 0;
                            $tu_rumah           = 0;
                            $tu_kehadiran       = 0;
                        }
                        
                        $data_save = new PayrollModels;
                        $data_save->id_karyawan = $idKaryawan;
                        $data_save->tgl_absensi = $formattedDate;
                        $data_save->schedule_in_time    = $jadwalIn;
                        $data_save->schedule_out_time   = $jadwalOut;
                        $data_save->check_in_time       = $absenIn;
                        $data_save->check_out_time      = $absenOut;
                        $data_save->overtime            = $overtime;
                        $data_save->overtime_hour       = $overtime_jam;
                        $data_save->status_absensi      = $statusAbsensi;
                        $data_save->status_hari         = $statusHari;
                        $data_save->jabatan         = $tu_jabatan;
                        $data_save->transportasi    = $tu_transportasi;
                        $data_save->makan           = $tu_makan;
                        $data_save->rumah           = $tu_rumah;
                        $data_save->kehadiran       = $tu_kehadiran;
                        $data_save->keluarga        = $tu_keluarga;
                        $data_save->lembur          = $tu_lembur;
                        $data_save->bonus_kinerja   = $tu_bonus_kinerja;
                        $data_save->intensif_penjualan = $tu_intensif_penjualan;
                        $data_save->komisi          = $tu_komisi;
                        $data_save->shift           = $tu_shift;
                        $data_save->dinas_luar      = $tu_dinas_luar;
                        $data_save->user_at = auth()->user()->name;
                        $data_save->save();
                    }
                    $workDays++;
                // }
            }
            $currentDate->addDay();
        }
    }
}