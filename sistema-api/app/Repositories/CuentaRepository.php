<?php

namespace App\Repositories;

use App\Interfaces\CuentaRepositoryInterface;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UsuarioResource;

class CuentaRepository implements CuentaRepositoryInterface
{
    public function actualizarDatos(array $datos) {
        
        $usuario = $datos['usuario'];
        $nuevo_usuario = $datos['nuevo_usuario'];
        $clave = $datos['clave'];
        $nueva_clave = $datos['nueva_clave'];

        $usuario_bd = Usuario::where('nombre', $usuario)->first();

        if(!$usuario_bd)
        {
            return [null, 'El usuario no existe', 0];
        }

        if (!Hash::check($clave, $usuario_bd->clave))
        {
            return [null, 'La clave es incorrecta', 0];
        }

        $usuario_bd->nombre = $nuevo_usuario;
        $usuario_bd->clave = Hash::make($nueva_clave);

        $guardado = $usuario_bd->save();

        if($guardado)
        {
            return [new UsuarioResource($usuario_bd), 'Los datos de la cuenta se actualizaron correctamente'];
        }
        else
        {
            return [null, 'Ocurrió un error actualizando los datos', 0];
        }
    }
}
