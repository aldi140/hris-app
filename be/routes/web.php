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
$router->post('/upload', 'FileController@uploadFile');
$router->get('/genpayroll','Payroll\GenerateController@absensi');
$router->get('v1/karyawan/show-nik','Master\KaryawanController@show_nik');
$router->group(['prefix' => 'v1'], function() use ($router)
{
    $router->group(['prefix' => 'user'], function() use ($router) {
        $router->get('/','Master\UserController@index');
        $router->post('posts','Master\UserController@store');
        $router->post('update/{id}','Master\UserController@update');
        $router->delete('delete/{id}','Master\UserController@delete');
        $router->post('posts/role','Master\UserController@setupRolesAndPermissions');
        $router->get('role/{userId}','Master\UserController@checkUserPermissions');
    });

    $router->group(['prefix' => 'permission'], function() use ($router) {
        $router->get('/','Master\PermissionController@index');
        $router->post('posts','Master\PermissionController@store');
        $router->post('update/{id}','Master\PermissionController@update');
        $router->delete('delete/{id}','Master\PermissionController@delete');
        $router->get('show/{id}','Master\PermissionController@show');
    });

    $router->group(['prefix' => 'role'], function() use ($router) {
        $router->get('/','Master\RoleController@index');
        $router->post('posts','Master\RoleController@store');
        $router->post('update/{id}','Master\RoleController@update');
        $router->delete('delete/{id}','Master\RoleController@delete');
        $router->get('show/{id}','Master\RoleController@show');
    });

    $router->group(['prefix' => 'departemen'], function() use ($router) {
        $router->get('/','Master\DepartemenController@index');
        $router->post('posts','Master\DepartemenController@store');
        $router->post('update/{id}','Master\DepartemenController@update');
        $router->delete('delete/{id}','Master\DepartemenController@delete');
        $router->get('show/{id}','Master\DepartemenController@show');
    });

    $router->group(['prefix' => 'gapok'], function() use ($router) {
        $router->get('/','Master\GapokController@index');
        $router->post('posts','Master\GapokController@store');
        $router->post('update/{id}','Master\GapokController@update');
        $router->delete('delete/{id}','Master\GapokController@delete');
        $router->get('show/{id}','Master\GapokController@show');
    });

    $router->group(['prefix' => 'jabatan'], function() use ($router) {
        $router->get('/','Master\JabatanController@index');
        $router->post('posts','Master\JabatanController@store');
        $router->post('update/{id}','Master\JabatanController@update');
        $router->delete('delete/{id}','Master\JabatanController@delete');
        $router->get('show/{id}','Master\JabatanController@show');
    });

    $router->group(['prefix' => 'karyawan'], function() use ($router) {
        $router->get('/','Master\KaryawanController@index');
        $router->post('posts','Master\KaryawanController@store');
        $router->post('update/{id}','Master\KaryawanController@update');
        $router->delete('delete/{id}','Master\KaryawanController@delete');
        $router->get('show/{id}','Master\KaryawanController@show');
        // $router->get('show-nik','Master\KaryawanController@show_nik');
    });

    $router->group(['prefix' => 'tgllibur'], function() use ($router) {
        $router->get('/','Master\TglLiburController@index');
        $router->post('posts','Master\TglLiburController@store');
        $router->post('update/{id}','Master\TglLiburController@update');
        $router->delete('delete/{id}','Master\TglLiburController@delete');
        $router->get('show/{id}','Master\TglLiburController@show');
    });

    $router->group(['prefix' => 'potongan'], function() use ($router) {
        $router->get('/','Master\PotonganController@index');
        $router->post('posts','Master\PotonganController@store');
        $router->post('update/{id}','Master\PotonganController@update');
        $router->delete('delete/{id}','Master\PotonganController@delete');
        $router->get('show/{id}','Master\PotonganController@show');
    });

    $router->group(['prefix' => 'tunjangan'], function() use ($router) {
        $router->get('/','Master\TunjanganController@index');
        $router->post('posts','Master\TunjanganController@store');
        $router->post('update/{id}','Master\TunjanganController@update');
        $router->delete('delete/{id}','Master\TunjanganController@delete');
        $router->get('show/{id}','Master\TunjanganController@show');
    });

    $router->group(['prefix' => 'cuti'], function() use ($router) {
        $router->get('/','Master\CutiController@index');
        $router->post('posts','Master\CutiController@store');
        $router->post('update/{id}','Master\CutiController@update');
        $router->delete('delete/{id}','Master\CutiController@delete');
        $router->get('show/{id}','Master\CutiController@show');
    });

    $router->group(['prefix' => 'shift'], function() use ($router) {
        $router->get('/','Master\ShiftController@index');
        $router->post('posts','Master\ShiftController@store');
        $router->post('update/{id}','Master\ShiftController@update');
        $router->delete('delete/{id}','Master\ShiftController@delete');
        $router->get('show/{id}','Master\ShiftController@show');
    });

    $router->group(['prefix' => 'jadwalkerja'], function() use ($router) {
        $router->get('/','Master\JadwalkerjaController@index');
        $router->post('posts','Master\JadwalkerjaController@store');
        $router->post('update/{id}','Master\JadwalkerjaController@update');
        $router->delete('delete/{id}','Master\JadwalkerjaController@delete');
        $router->get('show/{id}','Master\JadwalkerjaController@show');
    });

    $router->group(['prefix' => 'absensi'], function() use ($router) {
        $router->get('/','Transaksi\KryAbsensiController@index');
        $router->post('posts','Transaksi\KryAbsensiController@store');
        $router->post('update/{id}','Transaksi\KryAbsensiController@update');
        $router->delete('delete/{id}','Transaksi\KryAbsensiController@delete');
        $router->get('show/{id}','Transaksi\KryAbsensiController@show');
        $router->post('check-in','Transaksi\KryAbsensiController@checkin');
        $router->post('check-out','Transaksi\KryAbsensiController@checkout');
    });

    $router->group(['prefix' => 'izin'], function() use ($router) {
        $router->get('/','Transaksi\KryCutiController@index');
        $router->post('posts','Transaksi\KryCutiController@store');
        $router->post('update/{id}','Transaksi\KryCutiController@update');
        $router->delete('delete/{id}','Transaksi\KryCutiController@delete');
        $router->get('show/{id}','Transaksi\KryCutiController@show');
    });

    $router->group(['prefix' => 'gen'], function() use ($router) {
        $router->get('/{filename}','GeneralController@getPhotoUrl');
    });

    $router->group(['prefix' => 'transaksi'], function() use ($router) {
        $router->get('/listdata','Transaksi\PinjamanController@list_data');
    });
});



$router->options('{any:.*}', function () {
    return response('', 200);
});
