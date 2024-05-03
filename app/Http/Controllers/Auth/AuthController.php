<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest)
    {

        $credentials = $loginRequest->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'user' => $user,
                'authorization' => [
                    'token' => $user->createToken('Personal Access Token')->plainTextToken,
                    'type' => 'bearer',
                ]
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }
    public function register(RegisterRequest $registerRequest)
    {
        $user = new User([
            'name'  => $registerRequest->name,
            'email' => $registerRequest->email,
            'password' => bcrypt($registerRequest->password),
        ]);

        if ($user->save()) {
            return response()->json([
                'message' => 'Successfully created user!',
                'authorization' => [
                    'user' => $user,
                    'token' => $user->createToken('Personal Access Token')->plainTextToken,
                    'type' => 'bearer',
                ]
            ], 201);
        } else {
            return response()->json(['error' => 'Provide proper details']);
        }
    }
    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }
}
