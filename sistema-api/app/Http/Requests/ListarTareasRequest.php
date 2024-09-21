<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarTareasRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_espacio' => 'nullable',
            'nombre' => 'nullable',
        ];
    }
}