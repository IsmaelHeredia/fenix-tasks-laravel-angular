<?php

namespace App\Interfaces;

interface EspacioRepositoryInterface
{
    public function listarTodo();
    public function listar($porNombre, $porCantidad, $porPagina);
    public function cargar($id);
    public function crear(array $parametros);
    public function actualizar($id, array $parametros);
    public function borrar($id);
    public function listarImagenes($porUuid);
    public function crearImagen($uuid, $imagen);

}
