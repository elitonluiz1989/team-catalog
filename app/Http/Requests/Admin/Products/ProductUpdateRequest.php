<?php

namespace App\Http\Requests\Admin\Products;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @property int $id
 * @property string $name
 * @property string $image
 * @property string $link
 * @property int $category_id
 */
class ProductUpdateRequest extends FormRequest
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
            'id' => 'required|int',
            'name' => 'nullable|string|required_without:image,link,category_id',
            'image' => 'nullable|string|required_without:name,link,category_id',
            'link' => 'nullable|string|required_without:name,image,category_id',
            'category_id' => 'nullable|int|exists:categories|required_without:name,image,link'
        ];
    }
}
