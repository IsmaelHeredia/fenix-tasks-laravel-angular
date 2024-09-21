<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\CuentaController;
use App\Http\Controllers\EspacioController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\CalendarioController;

use App\Http\Middleware\ValidarIngreso;

Route::post('/ingreso', [IngresoController::class, 'ingreso'])->name('ingreso');
Route::post('/validar', [IngresoController::class, 'validar'])->name('validar');

Route::middleware([ValidarIngreso::class])->group(function () {

    Route::get('/espacios/estados', [HomeController::class, 'listarEstadosEspacios'])->name('listarEstadosEspacios');
    Route::get('/tareas/estados', [HomeController::class, 'listarEstadosTareas'])->name('listarEstadosTareas');

    Route::get('/espacios', [EspacioController::class, 'listarTodo'])->name('listarEspaciosCompletos');
    Route::post('/espacios/listar', [EspacioController::class, 'listar'])->name('listarEspacios');
    Route::get('/espacios/{id}', [EspacioController::class, 'cargar'])->name('cargarEspacio');
    Route::post('/espacios', [EspacioController::class, 'crear'])->name('crearEspacio');
    Route::put('/espacios/{id}', [EspacioController::class, 'actualizar'])->name('actualizarEspacio');
    Route::delete('/espacios/{id}', [EspacioController::class, 'borrar'])->name('borrarEspacio');

    Route::post('/espacios/imagenes/listar', [EspacioController::class, 'listarImagenes'])->name('listarImagenes');
    Route::post('/espacios/imagenes', [EspacioController::class, 'crearImagen'])->name('crearImagen');

    Route::get('/tareas', [TareaController::class, 'listarTodo'])->name('listarTareasCompletas');
    Route::post('/tareas/listar', [TareaController::class, 'listar'])->name('listarTareas');
    Route::get('/tareas/{id}', [TareaController::class, 'cargar'])->name('cargarTarea');
    Route::post('/tareas', [TareaController::class, 'crear'])->name('crearTarea');
    Route::put('/tareas/{id}', [TareaController::class, 'actualizar'])->name('actualizarTarea');
    Route::delete('/tareas/{id}', [TareaController::class, 'borrar'])->name('borrarTarea');

    Route::get('/tareas/{id}/tiempo', [TareaController::class, 'cargarTiempo'])->name('cargarTiempo');
    Route::put('/tareas/{id}/tiempo', [TareaController::class, 'actualizarTiempo'])->name('actualizarTiempo');

    Route::get('/reporte', [ReporteController::class, 'generarReporte'])->name('generarReporte');
    Route::get('/calendario', [CalendarioController::class, 'generarCalendario'])->name('generarCalendario');

    Route::post('/cuenta', [CuentaController::class, 'actualizarDatos'])->name('actualizarDatos');
});