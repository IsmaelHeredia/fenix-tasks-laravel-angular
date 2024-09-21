<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Espacio extends Model
{
    use HasFactory;

    protected $table = 'espacios';

    protected $fillable = ['uuid', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_finalizado', 'id_estado'];

    public function estado()
    {
        return $this->hasOne(EspacioEstado::class, 'id', 'id_estado');
    }
}
