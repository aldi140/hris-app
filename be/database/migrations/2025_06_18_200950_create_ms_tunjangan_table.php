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
        Schema::create('ms_tunjangan', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_karyawan');
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
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_tunjangan');
    }
};
