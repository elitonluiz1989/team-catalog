<?php

namespace App\Http\Requests\Admin\Products;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property string $name
 * @property string $image
 * @property string $link
 * @property int $category_id
 */
class ProductCreateRequest extends FormRequest
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
            'name' => 'required|string',
            'image' => 'required|string',
            'link' => 'required|string',
            'category_id' => 'required|int|exists:categories,id'
        ];
    }
}
