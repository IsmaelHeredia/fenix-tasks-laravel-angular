<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\EspacioEstado;
use App\Models\TareaEstado;
use App\Models\Espacio;
use App\Models\Tarea;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $datetime = date('Y-m-d H:i:s');

        Usuario::insert([
            ['nombre' => 'supervisor', 'clave' => Hash::make('supervisor'), 'created_at' => $datetime, 'updated_at' => $datetime],
        ]);

        EspacioEstado::insert([
            ['nombre' => 'Sin iniciar'],
            ['nombre' => 'En proceso'],
            ['nombre' => 'Finalizado'],
        ]);

        TareaEstado::insert([
            ['nombre' => 'Sin hacer'],
            ['nombre' => 'En proceso'],
            ['nombre' => 'Finalizada'],
        ]);

        /*
        for ($i = 1; $i <= 25; $i++) {
            Espacio::insert(
                [
                    'uuid' => "uuid-$i",
                    'nombre' => "Nombre $i",
                    'descripcion' => "Descripción $i",
                    'fecha_inicio' => $datetime,
                    'fecha_finalizado' => $datetime,
                    'id_estado' => 1,
                    'created_at' => $datetime,
                    'updated_at' => $datetime
                ]
            );
        }

        for ($i = 1; $i <= 25; $i++) {
            Tarea::insert(
                [
                    'id_espacio' => 1,
                    'nombre' => "Nombre $i",
                    'descripcion' => "Descripción $i",
                    'fecha_inicio' => $datetime,
                    'fecha_finalizada' => $datetime,
                    'tiempo' => '00:00:00',
                    'id_estado' => 1,
                    'created_at' => $datetime,
                    'updated_at' => $datetime
                ]
            );
        }
        */
    }
}
