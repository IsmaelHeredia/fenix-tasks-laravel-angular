<?php

namespace App\Repositories;

use App\Interfaces\ReporteRepositoryInterface;
use App\Models\Tarea;
use Illuminate\Support\Facades\DB;

class ReporteRepository implements ReporteRepositoryInterface
{
    public function generarReporte()
    {
        $espacios_mayor_tiempo = DB::table('espacios')
            ->whereNotNull('fecha_inicio')
            ->whereNotNUll('fecha_finalizado')
            ->select(DB::raw('id, nombre, IFNULL(DATEDIFF(espacios.fecha_finalizado, espacios.fecha_inicio),0) AS dias'))
            ->orderBy('dias', 'DESC')
            ->take(3)
            ->get();

        $espacios_menor_tiempo = DB::table('espacios')
            ->select(DB::raw('id, nombre, DATEDIFF(fecha_finalizado, fecha_inicio) AS dias'))
            ->whereNotNull('fecha_inicio')
            ->whereNotNUll('fecha_finalizado')
            ->orderBy('dias', 'ASC')
            ->take(3)
            ->get();

        $tareas_mayor_tiempo = Tarea::select('id', 'nombre', 'tiempo')
            ->orderBy('tiempo', 'DESC')
            ->take(3)
            ->get();

        $tareas_menor_tiempo = Tarea::where('tiempo', '!=', '00:00:00')
            ->where('tiempo', '!=', '0')
            ->select('id', 'nombre', 'tiempo')
            ->orderBy('tiempo', 'ASC')
            ->take(3)
            ->get();

        $datos = [];
        $datos['espacios_mayor_tiempo'] = $espacios_mayor_tiempo;
        $datos['espacios_menor_tiempo'] = $espacios_menor_tiempo;
        $datos['tareas_mayor_tiempo'] = $tareas_mayor_tiempo;
        $datos['tareas_menor_tiempo'] = $tareas_menor_tiempo;

        return [$datos, 'Se enviaron los datos para el reporte'];
    }
}
