<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('espacios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_finalizado')->nullable();
            $table->unsignedInteger('id_estado');
            $table->timestamps();

            $table->foreign('id_estado')->references('id')->on('espacios_estados')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('espacios', function (Blueprint $table) {
            $table->dropForeign(['id_estado']);
        });

        Schema::dropIfExists('espacios');
    }
};
