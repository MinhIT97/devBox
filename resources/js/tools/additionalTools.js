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

// ─── SQL Formatter ───
const SQL_KEYWORDS = [
    'SELECT','FROM','WHERE','AND','OR','NOT','IN','IS','NULL','AS','ON',
    'JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN','FULL JOIN','CROSS JOIN',
    'GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','UNION','UNION ALL',
    'INSERT INTO','VALUES','UPDATE','SET','DELETE FROM','CREATE TABLE','ALTER TABLE',
    'DROP TABLE','INDEX','PRIMARY KEY','FOREIGN KEY','REFERENCES','DEFAULT',
    'DISTINCT','BETWEEN','LIKE','EXISTS','CASE','WHEN','THEN','ELSE','END',
    'BEGIN','COMMIT','ROLLBACK','TRANSACTION','ASC','DESC','COUNT','SUM','AVG','MAX','MIN',
    'WITH','RECURSIVE','RETURNING','OVER','PARTITION BY','ROW_NUMBER','RANK',
    'INNER','LEFT','RIGHT','FULL','CROSS','OUTER','IF','IFNULL','COALESCE','CAST',
    'INT','VARCHAR','TEXT','BOOLEAN','TIMESTAMP','DATE','FLOAT','DOUBLE','DECIMAL',
    'SERIAL','BIGSERIAL','UUID','JSONB','JSON','TRUE','FALSE',
];

export function formatSql(input) {
    let sql = String(input ?? '').trim();
    if (!sql) return '';

    // Collapse whitespace
    sql = sql.replace(/\s+/g, ' ');

    // Add newline before major clauses
    const majorClauses = [
        'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'GROUP BY', 'ORDER BY',
        'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL',
        'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
        'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
        'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN',
        'FULL JOIN', 'CROSS JOIN', 'JOIN', 'ON',
        'BEGIN', 'COMMIT', 'ROLLBACK', 'RETURNING',
        'WITH', 'OVER', 'PARTITION BY',
    ];

    for (const clause of majorClauses) {
        const re = new RegExp(`\\b(${clause.replace(/\s+/g, '\\s+')})\\b`, 'gi');
        sql = sql.replace(re, (match) => `\n${match.toUpperCase()}`);
    }

    // Uppercase remaining keywords
    for (const kw of SQL_KEYWORDS) {
        const re = new RegExp(`\\b(${kw.replace(/\s+/g, '\\s+')})\\b`, 'gi');
        sql = sql.replace(re, (match) => match.toUpperCase());
    }

    // Clean up leading newline
    sql = sql.replace(/^\n+/, '');

    // Indent after newlines
    const lines = sql.split('\n');
    let indent = 0;
    const indentClauses = ['SELECT', 'INSERT INTO', 'UPDATE', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'WITH'];
    const outdentClauses = ['FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET'];

    const result = [];
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Decrease indent before certain clauses
        for (const clause of outdentClauses) {
            if (line.startsWith(clause) && indent > 0) indent = Math.max(0, indent - 1);
        }

        result.push('  '.repeat(indent) + line);

        // Increase indent after certain clauses
        for (const clause of indentClauses) {
            if (line.startsWith(clause)) indent = Math.min(indent + 1, 4);
        }
    }

    return result.join('\n');
}

export function minifySql(input) {
    return String(input ?? '')
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .trim();
}

// ─── IP / Geo Lookup ───
export async function lookupIp(ip) {
    const query = ip ? ip.trim() : '';
    const url = query ? `https://ipapi.co/${encodeURIComponent(query)}/json/` : 'https://ipapi.co/json/';
    const res = await fetch(url);
    if (!res.ok) throw new Error('IP lookup failed');
    const data = await res.json();
    if (data.error) throw new Error(data.reason || 'Invalid IP or lookup failed');
    return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        countryCode: data.country_code,
        isp: data.org,
        timezone: data.timezone,
        lat: data.latitude,
        lon: data.longitude,
        postal: data.postal,
    };
}

// ─── Hash Generator ───
// MD5 implementation (RFC 1321)
function md5(string) {
    function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX, lY) {
        const lX4 = lX & 0x40000000, lY4 = lY & 0x40000000;
        const lX8 = lX & 0x80000000, lY8 = lY & 0x80000000;
        let lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
            else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
        } else return lResult ^ lX8 ^ lY8;
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | (~z)); }
    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function convertToWordArray(string) {
        const lWordCount = (((string.length + 8) - ((string.length + 8) % 64)) / 64 + 1) * 16;
        const lWordArray = Array(lWordCount - 1);
        let lBytePosition = 0, lByteCount = 0;
        while (lByteCount < string.length) {
            lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            if (lWordArray[lWordPosition] === undefined) lWordArray[lWordPosition] = 0;
            lWordArray[lWordPosition] |= (string.charCodeAt(lByteCount) << lBytePosition);
            lByteCount++;
        }
        lWordPosition = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        if (lWordArray[lWordPosition] === undefined) lWordArray[lWordPosition] = 0;
        lWordArray[lWordPosition] |= (0x80 << lBytePosition);
        lWordArray[lWordCount - 2] = string.length << 3;
        lWordArray[lWordCount - 1] = string.length >>> 29;
        return lWordArray;
    }
    function wordToHex(lValue) {
        let wordToHexValue = '', wordToHexValueTemp = '', lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValueTemp = '0' + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
        }
        return wordToHexValue;
    }
    const x = convertToWordArray(string);
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
    for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k+0],  7,  0xD76AA478);
        d = FF(d, a, b, c, x[k+1],  12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k+2],  17, 0x242070DB);
        b = FF(b, c, d, a, x[k+3],  22, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k+4],  7,  0xF57C0FAF);
        d = FF(d, a, b, c, x[k+5],  12, 0x4787C62A);
        c = FF(c, d, a, b, x[k+6],  17, 0xA8304613);
        b = FF(b, c, d, a, x[k+7],  22, 0xFD469501);
        a = FF(a, b, c, d, x[k+8],  7,  0x698098D8);
        d = FF(d, a, b, c, x[k+9],  12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k+10], 17, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k+11], 22, 0x895CD7BE);
        a = FF(a, b, c, d, x[k+12], 7,  0x6B901122);
        d = FF(d, a, b, c, x[k+13], 12, 0xFD987193);
        c = FF(c, d, a, b, x[k+14], 17, 0xA679438E);
        b = FF(b, c, d, a, x[k+15], 22, 0x49B40821);
        a = GG(a, b, c, d, x[k+1],  5,  0xF61E2562);
        d = GG(d, a, b, c, x[k+6],  9,  0xC040B340);
        c = GG(c, d, a, b, x[k+11], 14, 0x265E5A51);
        b = GG(b, c, d, a, x[k+0],  20, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k+5],  5,  0xD62F105D);
        d = GG(d, a, b, c, x[k+10], 9,  0x02441453);
        c = GG(c, d, a, b, x[k+15], 14, 0xD8A1E681);
        b = GG(b, c, d, a, x[k+4],  20, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k+9],  5,  0x21E1CDE6);
        d = GG(d, a, b, c, x[k+14], 9,  0xC33707D6);
        c = GG(c, d, a, b, x[k+3],  14, 0xF4D50D87);
        b = GG(b, c, d, a, x[k+8],  20, 0x455A14ED);
        a = GG(a, b, c, d, x[k+13], 5,  0xA9E3E905);
        d = GG(d, a, b, c, x[k+2],  9,  0xFCEFA3F8);
        c = GG(c, d, a, b, x[k+7],  14, 0x676F02D9);
        b = GG(b, c, d, a, x[k+12], 20, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k+5],  4,  0xFFFA3942);
        d = HH(d, a, b, c, x[k+8],  11, 0x8771F681);
        c = HH(c, d, a, b, x[k+11], 16, 0x6D9D6122);
        b = HH(b, c, d, a, x[k+14], 23, 0xFDE5380C);
        a = HH(a, b, c, d, x[k+1],  4,  0xA4BEEA44);
        d = HH(d, a, b, c, x[k+4],  11, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k+7],  16, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k+10], 23, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k+13], 4,  0x289B7EC6);
        d = HH(d, a, b, c, x[k+0],  11, 0xEAA127FA);
        c = HH(c, d, a, b, x[k+3],  16, 0xD4EF3085);
        b = HH(b, c, d, a, x[k+6],  23, 0x04881D05);
        a = HH(a, b, c, d, x[k+9],  4,  0xD9D4D039);
        d = HH(d, a, b, c, x[k+12], 11, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k+15], 16, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k+2],  23, 0xC4AC5665);
        a = II(a, b, c, d, x[k+0],  6,  0xF4292244);
        d = II(d, a, b, c, x[k+7],  10, 0x432AFF97);
        c = II(c, d, a, b, x[k+14], 15, 0xAB9423A7);
        b = II(b, c, d, a, x[k+5],  21, 0xFC93A039);
        a = II(a, b, c, d, x[k+12], 6,  0x655B59C3);
        d = II(d, a, b, c, x[k+3],  10, 0x8F0CCC92);
        c = II(c, d, a, b, x[k+10], 15, 0xFFEFF47D);
        b = II(b, c, d, a, x[k+1],  21, 0x85845DD1);
        a = II(a, b, c, d, x[k+8],  6,  0x6FA87E4F);
        d = II(d, a, b, c, x[k+15], 10, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k+6],  15, 0xA3014314);
        b = II(b, c, d, a, x[k+13], 21, 0x4E0811A1);
        a = II(a, b, c, d, x[k+4],  6,  0xF7537E82);
        d = II(d, a, b, c, x[k+11], 10, 0xBD3AF235);
        c = II(c, d, a, b, x[k+2],  15, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k+9],  21, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

export async function generateHash(input, algorithm) {
    const text = String(input ?? '');

    if (algorithm === 'md5') {
        return md5(text);
    }

    // SHA family via Web Crypto API
    const algoMap = {
        'sha1': 'SHA-1',
        'sha256': 'SHA-256',
        'sha384': 'SHA-384',
        'sha512': 'SHA-512',
    };
    const algo = algoMap[algorithm];
    if (!algo) throw new Error('Unknown algorithm: ' + algorithm);

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function generateAllHashes(input) {
    const md5Hash = md5(String(input ?? ''));
    const encoder = new TextEncoder();
    const data = encoder.encode(String(input ?? ''));

    const [sha1, sha256, sha384, sha512] = await Promise.all([
        crypto.subtle.digest('SHA-1', data),
        crypto.subtle.digest('SHA-256', data),
        crypto.subtle.digest('SHA-384', data),
        crypto.subtle.digest('SHA-512', data),
    ]);

    const toHex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');

    return {
        md5: md5Hash,
        sha1: toHex(sha1),
        sha256: toHex(sha256),
        sha384: toHex(sha384),
        sha512: toHex(sha512),
    };
}

// ─── QR Code Generator ───
export function generateQrCode(text, size = 256) {
    const encoded = encodeURIComponent(String(text ?? ''));
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=8`;
}

// ─── Lorem Ipsum Generator ───
const LOREM_WORDS = [
    'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit',
    'sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua',
    'ut','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris',
    'nisi','ut','aliquip','ex','ea','commodo','consequat','duis','aute','irure',
    'dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu',
    'fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident',
    'sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum',
    'pretium','vulputate','sapien','nec','sagittis','aliquam','malesuada','bibendum',
    'arcu','vitae','elementum','curabitur','vitae','nunc','sed','velit','dignissim',
    'sodales','ut','eu','sem','integer','vitae','justo','eget','magna','fermentum',
    'iaculis','eu','non','diam','phasellus','vestibulum','lorem','sed','risus','ultricies',
    'tristique','nulla','aliquet','enim','tortor','at','auctor','urna','nunc','id',
    'cursus','metus','aliquam','eleifend','mi','in','nulla','posuere','sollicitudin',
    'aliquam','ultrices','sagittis','orci','a','scelerisque','purus','semper','eget',
    'duis','at','tellus','at','urna','condimentum','mattis','pellentesque','id','nibh',
    'tortor','id','aliquet','lectus','proin','nibh','nisl','condimentum','id','venenatis',
    'a','condimentum','vitae','sapien','pellentesque','habitant','morbi','tristique',
    'senectus','et','netus','et','malesuada','fames','ac','turpis','egestas','sed',
    'tempus','urna','et','pharetra','pharetra','massa','massa','ultricies','mi','quis',
    'hendrerit','dolor','magna','eget','est','lorem','ipsum','dolor','sit','amet',
];

export function generateLorem(type, count) {
    const n = Math.min(Math.max(Number(count), 1), type === 'words' ? 1000 : 100);
    const shuffle = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    if (type === 'words') {
        const words = shuffle(LOREM_WORDS).slice(0, n);
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ') + '.';
    }

    if (type === 'sentences') {
        const sentences = [];
        for (let i = 0; i < n; i++) {
            const wordCount = 6 + Math.floor(Math.random() * 12);
            const words = shuffle(LOREM_WORDS).slice(0, wordCount);
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
            sentences.push(words.join(' ') + '.');
        }
        return sentences.join(' ');
    }

    // paragraphs
    const paragraphs = [];
    for (let p = 0; p < n; p++) {
        const sentenceCount = 3 + Math.floor(Math.random() * 5);
        const pSentences = [];
        for (let i = 0; i < sentenceCount; i++) {
            const wordCount = 8 + Math.floor(Math.random() * 14);
            const words = shuffle(LOREM_WORDS).slice(0, wordCount);
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
            pSentences.push(words.join(' ') + '.');
        }
        paragraphs.push(pSentences.join(' '));
    }
    return paragraphs.join('\n\n');
}

// ─── YAML ↔ JSON Converter ───
import yaml from 'js-yaml';

export function yamlToJson(input) {
    const parsed = yaml.load(String(input ?? ''));
    return JSON.stringify(parsed, null, 2);
}

export function jsonToYaml(input) {
    const parsed = JSON.parse(String(input ?? ''));
    return yaml.dump(parsed, { indent: 2, lineWidth: -1, noRefs: true });
}

// ─── Certificate Decoder ───
export function decodeCertificate(pem) {
    const text = String(pem ?? '').trim();
    if (!text) throw new Error('Paste a PEM-encoded certificate (-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE-----)');

    // Extract base64 body
    const match = text.match(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/);
    if (!match) throw new Error('Invalid PEM format. Expected -----BEGIN CERTIFICATE----- header.');

    const base64 = match[1].replace(/\s+/g, '');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    // Basic ASN.1 DER parsing for X.509 certificates
    const result = parseX509Certificate(bytes);
    return result;
}

function parseX509Certificate(bytes) {
    const info = {};
    let pos = 0;

    function readLength() {
        let len = bytes[pos++];
        if (len & 0x80) {
            const numBytes = len & 0x7F;
            len = 0;
            for (let i = 0; i < numBytes; i++) {
                len = (len << 8) | bytes[pos++];
            }
        }
        return len;
    }

    function readTag() {
        return bytes[pos++];
    }

    function skipTLV() {
        readTag();
        const len = readLength();
        pos += len;
    }

    // Skip Certificate SEQUENCE header
    readTag(); // 0x30
    readLength();

    // TBSCertificate SEQUENCE
    readTag(); // 0x30
    const tbsLen = readLength();
    const tbsStart = pos;

    // Version [0] EXPLICIT (skip if present)
    if (bytes[pos] === 0xA0) {
        pos++;
        const vLen = readLength();
        pos += vLen;
    }

    // Serial Number (INTEGER)
    readTag(); // 0x02
    const serialLen = readLength();
    let serial = '';
    for (let i = 0; i < serialLen; i++) {
        serial += bytes[pos++].toString(16).padStart(2, '0');
    }
    info.serialNumber = serial.replace(/^0+/, '') || '0';

    // Signature Algorithm (skip)
    skipTLV();

    // Issuer (SEQUENCE)
    info.issuer = parseDN();

    // Validity
    readTag(); // 0x30
    readLength();
    info.validFrom = parseTime();
    info.validTo = parseTime();

    // Subject (SEQUENCE)
    info.subject = parseDN();

    // Remaining: SubjectPublicKeyInfo, extensions
    // Calculate fingerprint from the full cert bytes
    info.fingerprintSHA1 = calculateFingerprint(bytes, 'SHA-1');
    info.fingerprintSHA256 = calculateFingerprint(bytes, 'SHA-256');

    return info;
}

// Simple SHA-1 for fingerprint (sync, for cert display)
function calculateFingerprint(bytes, algo) {
    // Use a simpler approach — hex of raw bytes for display
    // Since we can't use async crypto here easily, let's compute a hex dump
    // For now return placeholder that gets filled async
    return { bytes, algo };
}

function parseDN() {
    readTag(); // 0x30
    const len = readLength();
    const end = pos + len;
    const parts = [];

    while (pos < end) {
        // SET
        readTag(); // 0x31
        readLength();
        // SEQUENCE
        readTag(); // 0x30
        readLength();
        // OID
        readTag(); // 0x06
        const oidLen = readLength();
        const oid = Array.from(bytes.slice(pos, pos + oidLen)).map(b => b.toString()).join('.');
        pos += oidLen;
        // Value
        const tag = readTag();
        const valLen = readLength();
        let value = '';
        for (let i = 0; i < valLen; i++) {
            value += String.fromCharCode(bytes[pos++]);
        }

        const oidMap = {
            '85.4.6': 'C',
            '85.4.8': 'ST',
            '85.4.7': 'L',
            '85.4.10': 'O',
            '85.4.11': 'OU',
            '85.4.3': 'CN',
            '85.4.9': 'STREET',
            '85.4.5': 'serialNumber',
            '42.134.72.134.247.13.1.9': 'emailAddress',
        };
        const key = oidMap[oid] || oid;
        parts.push(key + '=' + value);
    }

    return parts.join(', ');
}

function parseTime() {
    const tag = readTag();
    const len = readLength();
    let timeStr = '';
    for (let i = 0; i < len; i++) {
        timeStr += String.fromCharCode(bytes[pos++]);
    }

    // UTCTime (YYMMDDHHMMSSZ) or GeneralizedTime (YYYYMMDDHHMMSSZ)
    if (timeStr.length === 13) {
        // UTCTime
        const yy = parseInt(timeStr.substring(0, 2));
        const year = yy >= 50 ? 1900 + yy : 2000 + yy;
        const month = timeStr.substring(2, 4);
        const day = timeStr.substring(4, 6);
        const hour = timeStr.substring(6, 8);
        const min = timeStr.substring(8, 10);
        const sec = timeStr.substring(10, 12);
        return `${year}-${month}-${day} ${hour}:${min}:${sec} UTC`;
    }
    if (timeStr.length >= 15) {
        const year = timeStr.substring(0, 4);
        const month = timeStr.substring(4, 6);
        const day = timeStr.substring(6, 8);
        const hour = timeStr.substring(8, 10);
        const min = timeStr.substring(10, 12);
        const sec = timeStr.substring(12, 14);
        return `${year}-${month}-${day} ${hour}:${min}:${sec} UTC`;
    }
    return timeStr;
}

// ─── Image Cropper ───
// Load a File/Blob into an HTMLImageElement (resolved) and ImageBitmap-like meta.
export function loadImageFromFile(file) {
 return new Promise((resolve, reject) => {
 if (!file || !file.type || !file.type.startsWith('image/')) {
 reject(new Error('Please choose a valid image file (PNG, JPG, GIF, WebP, BMP).'));
 return;
 }
 const reader = new FileReader();
 reader.onerror = () => reject(new Error('Failed to read file.'));
 reader.onload = (e) => {
 const img = new Image();
 img.onload = () => resolve({ image: img, dataUrl: e.target.result });
 img.onerror = () => reject(new Error('Failed to decode image. The file may be corrupted.'));
 img.src = e.target.result;
 };
 reader.readAsDataURL(file);
 });
}

// Crop an image using pixel coordinates from the original image.
// crop = { x, y, width, height } in source image pixels
// resize = { width, height } | null (optional output dimensions)
// format = 'image/png' | 'image/jpeg' | 'image/webp'
// quality = 0..1 (ignored for PNG)
export async function cropImage(image, crop, resize, format = 'image/png', quality = 0.92) {
 if (!image || !image.naturalWidth) throw new Error('No image loaded.');
 if (!crop || crop.width <= 0 || crop.height <= 0) {
 throw new Error('Invalid crop area.');
 }

 // Clamp crop to image bounds
 const x = Math.max(0, Math.floor(crop.x));
 const y = Math.max(0, Math.floor(crop.y));
 const width = Math.min(Math.floor(crop.width), image.naturalWidth - x);
 const height = Math.min(Math.floor(crop.height), image.naturalHeight - y);

 if (width <= 0 || height <= 0) throw new Error('Crop area is outside the image.');

 const outputW = resize && resize.width ? Math.max(1, Math.floor(resize.width)) : width;
 const outputH = resize && resize.height ? Math.max(1, Math.floor(resize.height)) : height;

 const canvas = document.createElement('canvas');
 canvas.width = outputW;
 canvas.height = outputH;
 const ctx = canvas.getContext('2d');
 if (!ctx) throw new Error('Canvas is not supported in this browser.');

 // High-quality scaling
 ctx.imageSmoothingEnabled = true;
 ctx.imageSmoothingQuality = 'high';

 ctx.drawImage(image, x, y, width, height, 0, 0, outputW, outputH);

 const mime = ['image/png', 'image/jpeg', 'image/webp'].includes(format) ? format : 'image/png';
 const q = mime === 'image/png' ? undefined : Math.min(1, Math.max(0.1, Number(quality) || 0.92));

 const blob = await new Promise((resolve, reject) => {
 canvas.toBlob(
 (b) => (b ? resolve(b) : reject(new Error('Failed to encode image.'))),
 mime,
 q
 );
 });

 const dataUrl = canvas.toDataURL(mime, q);

 return {
 blob,
 dataUrl,
 width: outputW,
 height: outputH,
 format: mime,
 size: blob.size,
 };
}

// Trigger a browser download for a Blob with a chosen filename.
export function downloadBlob(blob, filename) {
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = filename || 'image.png';
 document.body.appendChild(a);
 a.click();
 document.body.removeChild(a);
 setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Format a byte count into a human-readable string (e.g. 1.4 MB).
export function formatBytes(bytes) {
 if (!bytes || bytes < 0) return '0 B';
 const units = ['B', 'KB', 'MB', 'GB'];
 let i = 0;
 let value = bytes;
 while (value >= 1024 && i < units.length - 1) {
 value /= 1024;
 i++;
 }
 return `${value.toFixed(value >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}
