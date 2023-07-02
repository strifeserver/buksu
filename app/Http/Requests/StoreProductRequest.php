<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'product_name'  => 'required|string|max:55',
            'variety'  => 'required|string|max:55',
            'kilograms'  => 'required|min:0|',
            'pros'  => 'required|string|max:55',
            'product_name'  => 'required|string|max:55',
            'product_name'  => 'required|string|max:55',
            'product_name'  => 'required|string|max:55',
            'product_name'  => 'required|string|max:55',
            'product_name'  => 'required|string|max:55',

        ];
    }
}
