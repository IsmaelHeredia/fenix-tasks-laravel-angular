<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EspacioEstado;
use App\Models\TareaEstado;
use App\Traits\RespuestaTrait;

class HomeController extends Controller
{
    use RespuestaTrait;

    public function listarEstadosEspacios()
    {
        $espacios_estados = EspacioEstado::all();

        return $this->success("Los estados de los espacios fueron enviados correctamente", $espacios_estados);
    }

    public function listarEstadosTareas()
    {
        $tareas_estados = TareaEstado::all();

        return $this->success("Los estados de las tareas fueron enviados correctamente", $tareas_estados);
    }
}