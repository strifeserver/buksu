<?php

// app/Http/Controllers/Auth/ResetPasswordController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    // The path where the user will be redirected after password reset.
    protected $redirectTo = '/localhost:3000';
}

