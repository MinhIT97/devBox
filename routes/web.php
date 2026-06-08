<?php

use App\Http\Controllers\JsonShareController;
use Illuminate\Support\Facades\Route;

Route::get('/sw.js', function () {
    return response('', 204)
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate')
        ->header('Service-Worker-Allowed', '/');
});

Route::get('/', function () {
    return view('tools.index');
});

// JSON Share
Route::post('/api/json/share',          [JsonShareController::class, 'store']);
Route::get('/api/json/share/{slug}',    [JsonShareController::class, 'fetch']);
Route::get('/s/{slug}',                 [JsonShareController::class, 'show']);

