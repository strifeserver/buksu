<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
            'name' => ['required', 'string','unique:users,name'],
            'birthday' => ['required', 'date'],
            'address' => ['required', 'string'],
            'mobile_number' => ['required', 'unique:users,mobile_number'],
            'email' => ['required', 'email', 'unique:users,email'],
            'user_type' => ['required'],
            'id_pic' => ['required'],
        ];
    }
}
