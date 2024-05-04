<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    //validation rules for the comment
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'body' => 'required|string',
        ];
    }
}
