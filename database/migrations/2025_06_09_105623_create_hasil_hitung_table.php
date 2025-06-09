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
        Schema::create('hasil_hitung', function (Blueprint $table) {
            $table->id();
            $table->string('nama_hasil_hitung')->nullable(false);
            $table->json('data')->nullable(true);
            $table->json('calculation')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_hitung');
    }
};
