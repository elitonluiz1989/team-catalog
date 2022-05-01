<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\UserCreateRequest;
use App\Http\Requests\Admin\User\UserUpdateRequest;
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

    public function find(int $userId): User {
        $user = User::find($userId);

        if ($user ==  null) {
            abort(404, 'User not found.');
        }

        return $user;
    }

    public function create(UserCreateRequest $request): string {
        $user = new User();
        $user->fill($request->input());
        $isSaved = $user->save();

        if (!$isSaved) {
            abort(404, 'User was not saved.');
        }

        return 'User was saved.';
    }

    public function update(UserUpdateRequest $request): string {
        $user = User::find($request->input('id'));
        $user->fill($request->input());
        $isSaved = $user->save();

        if (!$isSaved) {
            abort(404, 'User was not saved.');
        }

        return 'User was saved.';
    }

    public function delete($id): string {
        $user = User::find($id);
        $isDeleted = $user->delete();

        if (!$isDeleted) {
            abort(404, 'User was not deleted.');
        }

        return 'User was deleted.';
    }
}
