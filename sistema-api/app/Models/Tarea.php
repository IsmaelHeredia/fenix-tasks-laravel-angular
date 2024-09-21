<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $fillable = ['id_espacio', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_finalizada', 'tiempo', 'id_estado'];

    public function espacio()
    {
        return $this->hasOne(Espacio::class, 'id', 'id_espacio');
    }

    public function estado()
    {
        return $this->hasOne(TareaEstado::class, 'id', 'id_estado');
    }
}
