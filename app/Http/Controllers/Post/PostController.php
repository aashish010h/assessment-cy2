<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\AddPostRequest;
use App\Http\Responses\SuccessResponse;
use Illuminate\Http\Request;
use App\Models\Post;


class PostController extends Controller
{
    protected $model;
    protected $panel = 'Post';

    public function __construct(Post $model)
    {
        $this->model = $model;
    }

    public function store(AddPostRequest $addPostRequest)
    {
        $addPostRequest->merge(['created_by' => getAuthId()]);
        $this->model->create($addPostRequest->all());
        return new SuccessResponse("Post has been added successfully.");
    }
}
