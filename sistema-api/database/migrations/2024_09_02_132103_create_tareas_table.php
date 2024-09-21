<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('id_espacio');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_finalizada')->nullable();
            $table->string('tiempo')->nullable();
            $table->unsignedInteger('id_estado');
            $table->timestamps();

            $table->foreign('id_espacio')->references('id')->on('espacios')->onDelete('cascade');
            $table->foreign('id_estado')->references('id')->on('tareas_estados')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('tareas', function (Blueprint $table) {
            $table->dropForeign(['id_espacio','id_estado']);
        });

        Schema::dropIfExists('tareas');
    }
};
