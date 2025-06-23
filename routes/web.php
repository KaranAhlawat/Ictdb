<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\TalkController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->controller(AccountController::class)->name('account.')->prefix('/account')->group(function () {
    Route::get('/dashboard', 'show_dashboard')->name('show.dashboard');
    Route::post('/logout', 'logout')->name('logout');
});

Route::middleware('guest')->controller(AccountController::class)->name('account.')->prefix('/account')->group(function () {
    Route::get('/register', 'show_register')->name('show.register');
    Route::post('/register', 'register')->name('register');

    Route::get('/login', 'show_login')->name('show.login');
    Route::post('/login', 'login')->name('login');

    Route::get('/google', 'google')->name('google');

    Route::get('/github', 'github')->name('github');
});

Route::middleware('guest')->controller(AccountController::class)->prefix('/callback')->group(function () {
    Route::get('/google', 'google_callback')->name('google.callback');
    Route::get('/github', 'github_callback')->name('github.callback');
});

Route::controller(TalkController::class)->name('talk.')->group(function () {
    Route::get('/', 'index')->name('index');

    Route::get('/talk/create', 'create')->name('create')->middleware('auth');
    Route::post('/talk/create', 'store')->name('store')->middleware('auth');

    Route::get('/talk/{talk:slug}/edit', 'edit')->name('show.edit')->middleware('auth');
    Route::post('/talk/{talk:slug}/edit', 'update')->name('update')->middleware('auth');

    Route::get('/talk/{talk:slug}', 'show')->name('show');
});
