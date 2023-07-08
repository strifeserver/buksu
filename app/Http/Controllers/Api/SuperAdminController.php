<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SuperAdmin\StoreBarangayRequest;
use App\Http\Resources\SupportedBarangayResource;
use App\Models\SupportedBarangay;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *


     */
    public function supportedBarangay()
    {
        $supportedBarangay = SupportedBarangay::query()->orderBy('supported_barangay', 'asc')->paginate(8);
        return SupportedBarangayResource::collection($supportedBarangay);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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


    public function showBarangay(SupportedBarangay $barangay)
    {
        return new SupportedBarangayResource($barangay);
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
