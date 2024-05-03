<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Http\Responses\SuccessResponse;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    protected $model;
    protected $panel = 'Comment';

    public function __construct(Comment $model)
    {
        $this->model = $model;
    }

    public function store(StoreCommentRequest $storeCommentRequest, Post $post)
    {
        $comment = new Comment([
            'title' => $storeCommentRequest->title,
            'body' => $storeCommentRequest->body,
            'created_by' => getAuthId(), // Assuming you have user authentication
        ]);

        $post->comments()->save($comment);

        return new SuccessResponse("Comment has been added successfully.");
    }

    public function update(UpdateCommentRequest $updateCommentRequest, Comment $comment)
    {

        $comment->title = $updateCommentRequest->title;
        $comment->body = $updateCommentRequest->body;

        $comment->save();

        return new SuccessResponse("Comment has been added successfully.");
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return new SuccessResponse("Comment has been deleted successfully.");
    }
}
