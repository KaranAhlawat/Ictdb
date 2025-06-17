<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->controller(AccountController::class)->name('account.')->prefix('/account')->group(function () {
    Route::get('/register', 'show_register')->name('show.register');
    Route::post('/register', 'register')->name('register');

    Route::get('/login', 'show_login')->name('show.login');
    Route::post('/login', 'login')->name('login');

    Route::get('/google', 'google')->name('google');

    Route::get('/github', 'github')->name('github');
});

Route::get('/callback/google', [AccountController::class, 'google_callback'])->middleware('guest')->name('google.callback');
Route::get('/callback/github', [AccountController::class, 'github_callback'])->middleware('guest')->name('github.callback');
