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
        Schema::create('trx_karyawan_kontrak', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('id_karyawan')->constrained('ms_karyawan')->onDelete('cascade');
            $table->string('no_kontrak')->unique();
            $table->date('tgl_mulai');
            $table->date('tgl_akhir')->nullable();
            $table->date('tgl_perpanjang')->nullable();
            $table->string('tipe_kontrak')
                ->comment('Tipe kontrak: PKWT, PKWTT, Magang, Harian Lepas');
            $table->tinyInteger('kontrak_ke')->default(1);
            $table->string('status')
                ->default('Aktif')
                ->comment('Status kontrak: Aktif, Berakhir, Diperpanjang, Resigned, Terminated');
            $table->boolean('is_active')->default(true);
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx_karyawan_kontrak');
    }
};
