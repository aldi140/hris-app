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
        Schema::create('trx_karyawan_absensi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_karyawan')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            $table->date('tgl_absensi');
            $table->time('schedule_in_time');
            $table->time('schedule_out_time');
            $table->time('check_in_time');
            $table->time('check_out_time')->nullable();
            $table->decimal('check_in_latitude', 10, 8)->nullable();
            $table->decimal('check_in_longitude', 11, 8)->nullable();
            $table->decimal('check_out_latitude', 10, 8)->nullable();
            $table->decimal('check_out_longitude', 11, 8)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx_karyawan_absensi');
    }
};
