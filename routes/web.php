<?php

use Illuminate\Support\Facades\Route;


// fallback route to handle all other routes and return the welcome view , uses vue router for others routes excpeted defined in web.php
Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');
