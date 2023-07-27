<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SuperAdmin\StoreBarangayRequest;
use App\Http\Requests\SuperAdmin\UpdateBarangayRequest;
use App\Http\Resources\CropRecordResource;
use App\Http\Resources\SupportedBarangayResource;
use App\Http\Resources\SupportedProductResource;
use App\Models\CropRecord;
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

    public function getCropRecords(Request $request)
    {
        $capitanjuanArea = 0;
        $bugcaonArea = 0;
        $kulasihanArea = 0;
        $bantuanonArea = 0;
        $poblacionArea = 0;
        $balilaArea = 0;
        $baclayonArea = 0;
        $kaatuanArea = 0;
        $alanibArea = 0;
        $songcoArea = 0;
        $cawayanArea = 0;
        $victoryArea = 0;
        $kibangayArea = 0;
        $basacArea = 0;
        $capitanjuanYield = 0;
        $bugcaonYield = 0;
        $kulasihanYield = 0;
        $bantuanonYield = 0;
        $poblacionYield = 0;
        $balilaYield = 0;
        $baclayonYield = 0;
        $kaatuanYield = 0;
        $alanibYield = 0;
        $songcoYield = 0;
        $cawayanYield = 0;
        $victoryYield = 0;
        $kibangayYield = 0;
        $basacYield = 0;

        $monthYear = $request->months.$request->year;
        $commodity = $request->commodity;

        $records = CropRecord::where('record_date', '=', $monthYear)
                                ->where( 'commodity', '=', $commodity)
                                ->get();
        foreach ($records as $record) {
            if ($record->barangay == 'CAPITAN JUAN') {
                $capitanjuanArea = $capitanjuanArea + $record->area;
                $capitanjuanYield = $capitanjuanYield + $record->yield;

            } else if ($record->barangay == 'BUGCAON') {
                $bugcaonArea = $bugcaonArea + $record->area;
                $bugcaonYield = $bugcaonYield + $record->yield;

            } else if ($record->barangay == 'KULASIHAN') {
                $kulasihanArea = $kulasihanArea + $record->area;
                $kulasihanYield = $kulasihanYield + $record->yield;

            } else if ($record->barangay == 'BANTUANON') {
                $bantuanonArea = $bantuanonArea + $record->area;
                $bantuanonYield = $bantuanonYield + $record->yield;

            } else if ($record->barangay == 'POBLACION') {
                $poblacionArea = $poblacionArea + $record->area;
                $poblacionYield = $poblacionYield + $record->yield;

            } else if ($record->barangay == 'BALILA') {
                $balilaArea = $balilaArea + $record->area;
                $balilaYield = $balilaYield + $record->yield;

            } else if ($record->barangay == 'BACLAYON') {
                $baclayonArea = $baclayonArea + $record->area;
                $baclayonYield = $baclayonYield + $record->yield;

            } else if ($record->barangay == 'KAATUAN') {
                $kaatuanArea = $kaatuanArea + $record->area;
                $kaatuanYield = $kaatuanYield + $record->yield;

            } else if ($record->barangay == 'ALANIB') {
                $alanibArea = $alanibArea + $record->area;
                $alanibYield = $alanibYield + $record->yield;

            } else if ($record->barangay == 'SONGCO') {
                $songcoArea = $songcoArea + $record->area;
                $songcoYield = $songcoYield + $record->yield;

            } else if ($record->barangay == 'CAWAYAN') {
                $cawayanArea = $cawayanArea + $record->area;
                $cawayanYield = $cawayanYield + $record->yield;

            } else if ($record->barangay == 'VICTORY') {
                $victoryArea = $bugcaonArea + $record->area;
                $victoryYield = $victoryYield + $record->yield;

            } else if ($record->barangay == 'KIBANGAY') {
                $kibangayArea = $kibangayArea + $record->area;
                $kibangayYield = $kibangayYield + $record->yield;

            } else if ($record->barangay == 'BASAC') {
                $basacArea = $basacArea + $record->area;
                $basacYield = $basacYield + $record->yield;
            }
        }

        return response([
            'CapitanJuanArea' => $capitanjuanArea,
            'CapitanJuanYield' => $capitanjuanYield,

            'BugcaonArea' => $bugcaonArea,
            'BugcaonYield' => $bugcaonYield,

            'KulasihanArea' => $kulasihanArea,
            'KulasihanYield' => $kulasihanYield,

            'BantuanonArea' => $bantuanonArea,
            'BantuanonYield' => $bantuanonYield,

            'PoblacionArea' => $poblacionArea,
            'PoblacionYield' => $poblacionYield,

            'Balila Area' => $balilaArea,
            'BalilaYield' => $balilaYield,

            'BaclayonArea' => $baclayonArea,
            'BaclayonYield' => $baclayonYield,

            'KaatuanArea' => $kaatuanArea,
            'KaatuanYield' => $kaatuanYield,

            'AlanibArea' => $alanibArea,
            'AlanibYield' => $alanibYield,

            'SongcoArea' => $songcoArea,
            'SongcoYield' => $songcoYield,

            'CawayanArea' => $cawayanArea,
            'CawayanYield' => $cawayanYield,

            'VictoryArea' => $victoryArea,
            'VictoryYield' => $victoryYield,

            'SongcoArea' => $songcoArea,
            'SongcoYield' => $songcoYield,

            'BasacArea' => $basacArea,
            'BasacYield' => $basacYield,

            'MonthYear' => $monthYear,
            'Commodity' => $commodity,

        ], 200);
        // return CropRecordResource::collection($cropRecords);
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
        $supportedBarangay = SupportedBarangay::create($data);
        return response(new SupportedBarangayResource($supportedBarangay), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

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
    public function updateBarangay(UpdateBarangayRequest $request, SupportedBarangay $barangay)
    {
        $data = $request->validated();
        $barangay->update($data);

        // $supportedBarangays = SupportedBarangay::query()->orderBy('supported_barangay', 'asc')->paginate(8);
        // return new SupportedBarangay($supportedBarangays);
        return response(new SupportedBarangayResource($barangay), 201);
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
