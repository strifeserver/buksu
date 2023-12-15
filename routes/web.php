<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ForgotPasswordaController;
use App\Http\Controllers\PasswordResetController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('*', function () {
    return view('welcome');
});


Route::get('forgot-password', [ForgotPasswordaController::class, 'showForgotPasswordForm'])->name('password.request');
Route::post('forgot-password', [ForgotPasswordaController::class, 'sendPasswordResetLink'])->name('password.email');


// Password reset routes
Route::get('password/reset/{token}', [PasswordResetController::class, 'showResetForm'])->name('password.reset');
// Route::post('password/reset', [PasswordResetController::class, 'resetPassword'])->name('password.update');
// Route::post('password/reset', [PasswordResetController::class, 'resetPassword']);
Route::post('password/reset', [PasswordResetController::class, 'resetPassword'])->name('password.update');