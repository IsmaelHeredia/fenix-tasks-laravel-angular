<?php

namespace App\Repositories;

use App\Interfaces\TareaRepositoryInterface;
use App\Models\Espacio;
use App\Models\Tarea;
use App\Http\Resources\TareaResource;

class TareaRepository implements TareaRepositoryInterface
{
    public function listarTodo()
    {
        $datos = Tarea::orderBy('nombre')->get();
        return [TareaResource::collection($datos), 'Se envío listado completo de tareas'];
    }
    public function listar($porEspacio, $porNombre)
    {
        $espacio = Espacio::find($porEspacio);

        $tareas = Tarea::select('id', 'id_espacio', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_finalizada', 'tiempo', 'id_estado')->with('espacio', 'estado');

        if ($porEspacio != null && $porEspacio != "" && $porEspacio > 0) {
            $tareas->where('id_espacio', $porEspacio);
        }

        if ($porNombre != null && $porNombre != "") {
            $tareas->where('nombre', 'like', '%' . $porNombre . '%');
        }

        $tareas->orderBy('updated_at', 'DESC');

        $resultado = $tareas->get();

        $datos = [];
        $datos['espacio'] = $espacio;
        $datos['tareas'] = TareaResource::collection($resultado);

        return [$datos, 'Se envío listado de tareas'];
    }
    public function cargar($id)
    {
        $tarea = Tarea::with([
            'espacio' => function ($query) {
                $query->select('id', 'nombre');
            }
        ])
            ->with([
                'estado' => function ($query) {
                    $query->select('id', 'nombre');
                }
            ])
            ->select('id', 'id_espacio', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_finalizada', 'tiempo', 'id_estado')
            ->find($id);

        if ($tarea) {
            return [new TareaResource($tarea), 'Se envío datos de la tarea'];
        } else {
            return [null, 'La tarea no existe', 0];
        }
    }
    public function crear(array $parametros)
    {
        $tarea = new Tarea;

        $tarea->id_espacio = $parametros['id_espacio'];
        $tarea->nombre = $parametros['nombre'];
        $tarea->descripcion = $parametros['descripcion'];
        $tarea->fecha_inicio = $parametros['fecha_inicio'];
        $tarea->fecha_finalizada = $parametros['fecha_finalizada'];
        $tarea->tiempo = $parametros['tiempo'];
        $tarea->id_estado = $parametros['id_estado'];

        $guardado = $tarea->save();

        if ($guardado) {
            return [new TareaResource($tarea), 'La tarea fue creada'];
        } else {
            return [null, 'Ocurrió un error creando la tarea', 0];
        }
    }
    public function actualizar($id, array $parametros)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return [null, 'La tarea no existe', 0];
        }

        $tarea->id_espacio = $parametros['id_espacio'];
        $tarea->nombre = $parametros['nombre'];
        $tarea->descripcion = $parametros['descripcion'];
        $tarea->fecha_inicio = $parametros['fecha_inicio'];
        $tarea->fecha_finalizada = $parametros['fecha_finalizada'];
        $tarea->id_estado = $parametros['id_estado'];

        $guardado = $tarea->save();

        if ($guardado) {
            return [new TareaResource($tarea), 'La tarea fue actualizada'];
        } else {
            return [null, 'Ocurrió un error actualizando la tarea', 0];
        }
    }
    public function borrar($id)
    {
        $tarea = Tarea::find($id);

        if (!$tarea) {
            return [null, 'La tarea no existe', 0];
        }

        if ($tarea->delete()) {
            return [new TareaResource($tarea), 'La tarea fue borrada'];
        } else {
            return [null, 'Ocurrió un error borrando la tarea', 0];
        }
    }
    public function cargarTiempo($id)
    {
        $tarea = Tarea::select('id', 'tiempo')->find($id);

        if ($tarea) {
            return [new TareaResource($tarea), 'Se envío datos de la tarea'];
        } else {
            return [null, 'La tarea no existe', 0];
        }
    }
    public function actualizarTiempo($id, $tiempo)
    {
        $tarea = Tarea::find($id);

        $tarea->tiempo = $tiempo;

        $guardado = $tarea->save();

        if ($guardado) {
            return [new TareaResource($tarea), 'La tarea fue actualizada'];
        } else {
            return [null, 'Ocurrió un error actualizando la tarea', 0];
        }
    }
}
