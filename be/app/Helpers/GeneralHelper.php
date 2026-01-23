<?php

// Pastikan tidak ada namespace di sini jika Anda ingin fungsi-fungsi ini diakses secara global
// Atau gunakan namespace jika Anda ingin memuatnya secara spesifik (kurang umum untuk helper sederhana)

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\Master\TglLiburModel;

if (!function_exists('myCustomHelperFunction')) {
    /**
     * Contoh fungsi helper kustom.
     *
     * @param string $text Input teks.
     * @return string
     */
    function myCustomHelperFunction($text)
    {
        return strtoupper($text) . ' - FROM HELPER';
    }
}

if (!function_exists('formatRupiah')) {
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     *
     * @param float|int $amount Jumlah uang.
     * @return string
     */
    function formatRupiah($amount)
    {
        return 'Rp ' . number_format($amount, 0, ',', '.');
    }
}

if (!function_exists('uploadFile')) {
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     *
     * @param float|int $amount Jumlah uang.
     * @return string
     */
    function uploadFile($filename, $jenis)
    {
        $imageFile = $filename;

        $originalFileName = $imageFile->getClientOriginalName();
        $extension = $imageFile->getClientOriginalExtension();
        $fileNameWithoutExt = pathinfo($originalFileName, PATHINFO_FILENAME);

        // $newFileName = Str::slug($fileNameWithoutExt) . '-' . time() . '.' . $extension;
        $newFileName = $jenis . '.' . time() . '.' . $extension;

        // Simpan file ke storage/app/public/uploads
        $path = Storage::disk('public')->putFileAs('uploads', $imageFile, $newFileName);

        $data['nama'] = $newFileName;
        $data['path'] = $path;

        return $data;
    }
}

if (!function_exists('deleteFile')) {
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     *
     * @param float|int $amount Jumlah uang.
     * @return string
     */
    function deleteFile($filename)
    {
        if($filename){
            $filePath = 'uploads/' . $fileName;
            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
                return 'Deleted';
            }
            return 'File not found';
        }
    }
}

if (!function_exists('gajiHari')) {
    /**
     * Memformat angka menjadi format mata uang Rupiah.
     *
     * @param float|int $amount Jumlah uang.
     * @return string
     */
    function gajiHari($gapok, $hari)
    {
        $ghari = 0;
        if($gapok > 0 && $hari > 0){
            $ghari = $gapok / $hari;
        }
        return $ghari;
    }
}

if (!function_exists('getWorkDay')) {
    function getWorkDay(Carbon $startDate, Carbon $endDate, array $holidays = []): int
    {
        $workDays = 0;
        $currentDate = $startDate->copy();

        while ($currentDate->lte($endDate)) {
            // Periksa apakah hari ini adalah hari kerja (Senin-Jumat)
            if ($currentDate->isWeekday()) {
                $isHoliday = false;
                $formattedDate = $currentDate->format('Y-m-d');

                // Periksa apakah hari ini termasuk dalam daftar hari libur
                if (in_array($formattedDate, $holidays)) {
                    $isHoliday = true;
                }

                if (!$isHoliday) {
                    $workDays++;
                }
            }
            $currentDate->addDay();
        }

        return $workDays;
    }
}

if (!function_exists('getHolidays')) {
    function getHolidays($tgl_dari, $tgl_sampai)
    {
        $data = TglLiburModel::whereBetween('tgl_libur', [date($tgl_dari), date($tgl_sampai)])->get();
        $listdata = array();
        foreach ($data as $value) {
            $listdata[] = $value->tgl_libur;
        }
        return $listdata;
    }
}

if (!function_exists('updahLemburHK')) {
    function updahLemburHK($jamlembur = 0, $gapok)
    {
        $updahlembur = 0;
        $kali = 1.5;
        $gapokhari = $gapok/173;
        // Upah per jam untuk perhitungan lembur dihitung sebagai 1/173 dari upah sebulan. (Didapatkan dari 40 jam/minggu * 4 minggu/bulan = 160 jam, ditambah perkiraan hari libur, dll. Angka 173 adalah standar)

        if($jamlembur == 0){
            return 0;
        }

        if($jamlembur == 1){
            $updahlembur = $kali * $gapokhari;
        }else if($jamlembur == 2 || $jamlembur == 3){
            $updahlembur = ($kali * $gapokhari) + (2 * $gapokhari);
        }else{
            $updahlembur = ($kali * $gapokhari) + (3 * 2 * $gapokhari);
        }

        return $updahlembur;
    }
}

if (!function_exists('updahLemburHL')) {
    function updahLemburHL($jamlembur = 0, $gapok)
    {
        $updahlembur = 0;
        $kali = 1.5;
        $gapokhari = $gapok/173;
        // Upah per jam untuk perhitungan lembur dihitung sebagai 1/173 dari upah sebulan. (Didapatkan dari 40 jam/minggu * 4 minggu/bulan = 160 jam, ditambah perkiraan hari libur, dll. Angka 173 adalah standar)

        if($jamlembur == 0){
            return 0;
        }

        if($jamlembur <= 8){
            // Jam pertama sampai jam ke-8: 2 x upah per jam
            $updahlembur = $jamlembur * (2 * $gapokhari);
        }else if($jamlembur == 9){
            // Jam pertama sampai jam ke-8: 2 x upah per jam
            // Jam ke-9: 3 x upah per jam
            $updahlembur = 8 * (2 * $gapokhari);
            $updahlembur9 = 3 * $gapokhari;
            $updahlembur = $updahlembur + $updahlembur9;
        }else{
            // Jam pertama sampai jam ke-8: 2 x upah per jam
            // Jam ke-10, ke-11, ke-12: 4 x upah per jam
            $jam = $jamlembur - 8;
            $updahlembur = 8 * (2 * $gapokhari);
            $updahlembur = $updahlembur + ($jam * (4 * $gapokhari));
        }

        return $updahlembur;
    }
}

if (!function_exists('getTimeInOut')) {
    function getTimeInOut(Carbon $scheduleIn, Carbon $scheduleOut, Carbon $checkIn, Carbon $checkOut)
    {
        $diffJamKerja = $checkOut->diff($checkIn);
        $diffTelat = $scheduleIn->diff($checkIn);
        $diffOver = $scheduleOut->diff($checkOut);
        $diffMenit = $checkOut->diffInMinutes($checkIn);
        $signIn = $diffTelat->invert ? '-' : '+';
        $signOut = $diffOver->invert ? '-' : '+';
        $formattedDuration = sprintf(
                '%d jam, %d menit, %d detik',
                $diffJamKerja->h + ($diffJamKerja->days * 24), // Tambahkan jam dari hari jika ada selisih hari
                $diffJamKerja->i,
                $diffJamKerja->s
            );

        $totalHours2 = ($diffOver->days * 24) + $diffOver->h;
        $formattedDiff2 = sprintf(
            '%02d:%02d:%02d',
            $totalHours2, // Total jam
            $diffOver->i,     // Menit
            $diffOver->s      // Detik
        );

        // jam masuk dikurang 1 untuk istirahat
        $data['jam_telat']      = $diffTelat->h;
        $data['menit_telat']    = $signIn.$diffTelat->i;
        $data['menit_pulang']   = $signIn.$diffOver->i;
        $data['jam_masuk']      = ($diffJamKerja->h) - 1 - $totalHours2;
        $data['jam_over']       = $totalHours2;
        $data['menit_over']     = $signOut.$diffOver->i;
        $data['format_over']    = $formattedDiff2;
        return $data;
    }
}