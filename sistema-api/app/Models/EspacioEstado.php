<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EspacioEstado extends Model
{
    use HasFactory;

    protected $table = 'espacios_estados';
    public $timestamps = false;
    protected $fillable = ['nombre'];
}
