<?php

namespace App\Interfaces;

interface TareaRepositoryInterface
{
    public function listarTodo();
    public function listar($porEspacio, $porNombre);
    public function cargar($id);
    public function crear(array $parametros);
    public function actualizar($id, array $parametros);
    public function borrar($id);
    public function cargarTiempo($id);
    public function actualizarTiempo($id, $tiempo);
}
