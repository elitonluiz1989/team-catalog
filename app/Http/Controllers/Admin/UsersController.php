<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserStoreRequest;
use App\Models\User;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

class UsersController extends Controller
{
    public function index(): View|Factory
    {
        $users = User::paginate(11);

        return view('admin.users.index')
            ->with('users', $users)
            ->with('currentUserId', auth()->user()['id']);
    }

    public function store(UserStoreRequest $request): string {
        $user = new User();
        $user->fill($request->input());
        $isSaved = $user->save();

        if (!$isSaved) {
            abort(404, 'User was not saved.');
        }

        return 'User was not saved.';
    }
}
