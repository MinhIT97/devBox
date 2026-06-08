export function copyToClipboard(text, onSuccess = null) {
    const value = String(text ?? '');

    if (!value) {
        return Promise.resolve(false);
    }

    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(value).then(() => {
            onSuccess?.();
            return true;
        });
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand('copy');
    textarea.remove();

    if (copied) {
        onSuccess?.();
    }

    return Promise.resolve(copied);
}

export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, String(value ?? ''));
    } catch {
        //
    }
}

export function loadFromLocalStorage(key, fallback = '') {
    try {
        return localStorage.getItem(key) ?? fallback;
    } catch {
        return fallback;
    }
}

/**
 * Chuyển ký tự có dấu tiếng Việt (và các diacritics phổ biến) thành ký tự Latin thuần.
 * Ví dụ: "tên người dùng" → "ten nguoi dung"
 */
export function removeDiacritics(value) {
    const map = [
        // a
        [/[àáâãäåăặắằẳẵạấầẩẫậ]/gi, (c) => /[A-Z]/.test(c) ? 'A' : 'a'],
        // â (đã nằm trong a ở trên)
        // ă (đã nằm trong a ở trên)
        // e
        [/[èéêëẹẻẽếềểễệ]/gi, (c) => /[A-Z]/.test(c) ? 'E' : 'e'],
        // i
        [/[ìíîïịỉĩ]/gi, (c) => /[A-Z]/.test(c) ? 'I' : 'i'],
        // o
        [/[òóôõöøọỏõốồổỗộơớờởỡợ]/gi, (c) => /[A-Z]/.test(c) ? 'O' : 'o'],
        // u
        [/[ùúûüụủũưứừửữự]/gi, (c) => /[A-Z]/.test(c) ? 'U' : 'u'],
        // y
        [/[ỳýỷỹỵ]/gi, (c) => /[A-Z]/.test(c) ? 'Y' : 'y'],
        // d
        [/[đ]/g, 'd'],
        [/[Đ]/g, 'D'],
    ];

    let result = String(value ?? '');
    for (const [pattern, replacement] of map) {
        result = result.replace(pattern, replacement);
    }
    // Fallback: dùng Unicode normalization để xử lý các diacritics còn lại
    return result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function normalizeWords(value) {
    return removeDiacritics(String(value ?? ''))
        // Tách camelCase/PascalCase
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        // Tách theo ký tự phân cách và loại bỏ ký tự đặc biệt còn lại
        .split(/[^A-Za-z0-9]+/)
        .map((word) => word.trim())
        .filter(Boolean);
}

export function toCamelCase(value) {
    const words = normalizeWords(value);

    return words
        .map((word, index) => {
            const lower = word.toLowerCase();
            return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

export function toPascalCase(value) {
    return normalizeWords(value)
        .map((word) => {
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

export function toSnakeCase(value) {
    return normalizeWords(value).map((word) => word.toLowerCase()).join('_');
}

export function toKebabCase(value) {
    return normalizeWords(value).map((word) => word.toLowerCase()).join('-');
}

export function toConstantCase(value) {
    return normalizeWords(value).map((word) => word.toUpperCase()).join('_');
}

export function toDotCase(value) {
    return normalizeWords(value).map((word) => word.toLowerCase()).join('.');
}

export function toTitleCase(value) {
    return normalizeWords(value)
        .map((word) => {
            const lower = word.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(' ');
}

export function escapeSingleQuoted(value) {
    return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
