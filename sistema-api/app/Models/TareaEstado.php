<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TareaEstado extends Model
{
    use HasFactory;

    protected $table = 'tareas_estados';
    public $timestamps = false;
    protected $fillable = ['nombre'];
}
