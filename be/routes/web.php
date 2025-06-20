<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// routes/web.php atau routes/api.php
$router->post('/register', 'AuthController@register');
$router->post('/login', 'AuthController@login');

// Route yang memerlukan autentikasi
$router->group(['middleware' => 'auth'], function () use ($router) {
    $router->get('/profile', 'AuthController@profile');
    $router->post('/logout', 'AuthController@logout');
});

$router->group(['prefix' => 'v1'], function() use ($router)
{
    $router->group(['prefix' => 'user'], function() use ($router) {
        $router->get('/','Master\UserController@index');
        $router->post('posts','Master\UserController@store');
        $router->post('update/{id}','Master\UserController@update');
        $router->delete('delete/{id}','Master\UserController@delete');
    });

    $router->group(['prefix' => 'departemen'], function() use ($router) {
        $router->get('/','Master\DepartemenController@index');
        $router->post('posts','Master\DepartemenController@store');
        $router->post('update/{id}','Master\DepartemenController@update');
        $router->delete('delete/{id}','Master\DepartemenController@delete');
    });

    $router->group(['prefix' => 'gapok'], function() use ($router) {
        $router->get('/','Master\GapokController@index');
        $router->post('posts','Master\GapokController@store');
        $router->post('update/{id}','Master\GapokController@update');
        $router->delete('delete/{id}','Master\GapokController@delete');
    });

    $router->group(['prefix' => 'jabatan'], function() use ($router) {
        $router->get('/','Master\JabatanController@index');
        $router->post('posts','Master\JabatanController@store');
        $router->post('update/{id}','Master\JabatanController@update');
        $router->delete('delete/{id}','Master\JabatanController@delete');
    });

    $router->group(['prefix' => 'karyawan'], function() use ($router) {
        $router->get('/','Master\KaryawanController@index');
        $router->post('posts','Master\KaryawanController@store');
        $router->post('update/{id}','Master\KaryawanController@update');
        $router->delete('delete/{id}','Master\KaryawanController@delete');
    });

    $router->group(['prefix' => 'tgllibur'], function() use ($router) {
        $router->get('/','Master\TglLiburController@index');
        $router->post('posts','Master\TglLiburController@store');
        $router->post('update/{id}','Master\TglLiburController@update');
        $router->delete('delete/{id}','Master\TglLiburController@delete');
    });
});

$router->options('{any:.*}', function () {
    return response('', 200);
});
