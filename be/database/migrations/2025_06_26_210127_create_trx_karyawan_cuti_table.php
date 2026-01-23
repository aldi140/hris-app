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
        Schema::create('trx_karyawan_cuti', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_karyawan')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            $table->foreignId('id_karyawan_pengganti')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            $table->string('no_dokumen', 20);
            $table->foreignId('id_cuti');
            $table->date('tgl_mulai')
                ->comment('Tanggal mulai cuti.');
            $table->date('tgl_akhir')
                ->comment('Tanggal berakhir cuti.');
            $table->unsignedInteger('total_hari')
                ->comment('Jumlah total hari cuti yang diambil.');
            $table->text('alasan')
                ->comment('Alasan pengajuan cuti.');
            $table->string('status', 20)
                ->default('Pending')
                ->comment('Status pengajuan: Pending, Approved, Rejected, Canceled.');

            $table->foreignId('checked_by')
                ->nullable()
                ->constrained('users') 
                ->comment('ID user yang menyetujui/menolak.');

            $table->timestamp('checked_at')
                ->nullable()
                ->comment('Timestamp persetujuan.');

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users') 
                ->comment('ID user yang menyetujui/menolak.');

            $table->timestamp('approved_at')
                ->nullable()
                ->comment('Timestamp persetujuan.');

            // Field Dokumen Pendukung
            $table->string('attachment_path', 255)
                ->nullable()
                ->comment('Path file dokumen pendukung (e.g., surat dokter).');
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx_karyawan_cuti');
    }
};
