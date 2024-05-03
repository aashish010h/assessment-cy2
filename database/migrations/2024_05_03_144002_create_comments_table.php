<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body'); // Stores the content of the comment
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('created_by'); // Foreign key referencing the posts table
            $table->timestamps();

            // Define foreign key relationship with posts table and users table for created by
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade')->cascadeOnUpdate();
            $table->foreign('created_by')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
