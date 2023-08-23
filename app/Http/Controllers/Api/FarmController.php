<?php

namespace App\Http\Controllers\Api;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getFarms(Request $request)
    {
        $userID = Crypt::decryptString($request->user_ID);
        $user = User::where('id', $userID)->first(); // to get the UserID

        if ($user['user_type'] === 0) { //Buyer
            $farms = Farm::with('user', 'products')->paginate(1);
            return response()->json($farms);
        } else if ($user['user_type'] === 1) { //Seller
            $farms = Farm::where('farm_owner', $user->id)
                ->with('user')
                ->get();

            return response()->json($farms);
        } else if ($user['user_type'] === 2) { //Buyer & Seller
            $farms = Farm::where('farm_owner', $user->id)
                ->with('user')
                ->get();
            return response()->json($farms);
        } else if ($user['user_type'] === 3 && $request['requested_type'] === 0) { //DA Admin NOT Verified
            $farms = Farm::where('is_verified', 0)
                ->with('user')->get();
            return response()->json($farms);
        } else if ($user['user_type'] === 3 && $request['requested_type'] === 1) { //DA Admin Verfied
            $farms = Farm::where('is_verified', 1)
                ->with('user')->get();
            return response()->json($farms);

        }
    }

    public function getFarm(Farm $farm)
    {
        $farm['owner'] = User::where('id', $farm['farm_owner'])->first('name');
        return response()->json($farm);
    }

    public function farmWProducts($farm){
        $farm = Farm::where('id', $farm)
                    ->with(['products' => function ($query) {
                        $query->orderBy('created_at', 'desc');
                    }, 'user'])
                    ->get();

        return response()->json($farm);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function farmUpdate(Request $request, Farm $farm)
    {
        $data = $request->validate([
            'farm_name' => 'required',
            'farm_location'  => 'required',
            'farm_hectares'  => 'required',
            'longitude'  => 'required',
            'latitude'  => 'required',
            'farm_info'  => 'required',
            'farm_owner'  => 'required',
        ]);
        $data['is_verified'] = 1;
        $farm->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
