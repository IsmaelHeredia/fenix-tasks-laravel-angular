<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarEspacioImagenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_espacio' => 'required',
            'imagen' => 'required',
            'orden' => 'required',
            'activa' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'id_espacio.required' => 'El espacio es obligatorio',
            'imagen.required' => 'La imagen es obligatoria',
            'orden.required' => 'El orden es obligatorio',
            'activa.required' => 'El estado es obligatorio',
        ];
    }
}
