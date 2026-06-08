<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class JsonShareController extends Controller
{
    /**
     * Tạo share link mới, lưu nội dung JSON vào cache 24h.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => ['required', 'string', 'max:524288'], // max 512KB
        ]);

        $content = $request->input('content');

        // Sinh slug ngẫu nhiên 8 ký tự, đảm bảo không trùng
        do {
            $slug = Str::random(8);
        } while (Cache::has("json_share:{$slug}"));

        $expiresAt = now()->addHours(24);

        Cache::put("json_share:{$slug}", $content, $expiresAt);

        return response()->json([
            'slug'       => $slug,
            'url'        => url("/s/{$slug}"),
            'expires_at' => $expiresAt->toIso8601String(),
        ]);
    }

    /**
     * Trả về nội dung JSON từ cache (dùng cho JS fetch).
     */
    public function fetch(string $slug)
    {
        $content = Cache::get("json_share:{$slug}");

        if ($content === null) {
            return response()->json([
                'error' => 'Link này đã hết hạn hoặc không tồn tại.',
            ], 404);
        }

        return response()->json([
            'content' => $content,
        ]);
    }

    /**
     * Redirect về trang chủ kèm query param để frontend tự load.
     */
    public function show(string $slug)
    {
        if (!Cache::has("json_share:{$slug}")) {
            return response()->view('share.expired', ['slug' => $slug], 410);
        }

        return redirect("/?share={$slug}");
    }
}
