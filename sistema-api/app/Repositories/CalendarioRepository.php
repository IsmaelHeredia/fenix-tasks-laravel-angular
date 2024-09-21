<?php

namespace App\Repositories;

use App\Interfaces\CalendarioRepositoryInterface;
use App\Models\Espacio;
use App\Models\Tarea;
use App\Http\Resources\CalendarioResource;

class CalendarioRepository implements CalendarioRepositoryInterface
{
    public function generarCalendario()
    {
        $espacios_iniciados = Espacio::select('id', 'nombre', 'fecha_inicio')
            ->whereNotNull('fecha_inicio')
            ->orderBy('fecha_inicio', 'ASC')
            ->get();

        $espacios_terminados = Espacio::select('id', 'nombre', 'fecha_finalizado')
        ->whereNotNull('fecha_finalizado')
        ->orderBy('fecha_finalizado', 'ASC')
        ->get();

        $tareas_iniciadas = Tarea::select('id', 'nombre', 'fecha_inicio')
        ->whereNotNull('fecha_inicio')
        ->orderBy('fecha_inicio', 'ASC')
        ->get();

        $tareas_terminadas = Tarea::select('id', 'nombre', 'fecha_finalizada')
        ->whereNotNull('fecha_finalizada')
        ->orderBy('fecha_finalizada', 'ASC')
        ->get();

        $datos = [];

        $datos['espacios_iniciados'] = $espacios_iniciados;
        $datos['espacios_terminados'] = $espacios_terminados;
        $datos['tareas_iniciadas'] = $tareas_iniciadas;
        $datos['tareas_terminadas'] = $tareas_terminadas;

        return [$datos, 'Se enviaron los datos para el calendario'];
    }
}
