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
        Schema::create('ms_potongan', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_karyawan');
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
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_potongan');
    }
};
