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
        Schema::create('presensi_gurus', function (Blueprint $table) {
            $table->uuid('uuid')->primary();
            $table->uuid('guru_uuid');
            $table->foreign('guru_uuid')->references('uuid')->on('gurus');
            $table->unsignedBigInteger('status_kehadiran_id')->nullable();
            $table->foreign('status_kehadiran_id')->references('id')->on('kehadirans');
            $table->date('tanggal');
            $table->foreignId('jam_masuk_id');
            $table->foreignId('jam_keluar_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presensi_gurus');
    }
};
