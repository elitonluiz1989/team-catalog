<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Auth\AuthenticateRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(): View|Factory {
        return view('admin.login');
    }
    
    public function authenticate(AuthenticateRequest $request): RedirectResponse {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password')
        ];
        $remember = $request->input('remember', false);

        if (!Auth::attempt($credentials, $remember)) {
            redirect()
                ->route('login')
                ->withErrors('Invalid email or password')
                ->withInput(['email']);;
        }

        $request->session()->regenerate();
        
        return redirect()->intended(route('users.index'));
    }
    
    public function logout(Request $request): RedirectResponse {
        Auth::logout();
     
        $request->session()->invalidate();
        $request->session()->regenerateToken();
     
        return redirect()->route('login');
    }
}
