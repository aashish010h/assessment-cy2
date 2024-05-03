<?php

namespace App\Http\Responses;

use Illuminate\Contracts\Support\Responsable;

class SuccessResponseWithData implements Responsable
{
    protected $data;
    protected $code;

    public function __construct($data, $code = 200)
    {
        $this->data = $data;
        $this->code = $code;
    }

    public function toResponse($request)
    {
        return response()->json([
            'success' => true,
            'data' => $this->data,
        ], $this->code);
    }
}
