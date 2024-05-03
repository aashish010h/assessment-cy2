<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

class SuccessResponse implements Responsable
{
    protected $message;
    protected $code;

    public function __construct($message, $code = 200)
    {
        $this->message = $message;
        $this->code = $code;
    }

    public function toResponse($request)
    {
        return response()->json([
            'success' => true,
            'message' => $this->message
        ], $this->code);
    }
}
