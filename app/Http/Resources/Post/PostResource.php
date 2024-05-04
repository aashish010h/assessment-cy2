<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Comment\CommentResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'created_by' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'comments' => CommentResource::collection($this->comments),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'), // Example formatting
        ];
    }
}
