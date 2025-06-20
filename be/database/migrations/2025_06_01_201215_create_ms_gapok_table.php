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
        Schema::create('ms_gapok', function (Blueprint $table) {
            $table->id();
            $table->string('golongan', 20);
            $table->double('gapok');
            $table->date('tgl_aktif')->nullable();
            $table->string('status', 2)->nullable();
            $table->string('user_at', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ms_gapok');
    }
};
