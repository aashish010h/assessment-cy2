<?php

if (!function_exists('getAuthId')) {
    function getAuthId()
    {
        return auth()->guard('api')->user()?->id;
    }
}
