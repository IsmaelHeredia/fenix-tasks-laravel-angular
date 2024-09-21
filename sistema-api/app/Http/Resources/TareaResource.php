<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TareaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $fecha_inicio_format = $this->fecha_inicio ? date("d/m/Y", strtotime($this->fecha_inicio)) : null;
        $fecha_finalizado_format = $this->fecha_finalizada ? date("d/m/Y", strtotime($this->fecha_finalizada)) : null;

        return [
            'id' => $this->id,
            'id_espacio' => $this->id_espacio,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'fecha_inicio' => $fecha_inicio_format,
            'fecha_finalizada' => $fecha_finalizado_format,
            'tiempo' => $this->tiempo,
            'id_estado' => $this->id_estado,
            'espacio' => [
                'id' => $this->espacio->id,
                'nombre' => $this->espacio->nombre
            ],
            'estado' => [
                'id' => $this->estado->id,
                'nombre' => $this->estado->nombre
            ]
        ];
    }
}
