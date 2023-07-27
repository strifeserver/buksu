<?php

namespace App\Http\Requests\Seller;

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
            'product_name' => 'required|string|min:5|max:25',
            'product_type' => 'required|string',
            'farm_belonged' => 'required|integer',
            'variety' => 'required|string|min:4|max:25',
            'planted_date' => 'required|date',
            'prospect_harvest_in_kg' => 'required|integer',
            'prospect_harvest_date' => 'required|date',
            'product_location' => 'required|string',
            'price' => 'required|integer',
            'product_picture' => 'required|image',
        ];
    }
}
