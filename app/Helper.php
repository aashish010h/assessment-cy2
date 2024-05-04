<?php

if (!function_exists('getAuthId')) {
    function getAuthId()
    {
        return auth()->user()->id; // Assuming user is authenticated
    }
}
