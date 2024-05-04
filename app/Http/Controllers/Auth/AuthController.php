<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse;
use App\Http\Responses\SuccessResponseWithData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //for managing the login through id and password and generate token for accessing the other protected apis
    public function login(LoginRequest $loginRequest)
    {

        $credentials = $loginRequest->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return new SuccessResponseWithData([
                'user' => $user,
                'authorization' => [
                    'token' => $user->createToken('Personal Access Token')->plainTextToken,
                    'type' => 'bearer',
                ]
            ]);
        }
        return new ErrorResponse("Invalid Credentials", 400);
    }

    //for registrating the new user to the system
    public function register(RegisterRequest $registerRequest)
    {

        $user = new User([
            'name'  => $registerRequest->name,
            'email' => $registerRequest->email,
            'password' => bcrypt($registerRequest->password),
        ]);

        if ($user->save()) {
            return new SuccessResponseWithData([
                'message' => 'Successfully created user!',
                'authorization' => [
                    'user' => $user,
                    'token' => $user->createToken('Personal Access Token')->plainTextToken,
                    'type' => 'bearer',
                ]
            ]);
        } else {
            return new ErrorResponse("Error in register.");
        }
    }

    //for logging out hte user and deleted  the associated token with it
    public function logout()
    {
        Auth::user()->tokens()->delete();
        return new SuccessResponse("Logged out successfully");
    }
}
