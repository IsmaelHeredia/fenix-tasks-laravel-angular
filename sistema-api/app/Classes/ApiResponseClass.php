<?php

namespace App\Classes;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
class ApiResponseClass
{
    public static function rollback($e = null, $mensaje = "Ocurrió un error en el proceso")
    {
        DB::rollBack();
        if ($e) {
            self::throw($e, $mensaje);
        }
    }

    public static function throw($e, $mensaje = "Ocurrió un error en el proceso")
    {
        print_r($e);
        Log::info($e);
        throw new HttpResponseException(response()->json(["mensaje" => $mensaje], 500));
    }

    public static function sendResponse($resultado, $mensaje = "", $estado = 1, $codigo = 200)
    {
        $response = [
            'estado' => $estado,
            'mensaje' => $mensaje,
            'datos' => $resultado
        ];

        return response()->json($response, $codigo);
    }

}