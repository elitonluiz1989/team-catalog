<?php

namespace App\Http\Controllers\Admin;

use App\Enums\HttpMethodsEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserStoreRequest;
use App\Models\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(): View|Factory
    {
        $users = User::paginate(11);

        return view('admin.users.index')
            ->with('users', $users)
            ->with('currentUserId', auth()->user()->id);
    }

    public function create(Request $request): View|Factory {
        $routes = [
            'store' => route('users.store'),
            'back' => route('users.index')
        ];

        $data = [
            'name' => $request->old('name', ''),
            'email' => $request->old('email', ''),
            'password' => $request->old('password', '')
        ];

        return view('admin.users.form')
            ->with('routes', $routes)
            ->with('formMethod', HttpMethodsEnum::POST)
            ->with('inEditing', false)
            ->with('data', $data);
    }

    public function store(UserStoreRequest $request): RedirectResponse {
        $user = new User();
        $user->fill($request->input());

        $isSaved = $user->save();

        if (!$isSaved) {
            return back()->withErrors('User was not saved.');
        }

        return redirect()->to(route('users.index'));
    }
}
