<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Post;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ["title", "body", "created_by", "post_id"];

    //comment belongs to post inverser of one to many
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    //comment can be done bu user
    public function user()
    {
        return $this->belongsTo(
            User::class,
            "created_by"
        );
    }
}
