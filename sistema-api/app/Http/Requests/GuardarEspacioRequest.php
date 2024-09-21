<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarEspacioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'uuid' => 'required',
            'nombre' => 'required',
            'descripcion' => 'nullable',
            'fecha_inicio' => 'nullable',
            'fecha_finalizado' => 'nullable',
            'id_estado' => 'required',
            'imagenes' => 'nullable'
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'El uuid es obligatorio',
            'nombre.required' => 'El titulo es obligatorio',
            'id_estado.required' => 'Seleccione una o varias categorias',
        ];
    }
}
