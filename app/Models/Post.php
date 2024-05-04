<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ["title", "description", "created_by"];

    //one post can have many comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    //single post can be posted by a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            "created_by"
        );
    }
}
