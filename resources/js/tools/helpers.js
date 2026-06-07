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

export function normalizeWords(value) {
    return String(value ?? '')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
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
