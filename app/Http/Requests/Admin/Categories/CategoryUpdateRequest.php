<?php

namespace App\Http\Requests\Admin\Categories;

use Illuminate\Foundation\Http\FormRequest;

/**
 *
 * @property int $id
 * @property string $name
 * @property int $order
 */
class CategoryUpdateRequest extends FormRequest
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
            'id' => 'required|integer',
            'name' => 'nullable|string|unique:categories,name,' . $this->id,
            'order' => 'nullable|integer|unique:categories,order,' . $this->id
        ];
    }
}
