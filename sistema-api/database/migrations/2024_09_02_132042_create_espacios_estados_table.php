<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('espacios_estados', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('espacios_estados');
    }
};
