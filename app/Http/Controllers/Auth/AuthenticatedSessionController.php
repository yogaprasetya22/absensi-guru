<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }


    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('identifier', 'password');

        // Check if the provided identifier is NISN

        $user = User::whereHas('guru', function ($query) use ($credentials) {
            $query->where('nuptk', $credentials['identifier']);
        })->first();

        if (!$user) {
            $user = User::where('email', $credentials['identifier'])->first();

            if (!$user) {
                return redirect()->back()->withInput($request->only('identifier'))
                    ->withErrors(['identifier' => 'Invalid nuptk or Email.']);
            }
        }

        // Attempt login using the found user's email
        if (Auth::attempt(['email' => $user->email, 'password' => $credentials['password']])) {
            $request->session()->regenerate();
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        return redirect()->back()->withInput($request->only('identifier'))
            ->withErrors(['password' => 'Incorrect password.']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
