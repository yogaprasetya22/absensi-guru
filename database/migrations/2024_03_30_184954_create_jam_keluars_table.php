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
        Schema::create('jam_keluars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kehadiran_id');
            $table->time('jam_keluar');
            $table->string('image_keluar');
            $table->string('longtitude');
            $table->string('latitude');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jam_keluars');
    }
};
