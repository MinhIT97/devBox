<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link hết hạn — Dev Toolkit</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0d1117;
            color: #e6edf3;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card {
            text-align: center;
            padding: 48px 40px;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 16px;
            max-width: 420px;
            width: 90%;
        }
        .icon {
            font-size: 56px;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #f0f6fc;
        }
        p {
            font-size: 14px;
            color: #8b949e;
            line-height: 1.6;
            margin-bottom: 28px;
        }
        a {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 24px;
            background: linear-gradient(135deg, #7c3aed, #4f46e5);
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: opacity .15s;
        }
        a:hover { opacity: .85; }
        .badge {
            display: inline-block;
            margin-top: 20px;
            padding: 4px 12px;
            background: #21262d;
            border: 1px solid #30363d;
            border-radius: 20px;
            font-size: 11px;
            color: #8b949e;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="icon">⏱️</div>
        <h1>Link đã hết hạn</h1>
        <p>Nội dung JSON được chia sẻ tại link này đã hết hạn (24 giờ) hoặc không tồn tại.</p>
        <a href="/">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Mở Dev Toolkit
        </a>
        <div class="badge">Share link có thời hạn 24 giờ</div>
    </div>
</body>
</html>
