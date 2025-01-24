<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\CarAvailabilityController;
use App\Http\Controllers\MaintenanceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StripeController;
    Route::group(['middleware' => 'api','prefix' => 'users'], function ($router) {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refreshToken', [AuthController::class, 'refresh']);
        Route::get('/user-profile', [AuthController::class, 'index']);
        Route::put('/update-user/{id}', [AuthController::class, 'updateUser']);
        Route::delete('/delete-user/{id}', [AuthController::class, 'destroy']); // Add this line  
    });
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/cars', [CarController::class, 'index']);
    Route::get('/cars/{id}', [CarController::class, 'show']);
    // Ajoutez d'autres routes protégées ici
});
    Route::get('/users', [AuthController::class, 'index']);
    Route::get('/user/{id}', [AuthController::class, 'show']);
    Route::get('users/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');
// Routes for CarController
Route::get('/cars', [CarController::class, 'index']);
Route::post('/cars', [CarController::class, 'store']);
Route::get('/cars/{id}', [CarController::class, 'show']);
Route::put('/cars/{id}', [CarController::class, 'update']);
Route::delete('/cars/{id}', [CarController::class, 'destroy']);
Route::get('/cars/search', [CarController::class, 'search']);
Route::get('/cars/model/{model}', [CarController::class, 'getByModel']);
Route::get('/cars/brand/{brand}', [CarController::class, 'getByBrand']);

// Routes for RentController
Route::get('/rents', [RentController::class, 'index']);
Route::post('/rents', [RentController::class, 'store']);
Route::get('/rents/{id}', [RentController::class, 'show']);
Route::put('/rents/{id}', [RentController::class, 'update']);
Route::delete('/rents/{id}', [RentController::class, 'destroy']);
Route::get('/user/{user_id}/rents', [RentController::class, 'getUserRents']);

// Routes for CarAvailabilityController
Route::get('/car-availabilities', [CarAvailabilityController::class, 'index']);
Route::post('/car-availabilities', [CarAvailabilityController::class, 'store']);
Route::get('/car-availabilities/{id}', [CarAvailabilityController::class, 'show']);
Route::put('/car-availabilities/{id}', [CarAvailabilityController::class, 'update']);
Route::delete('/car-availabilities/{id}', [CarAvailabilityController::class, 'destroy']);
Route::post('/processpayment', [StripeController::class,'processPayment']);
Route::get('/cars/paginate', [CarController::class, 'carsPaginate']);
Route::resource('maintenances', MaintenanceController::class);
Route::put('cars/{id}/rental-count/{count}', [CarController::class, 'setRentalCount']);
Route::put('maintenances/{id}/complete', [MaintenanceController::class, 'completeMaintenance']);