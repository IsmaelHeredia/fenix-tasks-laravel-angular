<?php

namespace App\Repositories;

use App\Interfaces\AuthRepositoryInterface;
use App\Models\Usuario;
use App\Models\EspacioImagen;
use Illuminate\Support\Facades\Hash;
use App\Traits\SeguridadTrait;

class AuthRepository implements AuthRepositoryInterface
{
    use SeguridadTrait;

    public function ingreso($usuario, $clave)
    {
        $usuario_bd = Usuario::where('nombre', $usuario)->first();

        if (!$usuario_bd) {
            return [null, 'El usuario no existe'];
        }

        if (Hash::check($clave, $usuario_bd->clave)) {
            $token = $this->generarToken($usuario_bd->nombre, $usuario_bd->id);

            $carpeta_imagenes = public_path('images');

            $imagenes_sin_guardar = EspacioImagen::whereNull('id_espacio')->get();

            foreach ($imagenes_sin_guardar as $imagen_sin_guardar) {
                $imagen = EspacioImagen::find($imagen_sin_guardar->id);
                if ($imagen) {
                    $ruta = $carpeta_imagenes . "/" . $imagen->imagen;
                    if (\File::exists($ruta)) {
                        \File::delete($ruta);
                    }
                    $imagen->delete();
                }
            }

            return [$token, 'El usuario fue logeado correctamente'];
        } else {
            return [null, 'La contraseña es incorrecta'];
        }

    }
    public function validar($token)
    {
        if ($this->validarToken($token)) {
            $datos = $this->mostrarDatosToken($token);
            return [$datos, 'Se enviaron los datos del token'];
        } else {
            return null;
        }
    }
}
