<?php

use App\Http\Controllers\TalkController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => to_route('talk.index'));

Route::controller(TalkController::class)->name('talk.')->group(function () {
    Route::middleware('auth')->prefix('/talk')->group(function () {
        Route::get('', 'index')->name('index')->withoutMiddleware('auth');

        Route::get('/create', 'create')->name('create');
        Route::post('', 'store')->name('store');

        Route::get('/{talk:slug}/edit', 'edit')->name('show.edit');
        Route::post('/{talk:slug}', 'update')->name('update');

        Route::get('/{talk:slug}', 'show')->name('show')->withoutMiddleware('auth');
    });
});

require __DIR__ . '/auth_routes.php';
