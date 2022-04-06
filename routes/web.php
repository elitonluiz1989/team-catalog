<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::namespace('App\Http\Controllers\Admin')
    ->group(function() {
        Route::get('login', 'AuthController@login')->name('login');
        Route::post('login', 'AuthController@authenticate')->name('login.authenticate');

        Route::middleware('auth')
            ->group(function() {
                Route::get('logout', 'AuthController@logout')->name('logout');

                Route::prefix('users/')
                    ->group(function() {
                        Route::get('', 'UsersController@index')->name('users.index');
                        Route::get('/create', 'UsersController@create')->name('users.create');
                        Route::post('/store', 'UsersController@store')->name('users.store');
                    });
            });
    });
