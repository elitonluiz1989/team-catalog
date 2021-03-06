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

Route::namespace('App\Http\Controllers')
    ->group(function() {
        Route::prefix('files/')
            ->group(function() {
                Route::get('/{folder}/{filename}', 'FilesController@view')->name('files.view');

                Route::middleware('auth')
                    ->group(function() {
                        Route::post('/upload', 'FilesController@upload')->name('files.upload');
                        Route::delete('/delete', 'FilesController@delete')->name('files.delete');
                    });
            });
    });

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
                        Route::get('/{id}', 'UsersController@find')->name('users.find');
                        Route::post('/', 'UsersController@create')->name('users.create');
                        Route::put('/{id}', 'UsersController@update')->name('users.update');
                        Route::delete('/{id}', 'UsersController@delete')->name('users.delete');
                    });

                Route::prefix('categories/')
                    ->group(function() {
                        Route::get('', 'CategoriesController@index')->name('categories.index');
                        Route::get('/{id}', 'CategoriesController@find')->name('categories.find');
                        Route::post('/', 'CategoriesController@create')->name('categories.create');
                        Route::put('/{id}', 'CategoriesController@update')->name('categories.update');
                        Route::delete('/{id}', 'CategoriesController@delete')->name('categories.delete');
                        Route::get('/order/last', 'CategoriesController@lastOrder')->name('categories.order.last');
                    });

                Route::prefix('products/')
                    ->group(function() {
                        Route::get('', 'ProductsController@index')->name('products.index');
                        Route::get('/{id}', 'ProductsController@find')->name('products.find');
                        Route::post('/', 'ProductsController@create')->name('products.create');
                        Route::put('/{id}', 'ProductsController@update')->name('products.update');
                        Route::delete('/{id}', 'ProductsController@delete')->name('products.delete');
                    });
            });
    });
