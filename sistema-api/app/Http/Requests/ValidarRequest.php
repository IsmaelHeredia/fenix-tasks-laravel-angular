<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidarRequest extends FormRequest
{    
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'token' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'El token es obligatorio',
        ];
    }
}