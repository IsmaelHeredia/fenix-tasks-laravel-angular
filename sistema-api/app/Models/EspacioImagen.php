<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EspacioImagen extends Model
{
    use HasFactory;

    protected $table = 'espacios_imagenes';

    protected $fillable = ['uuid', 'id_espacio', 'imagen', 'orden', 'activa'];

    public function espacio()
    {
        return $this->hasOne(Espacio::class, 'id', 'id_espacio');
    }
}
