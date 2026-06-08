// ─── Base64 Encode & Decode ───
export function encodeBase64(str) {
    try {
        return btoa(unescape(encodeURIComponent(str)));
    } catch (e) {
        throw new Error('Encoding failed: ' + e.message);
    }
}

export function decodeBase64(str) {
    try {
        return decodeURIComponent(escape(atob(str)));
    } catch (e) {
        throw new Error('Decoding failed. Make sure input is a valid Base64 string.');
    }
}

// ─── URL Encode & Decode ───
export function encodeUrl(str) {
    return encodeURIComponent(str);
}

export function decodeUrl(str) {
    try {
        return decodeURIComponent(str);
    } catch (e) {
        throw new Error('URL decoding failed. Invalid URL format.');
    }
}

// ─── JWT Decoder ───
function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function decodeJwt(token) {
    token = String(token ?? '').trim();
    const parts = token.split('.');
    if (parts.length < 2 || parts.length > 3) {
        throw new Error('Invalid JWT format. Must contain 2 or 3 dot-separated parts.');
    }
    try {
        const headerJson = JSON.parse(base64UrlDecode(parts[0]));
        const payloadJson = JSON.parse(base64UrlDecode(parts[1]));
        return {
            header: JSON.stringify(headerJson, null, 2),
            payload: JSON.stringify(payloadJson, null, 2)
        };
    } catch (e) {
        throw new Error('JWT Decryption failed: ' + e.message);
    }
}

// ─── LCS Diff Checker ───
export function computeDiff(textA, textB) {
    const lines1 = String(textA ?? '').split(/\r?\n/);
    const lines2 = String(textB ?? '').split(/\r?\n/);

    const dp = Array(lines1.length + 1).fill(null).map(() => Array(lines2.length + 1).fill(0));
    for (let r = 1; r <= lines1.length; r++) {
        for (let c = 1; c <= lines2.length; c++) {
            if (lines1[r-1] === lines2[c-1]) {
                dp[r][c] = dp[r-1][c-1] + 1;
            } else {
                dp[r][c] = Math.max(dp[r-1][c], dp[r][c-1]);
            }
        }
    }

    let r = lines1.length, c = lines2.length;
    const diff = [];
    while (r > 0 || c > 0) {
        if (r > 0 && c > 0 && lines1[r-1] === lines2[c-1]) {
            diff.push({ type: 'equal', value: lines1[r-1] });
            r--;
            c--;
        } else if (c > 0 && (r === 0 || dp[r][c-1] >= dp[r-1][c])) {
            diff.push({ type: 'added', value: lines2[c-1] });
            c--;
        } else if (r > 0 && (c === 0 || dp[r][c-1] < dp[r-1][c])) {
            diff.push({ type: 'removed', value: lines1[r-1] });
            r--;
        }
    }
    return diff.reverse();
}

// ─── UUID & Password Generators ───
export function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function generatePassword(length, useUppercase, useNumbers, useSymbols) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ─── HTML Formatter & Minifier ───
export function formatHtml(html) {
    let formatted = '';
    let reg = /(>)(<)(\/*)/g;
    html = String(html ?? '').replace(reg, '$1\r\n$2$3');
    let pad = 0;
    html.split('\r\n').forEach(function(node) {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        let padding = '';
        for (let i = 0; i < pad; i++) {
            padding += '  ';
        }
        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted.trim();
}

export function minifyHtml(html) {
    return String(html ?? '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
}

// ─── Epoch Converter ───
export function epochToDate(epoch) {
    try {
        const ms = Number(epoch) * 1000;
        if (isNaN(ms)) throw new Error();
        const date = new Date(ms);
        const pad = (num) => String(num).padStart(2, '0');
        const custom = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
        return {
            utc: date.toUTCString(),
            local: date.toString(),
            iso: date.toISOString(),
            custom: custom
        };
    } catch {
        throw new Error('Invalid epoch timestamp.');
    }
}

export function dateToEpoch(dateStr) {
    try {
        const time = new Date(dateStr).getTime();
        if (isNaN(time)) throw new Error();
        return Math.floor(time / 1000);
    } catch {
        throw new Error('Invalid datetime format.');
    }
}

// ─── Regex Tester ───
export function testRegex(pattern, flags, text) {
    try {
        if (!pattern) return { matches: [], error: false, message: 'Please enter a regex pattern.' };
        const regex = new RegExp(pattern, flags);
        const matches = [];
        let match;
        
        if (flags.includes('g')) {
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    text: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
                // Prevent infinite loop on zero-width match
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }
        } else {
            match = regex.exec(text);
            if (match) {
                matches.push({
                    text: match[0],
                    index: match.index,
                    groups: match.slice(1)
                });
            }
        }
        return {
            matches,
            error: false,
            message: `Found ${matches.length} match(es).`
        };
    } catch (e) {
        return {
            matches: [],
            error: true,
            message: `Regex Error: ${e.message}`
        };
    }
}

// ─── Color Converter Helpers ───
function hexToRgb(hex) {
    hex = hex.trim().replace(/^#/, '');
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return null;
    const num = parseInt(hex, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

export function parseColor(input) {
    input = String(input ?? '').trim().toLowerCase();
    
    // HEX
    if (input.startsWith('#') || /^[0-9a-f]{3,6}$/i.test(input)) {
        const rgb = hexToRgb(input);
        if (rgb) {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            return { hex: rgbToHex(rgb.r, rgb.g, rgb.b), rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, error: false };
        }
    }
    
    // RGB
    let match = input.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
    if (match) {
        const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
        if (r <= 255 && g <= 255 && b <= 255) {
            const hsl = rgbToHsl(r, g, b);
            return { hex: rgbToHex(r, g, b), rgb: `rgb(${r}, ${g}, ${b})`, hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, error: false };
        }
    }
    
    // HSL
    match = input.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/);
    if (match) {
        const h = parseInt(match[1]), s = parseInt(match[2]), l = parseInt(match[3]);
        if (h <= 360 && s <= 100 && l <= 100) {
            const rgb = hslToRgb(h, s, l);
            return { hex: rgbToHex(rgb.r, rgb.g, rgb.b), rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, hsl: `hsl(${h}, ${s}%, ${l}%)`, error: false };
        }
    }
    
    return { error: true, message: 'Invalid color format. Use HEX, rgb(r,g,b), or hsl(h,s%,l%)' };
}
