<?php

namespace App\Http\Controllers;

use App\Http\Requests\IngresoRequest;
use App\Http\Requests\ValidarRequest;
use App\Interfaces\AuthRepositoryInterface;
use App\Classes\ApiResponseClass;

class IngresoController extends Controller
{
    private AuthRepositoryInterface $authRepositoryInterface;

    public function __construct(AuthRepositoryInterface $authRepositoryInterface)
    {
        $this->authRepositoryInterface = $authRepositoryInterface;
    }

    public function ingreso(IngresoRequest $request)
    {
        $validated = $request->validated();

        $usuario = $validated['usuario'];
        $clave = $validated['clave'];

        list($token, $mensaje) = $this->authRepositoryInterface->ingreso($usuario, $clave);

        if ($token) {
            return ApiResponseClass::sendResponse($token, $mensaje);
        } else {
            return ApiResponseClass::sendResponse(null, $mensaje, 0);
        }
    }

    public function validar(ValidarRequest $request)
    {
        $validated = $request->validated();

        $token = $validated['token'];

        list($datos, $message) = $this->authRepositoryInterface->validar($token);

        if ($datos) {
            return ApiResponseClass::sendResponse($datos, $message);
        } else {
            return ApiResponseClass::sendResponse([], $message);
        }
    }
}