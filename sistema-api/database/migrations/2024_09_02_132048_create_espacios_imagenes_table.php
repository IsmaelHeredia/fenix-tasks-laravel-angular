<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('espacios_imagenes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid');
            $table->unsignedInteger('id_espacio')->nullable();
            $table->string('imagen');
            $table->integer('orden')->nullable();
            $table->integer('activa');
            $table->timestamps();

            $table->foreign('id_espacio')->references('id')->on('espacios')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('espacios_imagenes', function (Blueprint $table) {
            $table->dropForeign(['id_espacio']);
        });

        Schema::dropIfExists('espacios_imagenes');
    }
};
