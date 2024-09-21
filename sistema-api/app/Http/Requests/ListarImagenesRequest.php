<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListarImagenesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'uuid' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'El uuid es obligatorio',
        ];
    }
}