<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\AddPostRequest;
use App\Http\Resources\Post\PostResource;
use App\Http\Responses\SuccessResponse;
use App\Http\Responses\SuccessResponseWithData;
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
    public function index()
    {
        //to get the post and its associated comments in descending order of created at for geeting latest post and comment
        $posts = Post::with(['user', 'comments' => function ($query) {
            $query->with('user')->orderBy('created_at', 'desc');
        }])
            ->orderBy('created_at', 'desc')
            ->get();

        return new  SuccessResponseWithData(["posts" => $posts]);
    }

    //storing the post to db
    public function store(AddPostRequest $addPostRequest)
    {
        //merging created_by field to the current logged in user it
        $addPostRequest->merge(['created_by' => getAuthId()]);
        $this->model->create($addPostRequest->all());
        return new SuccessResponse("Post has been added successfully.");
    }
}
