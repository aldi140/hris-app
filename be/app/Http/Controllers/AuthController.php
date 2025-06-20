<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // Untuk hashing password
use Illuminate\Support\Str; // Untuk membuat API token

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'api_token' => Str::random(80), // Generate API token saat registrasi
            ]);

            return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User registration failed!', 'error' => $e->getMessage()], 409);
        }
    }

    /**
     * Authenticate a user and return the API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->input('email'))->first();

        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        // Jika token sudah ada, bisa pakai yang lama atau generate baru
        $apiToken = Str::random(80);
        $user->api_token = $apiToken;
        $user->save();

        // return response()->json(['message' => 'Login successful', 'api_token' => $user->api_token], 200);
        return response()->json([
            'message' => 'Login berhasil!',
            'api_token' => $apiToken,
            'token_type' => 'Bearer', // Tipe token
            'expires_in' => null, // Atau Anda bisa tambahkan masa berlaku jika Anda mau
            'user' => [ // Opsional: kembalikan data user dasar
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ], 200);
    }

    /**
     * Get authenticated user details.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function profile(Request $request)
    {
        return response()->json(auth()->user());
    }

    /**
     * Logout user by invalidating API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            $user->api_token = null; // Invalidate the current token
            $user->save();
            return response()->json(['message' => 'Logged out successfully']);
        }
        return response()->json(['message' => 'No active user session'], 401);
    }
}