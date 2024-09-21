<?php

namespace App\Http\Controllers;

use App\Interfaces\ReporteRepositoryInterface;
use App\Classes\ApiResponseClass;

class ReporteController extends Controller
{
    private ReporteRepositoryInterface $reporteRepositoryInterface;

    public function __construct(ReporteRepositoryInterface $reporteRepositoryInterface)
    {
        $this->reporteRepositoryInterface = $reporteRepositoryInterface;
    }

    public function generarReporte()
    {
        list($datos, $mensaje) = $this->reporteRepositoryInterface->generarReporte();
        return ApiResponseClass::sendResponse($datos, $mensaje);
    }
}