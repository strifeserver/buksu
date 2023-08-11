<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SuperAdminController;
use App\Models\SupportedBarangay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //ALL ABOUT USERS
    // Route::apiResource('/users', UserController::class);
    Route::get('/usercount', [DashboardController::class, 'usercount']);
    Route::get('/allUsers/pending', [UserController::class, 'allUsersPending']);
    Route::get('/allUsers/allUsers', [UserController::class, 'allUsers']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    //PRODUCTS
     Route::get('/products', [ProductController::class, 'allProducts']);
     Route::post('/getFarmInfo', [ProductController::class, 'getFarmInfobyUser']);
     Route::get('/getProductTypes', [ProductController::class, 'getProductTypes']);
     Route::post('/addProductForm', [ProductController::class, 'addProduct']);

    //ORDERS

    Route::post('addToCart',[ProductController::class, 'addToCart']);
    Route::post('getOrderLists', [ProductController::class, 'getOrderLists']);
    Route::post('getPendingOrders', [ProductController::class, 'getPendingOrders']);

    //SUPERADMIN PAGES
    Route::get('/supportedBarangay', [SuperAdminController::class, 'supportedBarangay']);
    Route::post('/getCropRecords', [SuperAdminController::class, 'getCropRecords']);
    Route::get('/barangays/{barangay}', [SuperAdminController::class, 'showBarangay']);
    Route::put('/barangays/{barangay}', [SuperAdminController::class, 'updateBarangay']);
    Route::post('/addBarangay', [DashboardController::class, 'addBarangay']);
    Route::get('/ids/{filename}', [SuperAdminController::class, 'getIDimage']);

});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
