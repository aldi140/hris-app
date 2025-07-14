<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trx_payroll', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_karyawan')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            $table->date('tgl_absensi');
            $table->time('schedule_in_time');
            $table->time('schedule_out_time');
            $table->time('check_in_time');
            $table->time('check_out_time')->nullable();
            $table->time('overtime')->nullable();
            $table->decimal('overtime_hour', 4, 2);
            $table->string('status_absensi', 20)
            ->comment('Status absensi: Masuk, Telat, Tidak absen masuk, Tidak absen pulang, Izin, Izin pulang awal.');
            $table->string('status_hari', 4)
            ->comment('Status hari: HK (Hari Kerja), HL (Hari Libur).');
            // tunjangan
            $table->double('jabatan', 8, 2)->default(0);
            $table->double('transportasi', 8, 2)->default(0);
            $table->double('makan', 8, 2)->default(0);
            $table->double('rumah', 8, 2)->default(0);
            $table->double('kehadiran', 8, 2)->default(0);
            $table->double('keluarga', 8, 2)->default(0);
            $table->double('lembur', 8, 2)->default(0);
            $table->double('bonus_kinerja', 8, 2)->default(0);
            $table->double('intensif_penjualan', 8, 2)->default(0);
            $table->double('komisi', 8, 2)->default(0);
            $table->double('shift', 8, 2)->default(0);
            $table->double('dinas_luar', 8, 2)->default(0);
            // potongan
            $table->double('pph_21', 8, 2)->default(0);
            $table->double('jaminan_hari_tua', 8, 2)->default(0);
            $table->double('jaminan_pensiun', 8, 2)->default(0);
            $table->double('jaminan_kematian', 8, 2)->default(0);
            $table->double('jaminan_kecelakaan_kerja', 8, 2)->default(0);
            $table->double('bpjs', 8, 2)->default(0);
            $table->double('pinjaman_karyawan', 8, 2)->default(0);
            $table->double('serikat_pekerja', 8, 2)->default(0);
            $table->double('potongan_absensi', 8, 2)->default(0);
            $table->double('cicilan_koperasi', 8, 2)->default(0);
            $table->double('asuransi_lain', 8, 2)->default(0);
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx_payroll');
    }
};
