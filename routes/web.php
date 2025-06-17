<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->controller(AccountController::class)->name('account.')->prefix('/account')->group(function () {
    Route::get('/register', 'show_register')->name('show.register');
    Route::post('/register', 'register')->name('register');
    Route::get('/login', 'show_login')->name('show.login');
});
