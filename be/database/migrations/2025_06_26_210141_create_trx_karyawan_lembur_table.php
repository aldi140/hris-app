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
        Schema::create('trx_karyawan_lembur', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_karyawan')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            $table->string('no_dokumen', 20);
            $table->date('tgl_lembur');
            $table->time('jam_mulai');
            $table->time('jam_akhir');
            $table->decimal('total_hours', 5, 2);
            $table->text('keterangan');

            // Field Status & Persetujuan
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
                ->constrained('users') // Atau tabel user admin/atasan
                ->comment('ID user yang menyetujui/menolak.');

            $table->timestamp('approved_at')
                ->nullable()
                ->comment('Timestamp persetujuan.');

            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trx_karyawan_lembur');
    }
};
