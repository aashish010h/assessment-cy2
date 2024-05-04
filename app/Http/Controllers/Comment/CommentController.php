<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Comment\StoreCommentRequest;
use App\Http\Requests\Comment\UpdateCommentRequest;
use App\Http\Resources\Comment\CommentResource;
use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse;
use App\Http\Responses\SuccessResponseWithData;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    protected $model;
    protected $panel = 'Comment';

    //init of the modal to this controler for reuseability
    public function __construct(Comment $model)
    {
        $this->model = $model;
    }

    //storing the comment  to db

    public function store(StoreCommentRequest $storeCommentRequest, Post $post)
    {

        //creating comment instance for a new comment
        $comment = new Comment([
            'title' => $storeCommentRequest->title,
            'body' => $storeCommentRequest->body,
            'created_by' => getAuthId(), // helper function to get the logged in user id
        ]);

        //saving the comment associated with the post
        $post->comments()->save($comment);

        return new SuccessResponse("Comment has been added successfully.");
    }


    //for showing the single comment
    public function show(Comment $comment)
    {
        return new SuccessResponseWithData(['comment' => new CommentResource($comment)]);
    }

    //for upadating the comment
    public function update(UpdateCommentRequest $updateCommentRequest, Comment $comment)
    {

        //check if the comment is done by logged in user or not so that other user dont update the comment
        if (getAuthId() != $comment->created_by) {
            return new ErrorResponse("You cannot edit this comment as this is not posted by you.");
        }

        //add the new title and body then save the comment

        $comment->title = $updateCommentRequest->title;
        $comment->body = $updateCommentRequest->body;

        $comment->save();

        return new SuccessResponse("Comment has been updated successfully.");
    }

    //for deleting the comment
    public function destroy(Comment $comment)
    {
        //check if the comment is done by logged in user or not so that other user dont delete the comment

        if (getAuthId() != $comment->created_by) {
            return new ErrorResponse("You cannot delete this comment as this is not posted by you.");
        }
        $comment->delete();
        return new SuccessResponse("Comment has been deleted successfully.");
    }
}
