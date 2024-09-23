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
            ->whereNotNull('fecha_inicio')
            ->whereNotNUll('fecha_finalizado')
            ->select(DB::raw('id, nombre, IFNULL(DATEDIFF(espacios.fecha_finalizado, espacios.fecha_inicio),0) AS dias'))
            ->orderBy('dias', 'ASC')
            ->take(3)
            ->get();

        $tareas_mayor_tiempo = DB::table('tareas')
            ->select(DB::raw(
                'tareas.id,
                tareas.nombre,
                tareas.tiempo,
                espacios.nombre AS espacio_nombre
                '
            ))
            ->join('espacios', 'espacios.id', '=', 'tareas.id_espacio')
            ->orderBy('tiempo', 'DESC')
            ->take(3)
            ->get();

        $tareas_menor_tiempo = DB::table('tareas')
            ->select(DB::raw(
                'tareas.id,
                tareas.nombre,
                tareas.tiempo,
                espacios.nombre AS espacio_nombre
                '
            ))
            ->join('espacios', 'espacios.id', '=', 'tareas.id_espacio')
            ->where('tareas.tiempo', '!=', '00:00:00')
            ->where('tareas.tiempo', '!=', '0')
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
