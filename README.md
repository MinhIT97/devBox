# Dev Toolkit

Dev Toolkit is a Laravel 12 MVP website for small daily developer utilities.

## Stack

- Laravel 12
- Blade
- Alpine.js
- TailwindCSS 4 with Vite
- Monaco Editor
- LocalStorage
- No database feature requirement for MVP
- No auth for MVP

## MVP Tools

- JSON Formatter: validate, format with 2 spaces, minify, swap output to input, copy output.
- Case Converter: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, Title Case.
- Constant Generator: PHP const, PHP enum, JavaScript object, TypeScript enum.
- BEM Generator: CSS classes and HTML sample.

All conversions run in the browser with JavaScript. Inputs are saved per tool in LocalStorage.

## Install From Scratch

```bash
composer create-project laravel/laravel:^12.0 dev-toolkit
cd dev-toolkit
npm install
npm install alpinejs @tailwindcss/vite monaco-editor
npm run dev
php artisan serve
```

## Run This Project

```bash
composer install
npm install
npm run dev
php artisan serve
```

Open `http://127.0.0.1:8000`.

## Main Files

- `routes/web.php`
- `resources/views/layouts/app.blade.php`
- `resources/views/tools/index.blade.php`
- `resources/js/app.js`
- `resources/js/tools/helpers.js`
- `resources/js/tools/jsonTool.js`
- `resources/js/tools/caseConverter.js`
- `resources/js/tools/constantGenerator.js`
- `resources/js/tools/bemGenerator.js`
- `resources/css/app.css`
