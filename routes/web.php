<?php

use Illuminate\Support\Facades\Route;

Route::get('/sw.js', function () {
    return response('', 204)
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
        ->header('Service-Worker-Allowed', '/');
});

Route::get('/', function () {
    return view('tools.index');
});
