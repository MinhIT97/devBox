<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="color-scheme" content="dark light">
    <meta name="description" content="All-in-one Dev Toolkit: format and minify JSON/HTML, compare code diffs, encode/decode Base64 and URLs, parse JWTs, generate UUIDs and passwords, test regex, convert epoch timestamps, and colors.">
    <meta name="keywords" content="developer tools, json formatter, base64 encoder, url encoder, jwt decoder, diff checker, uuid generator, epoch converter, regex tester, color converter, web utility, dev tools">
    <meta name="author" content="MinhNV">
    <meta name="robots" content="index, follow">
    <title>@yield('title', 'Dev Toolkit — Daily utilities for developers')</title>

    <!-- Canonical URL -->
    <link rel="canonical" href="https://toolkit.minhnv.work">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://toolkit.minhnv.work">
    <meta property="og:title" content="Dev Toolkit — Daily utilities for developers">
    <meta property="og:description" content="All-in-one developer toolbox. Format JSON/HTML, compare diffs, convert Base64/URL/JWT/Epoch, test Regex, generate UUIDs & passwords, convert colors, and more.">
    <meta property="og:image" content="https://toolkit.minhnv.work/og-image.png">
    <meta property="og:site_name" content="Dev Toolkit">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://toolkit.minhnv.work">
    <meta name="twitter:title" content="Dev Toolkit — Daily utilities for developers">
    <meta name="twitter:description" content="All-in-one developer toolbox. Format JSON/HTML, compare diffs, convert Base64/URL/JWT/Epoch, test Regex, generate UUIDs & passwords, convert colors, and more.">
    <meta name="twitter:image" content="https://toolkit.minhnv.work/og-image.png">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    {{-- Inline x-cloak: hides x-show elements BEFORE Alpine starts (Vite CSS loads async) --}}
    <style>[x-cloak]{display:none!important}</style>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "WebApplication",
      "name": "Dev Toolkit",
      "url": "https://toolkit.minhnv.work",
      "description": "All-in-one developer utilities: Format JSON/HTML, compare diffs, convert Base64/URL/JWT/Epoch, test Regex, generate UUIDs, convert colors.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5."
    }
    </script>
</head>
<body class="h-full antialiased" style="background:#020617">
    @yield('content')
</body>
</html>
