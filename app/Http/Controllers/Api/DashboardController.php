<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\SupportedBarangay;
use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Http\Resources\SupportedBarangayResource;
use App\Http\Requests\SuperAdmin\StoreBarangayRequest;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *  @ return \Illuminate\Http\Response
     */
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function usercount()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;
        $startDate = Carbon::create($currentYear, $currentMonth, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();

        $userAll =User::all()->count();
        $pendingUser =User::where('is_verified', '0')->count();
        $activeUser =User::where('is_active', '1')->count();

        $transactionCount = Transaction::whereBetween('payed_on', [$startDate, $endDate])->count();

        return response()->json([
            'userAll' => $userAll,
            'pendingUser' => $pendingUser,
            'activeUser' => $activeUser,
            'transactionCount' => $transactionCount,
        ]);




    }


    // public function supportedBarangay()
    // {
    //     $supportedBarangay = SupportedBarangay::all();
    //     return SupportedBarangayResource::collection($supportedBarangay);
    // }


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

    public function addBarangay(StoreBarangayRequest $request)
    {
        $data = $request->validated();
        $supportedBarangay= SupportedBarangay::create($data);

        return response(new SupportedBarangayResource($supportedBarangay) , 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
