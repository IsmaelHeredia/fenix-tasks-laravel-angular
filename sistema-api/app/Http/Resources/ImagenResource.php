<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImagenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'id_espacio' => $this->id_espacio,
            'imagen' => $this->imagen,
            'orden' => $this->orden,
            'activa' => $this->activa
        ];
    }
}
