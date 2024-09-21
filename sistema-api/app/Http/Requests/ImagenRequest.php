<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImagenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    
    public function rules(): array
    {
        return [
            'uuid' => 'required',
            'imagen' => 'required|image|mimes:jpeg,png,jpg',
        ];
    }

    public function messages(): array
    {
        return [
            'uuid.required' => 'El uuid es obligatorio',
            'imagen.required' => 'La imagen es obligatoria',
        ];
    }
}