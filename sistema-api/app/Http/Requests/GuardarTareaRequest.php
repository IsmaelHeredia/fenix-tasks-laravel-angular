<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuardarTareaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_espacio' => 'required',
            'nombre' => 'required',
            'descripcion' => 'nullable',
            'fecha_inicio' => 'nullable',
            'fecha_finalizada' => 'nullable',
            'tiempo' => 'nullable',
            'id_estado' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'id_espacio.required' => 'El espacio es obligatorio',
            'nombre.required' => 'El nombre es obligatorio',
            'id_estado.required' => 'El estado es obligatorio',
        ];
    }
}
