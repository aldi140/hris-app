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
        Schema::create('ms_jadwal_kerja', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_karyawan')
                ->constrained('ms_karyawan')
                ->onDelete('cascade');
            
            $table->foreignId('shift_id');
                
            $table->date('schedule_date')
                ->comment('Tanggal berlakunya jadwal.');
            $table->string('user_at', 20)->nullable();
            $table->timestamps();

            $table->unique(['id_karyawan', 'schedule_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_jadwal_kerja');
    }
};
