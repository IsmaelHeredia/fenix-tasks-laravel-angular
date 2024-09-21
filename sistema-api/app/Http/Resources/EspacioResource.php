<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EspacioResource extends JsonResource
{
    public function toArray(Request $request): array
    {

        $fecha_inicio_format = $this->fecha_inicio ? date("d/m/Y", strtotime($this->fecha_inicio)) : null;
        $fecha_finalizado_format = $this->fecha_finalizado ? date("d/m/Y", strtotime($this->fecha_finalizado)) : null;

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'nombre' => $this->nombre,
            'descripcion' => $this->descripcion,
            'fecha_inicio' => $fecha_inicio_format,
            'fecha_finalizado' => $fecha_finalizado_format,
            'id_estado' => $this->id_estado,
        ];
    }
}
