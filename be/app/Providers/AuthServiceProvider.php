<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\PermissionRegistrar;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Pastikan file 'permission.php' ada dan dimuat
        $this->app->configure('permission');

        // Ikat kontrak Spatie ke modelnya
        $this->app->bind(Permission::class, \Spatie\Permission\Models\Permission::class);
        $this->app->bind(Role::class, \Spatie\Permission\Models\Role::class);

        // // Daftarkan PermissionRegistrar sebagai singleton
        // $this->app->singleton(PermissionRegistrar::class, function ($app) {
        //     return new PermissionRegistrar($app);
        // });
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            if ($request->input('api_token')) {
                return User::where('api_token', $request->input('api_token'))->first();
            }
            if ($request->bearerToken()) {
                return User::where('api_token', $request->bearerToken())->first();
            }
        });

        // Bagian penting untuk Spatie:
        // Mengikat Gate Lumen dengan sistem izin Spatie
        $this->app->singleton('Illuminate\Contracts\Auth\Access\Gate', function ($app) {
            return new \Illuminate\Auth\Access\Gate($app, function () use ($app) {
                return $app['auth']->user();
            });
        });

        // Mendaftarkan izin Spatie dengan Gate
        Gate::before(function ($user, $ability) {
            if (method_exists($user, 'hasPermissionTo')) {
                return $user->hasPermissionTo($ability) ?: null;
            }
        });
    }
}
