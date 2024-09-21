<?php

namespace App\Repositories;

use App\Interfaces\EspacioRepositoryInterface;
use App\Models\Espacio;
use App\Models\EspacioImagen;
use App\Http\Resources\EspacioResource;
use App\Http\Resources\ImagenResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class EspacioRepository implements EspacioRepositoryInterface
{
    public function listarTodo()
    {
        $datos = Espacio::orderBy('nombre')->get();
        return [EspacioResource::collection($datos), 'Se envío listado completo de espacios'];
    }
    public function listar($porNombre, $porCantidad, $porPagina)
    {
        if (!is_numeric($porPagina)) {
            $porPagina = 1;
        }

        $resultado = DB::table('espacios')
            ->select(DB::raw(
                'espacios.id,
                espacios.nombre,
                espacios.descripcion,
                DATE_FORMAT(espacios.fecha_inicio,"%d/%m/%Y") AS fecha_inicio,
                DATE_FORMAT(espacios.fecha_finalizado,"%d/%m/%Y") AS fecha_finalizado,
                espacios_estados.id AS id_estado,
                espacios_estados.nombre AS nombre_estado,
                IFNULL(count(tareas.id),0) AS cantidad_tareas,
                IFNULL(DATEDIFF(espacios.fecha_finalizado, espacios.fecha_inicio),0) AS dias
                '
            ))
            ->join('espacios_estados', 'espacios_estados.id', '=', 'espacios.id_estado')
            ->leftJoin('tareas', 'tareas.id_espacio', '=', 'espacios.id')
            ->where('espacios.nombre', 'like', '%' . $porNombre . '%')
            ->orderBy('espacios.updated_at', 'DESC')
            ->groupBy(
                [
                    'espacios.id',
                    'espacios.nombre',
                    'espacios.descripcion',
                    'espacios.fecha_inicio',
                    'espacios.fecha_finalizado',
                    'espacios_estados.id',
                    'espacios_estados.nombre'
                ]
            )
            ->paginate($porCantidad, ['*'], 'page', $porPagina);

        return [$resultado, 'Se envío listado de espacios'];
    }
    public function cargar($id)
    {
        $espacio = Espacio::with([
            'estado' => function ($query) {
                $query->select('id', 'nombre');
            }
        ])
            ->select('id', 'uuid', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_finalizado', 'id_estado')
            ->find($id);

        if ($espacio) {
            return [new EspacioResource($espacio), 'Se envío datos del espacio'];
        } else {
            return [null, 'El espacio no existe', 0];
        }
    }
    public function crear(array $parametros)
    {
        $espacio = new Espacio;

        $uuid = $parametros['uuid'];

        $espacio->uuid = $uuid;
        $espacio->nombre = $parametros['nombre'];
        $espacio->descripcion = $parametros['descripcion'];
        $espacio->fecha_inicio = $parametros['fecha_inicio'];
        $espacio->fecha_finalizado = $parametros['fecha_finalizado'];
        $espacio->id_estado = $parametros['id_estado'];

        $imagenes = $parametros['imagenes'];

        $guardado = $espacio->save();

        if ($guardado) {

            $orden = 0;

            foreach ($imagenes as $imagen) {

                $orden++;

                $id = $imagen['id'];

                $img = EspacioImagen::find($id);
                $img->id_espacio = $espacio->id;
                $img->orden = $orden;
                $img->activa = 1;

                $img->save();
            }

            $carpeta_imagenes = public_path('images');

            $imagenes_sin_guardar = EspacioImagen::where('uuid', '=', $uuid)->whereNull('id_espacio')->get();

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

            return [new EspacioResource($espacio), 'El espacio fue creado'];

        } else {
            return [null, 'Ocurrió un error creando el espacio'];
        }
    }
    public function actualizar($id, array $parametros)
    {
        $espacio = Espacio::find($id);

        if (!$espacio) {
            return [null, 'El espacio no existe', 0];
        }

        $uuid = $parametros['uuid'];

        $espacio->uuid = $uuid;
        $espacio->nombre = $parametros['nombre'];
        $espacio->descripcion = $parametros['descripcion'];
        $espacio->fecha_inicio = $parametros['fecha_inicio'];
        $espacio->fecha_finalizado = $parametros['fecha_finalizado'];
        $espacio->id_estado = $parametros['id_estado'];

        $imagenes = $parametros['imagenes'];

        $guardado = $espacio->save();

        if ($guardado) {

            $orden = 0;

            foreach ($imagenes as $imagen) {

                $orden++;

                $id = $imagen['id'];

                $img = EspacioImagen::find($id);
                $img->id_espacio = $espacio->id;
                $img->orden = $orden;
                $img->activa = 1;

                $img->save();
            }

            $carpeta_imagenes = public_path('images');

            $imagenes_sin_guardar = EspacioImagen::where('uuid', '=', $uuid)->whereNull('id_espacio')->get();

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

            return [new EspacioResource($espacio), 'El espacio fue actualizado'];
        } else {
            return [null, 'Ocurrió un error actualizando el espacio', 0];
        }
    }
    public function borrar($id)
    {
        $espacio = Espacio::find($id);

        if (!$espacio) {
            return [null, 'El espacio no existe', 0];
        }

        $carpeta_imagenes = public_path('images');

        $imagenes = EspacioImagen::where('id_espacio', '=', $id)->get();

        foreach ($imagenes as $imagen) {
            $ruta = $carpeta_imagenes . "/" . $imagen->imagen;
            if (\File::exists($ruta)) {
                \File::delete($ruta);
            }
        }

        if ($espacio->delete()) {
            return [new EspacioResource($espacio), 'El espacio fue borrado'];
        } else {
            return [null, 'Ocurrió un error borrando el espacio', 0];
        }
    }
    public function listarImagenes($porUuid)
    {
        $data = EspacioImagen::where('uuid', '=', $porUuid)->orderBy('orden', 'ASC')->get();

        return [ImagenResource::collection($data), 'Se envío listado completo de espacios'];
    }
    public function crearImagen($uuid, $imagen)
    {
        $cantidadImagenes = EspacioImagen::all()->count();

        $orden = 1;

        if ($cantidadImagenes > 0) {
            $img = EspacioImagen::orderBy('orden', 'DESC')->first();
            $orden = $img->orden + 1;
        }

        $imagen_nuevo_nombre = Str::random(10) . '.' . $imagen->extension();

        $imagen->move(public_path('images'), $imagen_nuevo_nombre);

        $imagen = new EspacioImagen();

        $imagen->uuid = $uuid;
        $imagen->id_espacio = null;
        $imagen->imagen = $imagen_nuevo_nombre;
        $imagen->orden = $orden;
        $imagen->activa = 0;

        $guardado = $imagen->save();

        if ($guardado) {
            return [new ImagenResource($imagen), 'La imagen fue creada'];
        } else {
            return [null, 'Ocurrió un error creando la imagen', 0];
        }
    }
}
