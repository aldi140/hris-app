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
        Schema::create('ms_shift_kerja', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 50)
                ->unique()
                ->comment('Nama shift (e.g., Pagi, Siang).');
                
            $table->time('start_time')
                ->comment('Waktu mulai jam kerja.');
                
            $table->time('end_time')
                ->comment('Waktu selesai jam kerja.');
                
            $table->decimal('jumlah_jam', 4, 2)
                ->comment('Durasi jam kerja (e.g., 8.0).');
                
            $table->unsignedInteger('break_minutes')
                ->default(60)
                ->comment('Durasi istirahat dalam menit.');
            
            $table->boolean('is_active')
                ->default(true);
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_shift_kerja');
    }
};
