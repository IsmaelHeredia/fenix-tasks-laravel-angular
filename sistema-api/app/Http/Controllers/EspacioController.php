<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardarEspacioRequest;
use App\Http\Requests\ListarEspaciosRequest;
use App\Http\Requests\ListarImagenesRequest;
use App\Http\Requests\ImagenRequest;
use Illuminate\Support\Facades\DB;
use App\Interfaces\EspacioRepositoryInterface;
use App\Classes\ApiResponseClass;

class EspacioController extends Controller
{
    private EspacioRepositoryInterface $espacioRepositoryInterface;

    public function __construct(EspacioRepositoryInterface $espacioRepositoryInterface)
    {
        $this->espacioRepositoryInterface = $espacioRepositoryInterface;
    }

    public function listarTodo()
    {
        list($datos, $mensaje) = $this->espacioRepositoryInterface->listarTodo();
        return ApiResponseClass::sendResponse($datos, $mensaje);
    }

    public function listar(ListarEspaciosRequest $request)
    {
        $validated = $request->validated();

        $porNombre = $validated['nombre'];
        $porCantidad = $validated['cantidad'] ? $validated['cantidad'] : $_ENV['PER_PAGE'];
        $porPagina = $validated['pagina'];

        list($datos, $mensaje) = $this->espacioRepositoryInterface->listar($porNombre, $porCantidad, $porPagina);

        return ApiResponseClass::sendResponse($datos, $mensaje);
    }

    public function cargar(string $id)
    {
        list($datos, $mensaje) = $this->espacioRepositoryInterface->cargar($id);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $mensaje);
        } else {
            return ApiResponseClass::sendResponse($datos, $mensaje, 0);
        }
    }

    public function crear(GuardarEspacioRequest $request)
    {
        $validated = $request->validated();

        $parametros = [
            'uuid' => $validated['uuid'],
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ? $validated['descripcion'] : null,
            'fecha_inicio' => isset($validated['fecha_inicio']) ? date('Y-m-d', strtotime($validated['fecha_inicio'])) : null,
            'fecha_finalizado' => isset($validated['fecha_finalizado']) ? date('Y-m-d', strtotime($validated['fecha_finalizado'])) : null,
            'id_estado' => $validated['id_estado'],
            'imagenes' => $validated['imagenes']
        ];

        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->espacioRepositoryInterface->crear($parametros);

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

    public function actualizar(GuardarEspacioRequest $request, string $id)
    {
        $validated = $request->validated();

        $parametros = [
            'uuid' => $validated['uuid'],
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ? $validated['descripcion'] : null,
            'fecha_inicio' => isset($validated['fecha_inicio']) ? date('Y-m-d', strtotime($validated['fecha_inicio'])) : null,
            'fecha_finalizado' => isset($validated['fecha_finalizado']) ? date('Y-m-d', strtotime($validated['fecha_finalizado'])) : null,
            'id_estado' => $validated['id_estado'],
            'imagenes' => $validated['imagenes']
        ];

        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->espacioRepositoryInterface->actualizar($id, $parametros);

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

            list($datos, $mensaje) = $this->espacioRepositoryInterface->borrar($id);

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

    public function listarImagenes(ListarImagenesRequest $request)
    {
        $validated = $request->validated();

        $porUuid = $validated['uuid'];

        list($datos, $mensaje) = $this->espacioRepositoryInterface->listarImagenes($porUuid);

        return ApiResponseClass::sendResponse($datos, $mensaje);
    }

    public function crearImagen(ImagenRequest $request)
    {
        $validated = $request->validated();

        $uuid = $validated['uuid'];
        $imagen = $validated['imagen'];

        list($datos, $mensaje) = $this->espacioRepositoryInterface->crearImagen($uuid, $imagen);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $mensaje);
        } else {
            return ApiResponseClass::sendResponse(null, $mensaje, 0);
        }
    }

}