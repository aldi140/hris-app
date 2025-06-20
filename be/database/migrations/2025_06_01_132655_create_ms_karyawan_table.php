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
        Schema::create('ms_karyawan', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('id_jabatan');
            $table->bigInteger('id_departemen');
            $table->string('nik', 20);
            $table->string('nama', 150);
            $table->string('jenis_kelamin', 2);
            $table->date('tgl_lahir')->nullable();
            $table->string('tempat_lahir', 70)->nullable();
            $table->text('alamat')->nullable();
            $table->text('alamat_domisili')->nullable();
            $table->string('ktp', 20)->nullable();
            $table->string('bpjs_kesehatan', 20)->nullable();
            $table->string('bpjs_ketenagakerjaan', 20)->nullable();
            $table->string('npwp', 20)->nullable();
            $table->string('ijazah', 20)->nullable();
            $table->text('file_ktp')->nullable();
            $table->text('file_bpjs_kesehatan')->nullable();
            $table->text('file_bpjs_ketenagakerjaan')->nullable();
            $table->text('file_npwp')->nullable();
            $table->text('file_ijazah')->nullable();
            $table->text('file_sertifikat')->nullable();
            $table->date('tgl_masuk')->nullable();
            $table->date('tgl_keluar')->nullable();
            $table->string('status_karyawan', 20)->nullable();
            $table->string('status_kawin', 2)->nullable();
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_karyawan');
    }
};
