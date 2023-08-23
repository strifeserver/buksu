<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        if ($data = $request->validated()) {
            /** @var \App\Models\User $user */

            if ($request->hasFile('id_pic')) {
                $photo = $request->file('id_pic');
                $fileName = $photo->getClientOriginalName();
                // Store the file in the public storage inside the 'product_images' folder
                $photo->storeAs('public/Users/', $fileName);
                $data['id_pic'] = $fileName;
            }

            User::create([
                'name' => $data['name'],
                'birthday' => $data['birthday'],
                'mobile_number' => $data['mobile_number'],
                'address' => $data['address'],
                'user_type' => $data['user_type'],
                'is_verified' => 0,
                'is_active' => 0,
                'email' => $data['email'],
                'password' => bcrypt('password'),
                'id_pic' => $data['id_pic'],
            ]);
            //   $token = $user->createToken('main')->plainTextToken;
        } else {
            return response('error', 404);
        } // $token = $user->createToken('main')->plainTextToken; // return response(compact('user', 'token'));
        return response([
            'success' => 'Your Personal data has been recorded. Please wait for the admin to confirm your identity. Also, take note that the default password for your account is "password". Thank You.'
        ], 200);
    }

    public function login(LoginRequest $request)
    {
        if ($credentials = $request->validated()) {

            if (!Auth::attempt($credentials)) {
                return response([
                    'message' => 'Provided mobile number or password is incorrect'
                ], 422);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();
            if ($user->is_verified === 0) {
                return response([
                    'message' => 'Please Wait for your Account to be Activated'
                ], 422);
            } else {

                $user->update([
                    'is_active' => 1,
                ]);
                $userID = $user->id;
                $token = $user->createToken('main')->plainTextToken;
                return response()->json([
                    // 'user' => $user,
                    'token' => $token,
                    'userType' => $user->user_type,
                    'userName' => $user->name,
                    'encryptedCurrentUserID' => Crypt::encryptString($userID),
                ]);
            }
        } else {
            return response([
                'message' => 'Please Check the mobile number or password'
            ], 422);
        }
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->update([
            'is_active' => 0,
        ]);
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
