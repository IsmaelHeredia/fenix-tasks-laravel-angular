<?php

namespace App\Http\Controllers;

use App\Http\Requests\CuentaRequest;
use Illuminate\Support\Facades\DB;
use App\Interfaces\CuentaRepositoryInterface;
use App\Classes\ApiResponseClass;

class CuentaController extends Controller
{
    private CuentaRepositoryInterface $cuentaRepositoryInterface;

    public function __construct(CuentaRepositoryInterface $cuentaRepositoryInterface)
    {
        $this->cuentaRepositoryInterface = $cuentaRepositoryInterface;
    }

    public function actualizarDatos(CuentaRequest $request)
    {
        $validated = $request->validated();

        $parametros = [
            'usuario' => $validated['usuario'],
            'nuevo_usuario' => $validated['nuevo_usuario'],
            'clave' => $validated['clave'],
            'nueva_clave' => $validated['nueva_clave']
        ];

        DB::beginTransaction();

        try {

            list($datos, $mensaje) = $this->cuentaRepositoryInterface->actualizarDatos($parametros);

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
}