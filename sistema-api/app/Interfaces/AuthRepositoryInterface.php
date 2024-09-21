<?php

namespace App\Interfaces;

interface AuthRepositoryInterface
{
    public function ingreso($usuario, $clave);
    public function validar($token);
}
