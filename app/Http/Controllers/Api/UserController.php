<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\ProductResource;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    // public function index()
    // {
    //     return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    // }
    //  public function index()
    // {
    //     return UserResource::collection(User::query()->orderBy('id', 'asc')->paginate(5));
    // }
    public function allUsersPending()
    {
        $user =User::where('is_verified', '=' , 0)->paginate(10);
        return UserResource::collection($user);
    }

    public function allUsers()
    {
        $user = User::where('user_type', '!=', 2)->orderByDesc('updated_at')->paginate(10);
        return UserResource::collection($user);
    }



    public function usercount()
    {
        $userAll =User::all()->count();
        // return response()->json(['allUser' => $allUser]);

        $pendingUser =User::where('user_type', '0')->count();
        return response()->json([
            'userAll' => $userAll,
            'pendingUser' => $pendingUser,

        ]);


    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        return response(new UserResource($user) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        // if (isset($data['password'])) {
        //     $data['password'] = bcrypt($data['password']);
        // }
        $data['is_verified'] = 1;
        $data['updated_at'] = date('Y/m/d H:i:s');
        $user->update($data);

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response("", 204);
    }

}
