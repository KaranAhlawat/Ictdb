<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function show_register()
    {
        return Inertia::render('account/register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required'],
            'password' => ['required'],
            'password_confirmation' => ['required', 'same:password']
        ]);
    }

    public function show_login()
    {
        return Inertia::render('account/login');
    }
}
