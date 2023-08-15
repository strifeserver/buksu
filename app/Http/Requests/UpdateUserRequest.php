<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
            'name' => 'required|string|max:55|unique:users,name,'.$this->id,
            'mobile_number' => 'required|unique:users,mobile_number,'.$this->id,
            'user_type' => 'required',
            'address'=> 'required',
            'is_verified'=> 'required',
        ];
    }
}
