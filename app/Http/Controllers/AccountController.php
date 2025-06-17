<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

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
            'email' => ['required', 'email'],
            'password' => ['required'],
            'password_confirmation' => ['required', 'same:password']
        ]);

        if (User::where('email', $request->email)->where('provider', 'basic')->exists()) {
            return back()->withErrors(['email' => 'Email already registered']);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'provider' => 'basic',
            'provider_id' => strval(time())
        ]);

        return to_route('account.show.login')->with(['message' => 'Registered successfully', 'type' => 'success']);
    }

    public function show_login()
    {
        return Inertia::render('account/login');
    }

    public function login(Request $request)
    {
        $credentials =  $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt(array_merge($credentials, ['provider' => 'basic']))) {
            $request->session()->regenerate();

            return to_route('account.show.dashboard');
        }

        return back()->with(['message' => 'Invalid credentials', 'type' => 'error'])->withInput($request->except('password'));
    }

    public function google()
    {
        return Inertia::location(Socialite::driver('google')->redirect()->getTargetUrl());
    }

    public function google_callback()
    {
        $google_user = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'provider_id' => $google_user->getId(),
            'provider' => 'google'
        ], [
            'name' => $google_user->getName(),
            'email' => $google_user->getEmail(),
            'provider_id' => $google_user->getId(),
            'provider' => 'google'
        ]);

        Auth::login($user);

        return to_route('account.show.dashboard');
    }

    public function github()
    {
        return Inertia::location(Socialite::driver('github')->redirect()->getTargetUrl());
    }

    public function github_callback()
    {
        $github_user = Socialite::driver('github')->user();

        $user = User::updateOrCreate([
            'provider_id' => $github_user->getId(),
            'provider' => 'github'
        ], [
            'name' => $github_user->getName(),
            'email' => $github_user->getEmail(),
            'provider_id' => $github_user->getId(),
            'provider' => 'github'
        ]);

        Auth::login($user);

        return to_route('account.show.dashboard');
    }

    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return to_route('account.show.login');
    }
}
