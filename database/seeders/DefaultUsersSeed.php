<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultUsersSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public static function run()
    {
        if (
            !empty(env('USER_WEBMASTER_NAME')) &&
            !empty(env('USER_WEBMASTER_EMAIL')) &&
            !empty(env('USER_WEBMASTER_PASSWORD'))
        ) {
            $data = [
                'name' => env('USER_WEBMASTER_NAME'),
                'email' => env('USER_WEBMASTER_EMAIL'),
                'password' => env('USER_WEBMASTER_PASSWORD')
            ];

            $user = User::where('email', $data['email'])->firstOrNew();
            
            if (!$user->exists) {
                $user->name = env('USER_WEBMASTER_NAME');
                $user->email = env('USER_WEBMASTER_EMAIL');
                $user->password = env('USER_WEBMASTER_PASSWORD');
                $user->save();
            }
        }
    }
}
