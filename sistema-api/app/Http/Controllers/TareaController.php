<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardarTareaRequest;
use App\Http\Requests\ListarTareasRequest;
use App\Http\Requests\ActualizarTiempoRequest;
use Illuminate\Support\Facades\DB;
use App\Interfaces\TareaRepositoryInterface;
use App\Classes\ApiResponseClass;

class TareaController extends Controller
{
    private TareaRepositoryInterface $tareaRepositoryInterface;

    public function __construct(TareaRepositoryInterface $tareaRepositoryInterface)
    {
        $this->tareaRepositoryInterface = $tareaRepositoryInterface;
    }

    public function listarTodo()
    {
        list($datos, $mensaje) = $this->tareaRepositoryInterface->listarTodo();
        return ApiResponseClass::sendResponse($datos, $mensaje);
    }

    public function listar(ListarTareasRequest $request)
    {
        $validated = $request->validated();

        $porEspacio = $validated['id_espacio'];
        $porNombre = $validated['nombre'];

        list($datos, $mensaje) = $this->tareaRepositoryInterface->listar($porEspacio, $porNombre);

        return ApiResponseClass::sendResponse($datos, $mensaje);
    }

    public function cargar(string $id)
    {
        list($datos, $mensaje) = $this->tareaRepositoryInterface->cargar($id);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $mensaje);
        } else {
            return ApiResponseClass::sendResponse($datos, $mensaje, 0);
        }
    }

    public function crear(GuardarTareaRequest $request)
    {
        $validated = $request->validated();

        $parametros = [
            'id_espacio' => $validated['id_espacio'],
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ? $validated['descripcion'] : null,
            'fecha_inicio' => isset($validated['fecha_inicio']) ? date('Y-m-d', strtotime($validated['fecha_inicio'])) : null,
            'fecha_finalizada' => isset($validated['fecha_finalizada']) ? date('Y-m-d', strtotime($validated['fecha_finalizada'])) : null,
            'tiempo' => $validated['tiempo'] ? $validated['tiempo'] : "00:00:00",
            'id_estado' => $validated['id_estado']
        ];

        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->tareaRepositoryInterface->crear($parametros);

            if ($datos) {
                DB::commit();
                return ApiResponseClass::sendResponse($datos, $mensaje);
            } else {
                ApiResponseClass::rollback();
                return ApiResponseClass::sendResponse($datos, $mensaje, 0);
            }

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function actualizar(GuardarTareaRequest $request, string $id)
    {
        $validated = $request->validated();

        $parametros = [
            'id_espacio' => $validated['id_espacio'],
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ? $validated['descripcion'] : null,
            'fecha_inicio' => isset($validated['fecha_inicio']) ? date('Y-m-d', strtotime($validated['fecha_inicio'])) : null,
            'fecha_finalizada' => isset($validated['fecha_finalizada']) ? date('Y-m-d', strtotime($validated['fecha_finalizada'])) : null,
            'id_estado' => $validated['id_estado']
        ];

        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->tareaRepositoryInterface->actualizar($id, $parametros);

            if ($datos) {
                DB::commit();
                return ApiResponseClass::sendResponse($datos, $mensaje);
            } else {
                ApiResponseClass::rollback();
                return ApiResponseClass::sendResponse($datos, $mensaje, 0);
            }

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function borrar(string $id)
    {
        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->tareaRepositoryInterface->borrar($id);

            if ($datos) {
                DB::commit();
                return ApiResponseClass::sendResponse($datos, $mensaje);
            } else {
                ApiResponseClass::rollback();
                return ApiResponseClass::sendResponse($datos, $mensaje, 0);
            }

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function cargarTiempo(string $id)
    {
        list($datos, $mensaje) = $this->tareaRepositoryInterface->cargarTiempo($id);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $mensaje);
        } else {
            return ApiResponseClass::sendResponse($datos, $mensaje, 0);
        }
    }

    public function actualizarTiempo(string $id, ActualizarTiempoRequest $request)
    {
        $validated = $request->validated();

        $tiempo = $validated['tiempo'];

        list($datos, $mensaje) = $this->tareaRepositoryInterface->actualizarTiempo($id, $tiempo);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $mensaje);
        } else {
            return ApiResponseClass::sendResponse($datos, $mensaje, 0);
        }
    }
}