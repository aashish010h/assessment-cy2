<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

class ErrorResponse implements Responsable
{
    protected $message;
    protected $code;

    public function __construct($message, $code = 422)
    {
        $this->message = $message;
        $this->code = $code;
    }

    public function toResponse($request)
    {
        return response()->json([
            'success' => false,
            'message' => $this->message
        ], $this->code);
    }
}
