<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    //

    public function showResetForm(Request $request, $token)
    {
        $user = DB::table('password_resets')
        // ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        return view('auth.passwords.reset', ['token' => $token, 'email' => $user->email]);
    }

    public function resetPassword(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
            'token' => 'required',
        ]);

        $user = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$user) {
            return response(json_encode(['status' => 0, 'message' => 'Invalid email or token']), 400)->header('Content-Type', 'application/json');

        }

        $actualUser = DB::table('users')->where('email', $request->email)->first();

        if (!$actualUser) {
            return response(json_encode(['status' => 0, 'message' => 'User not found']), 404)->header('Content-Type', 'application/json');

        }

        DB::table('users')
            ->where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);

        // Optionally, you may delete the password reset record from the password_resets table
        DB::table('password_resets')
            ->where('email', $request->email)
            ->delete();
        return response(json_encode(['status' => 1]), 200)->header('Content-Type', 'application/json');
    }

}
