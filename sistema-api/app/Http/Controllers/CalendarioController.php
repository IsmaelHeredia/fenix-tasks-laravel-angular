<?php

namespace App\Http\Controllers;

use App\Interfaces\CalendarioRepositoryInterface;
use App\Classes\ApiResponseClass;

class CalendarioController extends Controller
{
    private CalendarioRepositoryInterface $calendarioRepositoryInterface;

    public function __construct(CalendarioRepositoryInterface $calendarioRepositoryInterface)
    {
        $this->calendarioRepositoryInterface = $calendarioRepositoryInterface;
    }

    public function generarCalendario()
    {
        list($datos, $mensaje) = $this->calendarioRepositoryInterface->generarCalendario();
        return ApiResponseClass::sendResponse($datos, $mensaje);
    }
}