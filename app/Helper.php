<?php

//helper fucntion which gives the current logged in user id
if (!function_exists('getAuthId')) {
    function getAuthId()
    {
        return auth()->user()->id;
    }
}
