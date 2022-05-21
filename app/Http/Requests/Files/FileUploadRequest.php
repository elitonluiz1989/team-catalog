<?php

namespace App\Http\Requests\Files;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => 'nullable|string',
            'route' => 'required|string',
            'images.*' => 'nullable|image|mimes:jpg,png,jpeg|required_without:files',
            'files.*' => 'nullable|file|required_without:images'
        ];
    }
}
