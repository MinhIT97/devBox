<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark light">
    <meta name="description" content="Daily utilities for developers — JSON Formatter, Case Converter, Constant Generator, BEM Generator and more.">
    <title>@yield('title', 'Dev Toolkit')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="h-full antialiased" style="background:#020617">
    @yield('content')
</body>
</html>
