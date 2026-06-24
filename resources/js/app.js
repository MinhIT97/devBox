import './bootstrap';
import Alpine from 'alpinejs';
import { convertCases, serializeCaseRows } from './tools/caseConverter';
import { generateBem } from './tools/bemGenerator';
import { generateConstants } from './tools/constantGenerator';
import { formatJson, minifyJson, validateJson } from './tools/jsonTool';
import {
    copyToClipboard,
    loadFromLocalStorage,
    saveToLocalStorage,
} from './tools/helpers';
import {
    encodeBase64,
    decodeBase64,
    encodeUrl,
    decodeUrl,
    decodeJwt,
    computeDiff,
    generateUuid,
    generatePassword,
    formatHtml,
    minifyHtml,
    epochToDate,
    dateToEpoch,
    testRegex,
    parseColor,
    formatSql,
    minifySql,
    lookupIp,
    generateAllHashes,
    generateQrCode,
    generateLorem,
    yamlToJson,
    jsonToYaml,
    decodeCertificate,
 loadImageFromFile,
 cropImage,
 downloadBlob,
 formatBytes,
} from './tools/additionalTools';

window.devToolkitApp = function devToolkitApp() {
    return {
        icons: {
            json: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,
            case: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4-10 4 10"/><path d="M4.5 12h5"/><path d="M15 16V9a3 3 0 0 1 6 0v7"/><path d="M21 12h-6"/></svg>`,
            constant: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
            bem: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="9" y1="12" x2="21" y2="12"/></svg>`,
            base64: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
            url: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
            jwt: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="15" x2="7.01" y2="15"/><line x1="12" y1="15" x2="13.01" y2="15"/></svg>`,
            diff: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M5 12h4"/><path d="M15 12h4"/><path d="M17 10v4"/></svg>`,
            uuid: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6"/></svg>`,
            html: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="4" x2="10" y2="20"/></svg>`,
            epoch: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
            regex: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>`,
            color: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35843 19.5 5.25302 20.3129 4.67323 20.612C3.86477 21.0292 3 21.4398 3 22H12Z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="11.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="9.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>`,
            sql: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 6v6c0 1.66 4 3 9 3s9-1.34 9-3V6"/><path d="M3 12v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>`,
            ip: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
            hash: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="5"/></svg>`,
            qrcode: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="17" y="17" width="1.5" height="1.5"/><rect x="20.5" y="17" width="1.5" height="1.5"/><rect x="14" y="17" width="1.5" height="1.5"/><rect x="17" y="14" width="1.5" height="1.5"/><rect x="20.5" y="20.5" width="1.5" height="1.5"/></svg>`,
            lorem: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
            yaml: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 9H8v6h2"/><path d="M16 13h-4l4-4v6"/></svg>`,
            cert: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
 cropper: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v4H2"/><path d="M18 2v4h4"/><path d="M22 18v4h-4"/><path d="M2 18v4h4"/><circle cx="12" cy="12" r="3"/></svg>`,
        },
        tools: [
            { id: 'json',     title: 'JSON Formatter',      description: 'Format, minify & validate JSON.' },
            { id: 'case',     title: 'Case Converter',       description: 'Convert text between camel, snake, kebab, Pascal, etc.' },
            { id: 'constant', title: 'Constant Gen',         description: 'Generate PHP consts, PHP enums, JS objects, TS enums.' },
            { id: 'bem',      title: 'BEM Generator',        description: 'Generate BEM CSS classes with HTML snippets.' },
            { id: 'base64',   title: 'Base64 Tool',          description: 'Encode and decode Base64 strings.' },
            { id: 'url',      title: 'URL Tool',             description: 'Encode and decode URL-safe strings.' },
            { id: 'jwt',      title: 'JWT Decoder',          description: 'Decode and inspect JSON Web Tokens.' },
            { id: 'diff',     title: 'Diff Checker',         description: 'Compare text differences line-by-line.' },
            { id: 'uuid',     title: 'UUID & Key Gen',       description: 'Generate UUID v4 & random password keys.' },
            { id: 'html',     title: 'HTML Formatter',       description: 'Format or minify HTML/XML documents.' },
            { id: 'epoch',    title: 'Epoch Converter',      description: 'Convert Unix timestamp to human datetime.' },
            { id: 'regex',    title: 'Regex Tester',         description: 'Match patterns against test text.' },
            { id: 'color',    title: 'Color Converter',      description: 'Convert HEX, RGB, HSL and preview colors.' },
            { id: 'sql',      title: 'SQL Formatter',        description: 'Format & minify SQL queries with syntax highlighting.' },
            { id: 'ip',       title: 'IP / Geo Lookup',      description: 'Look up IP geolocation, ISP, and timezone info.' },
            { id: 'hash',     title: 'Hash Generator',       description: 'Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes.' },
            { id: 'qrcode',   title: 'QR Code Generator',    description: 'Generate QR codes from any text or URL.' },
            { id: 'lorem',    title: 'Lorem Ipsum Gen',      description: 'Generate placeholder text for mockups and designs.' },
            { id: 'yaml',     title: 'YAML ↔ JSON',          description: 'Convert between YAML and JSON formats.' },
            { id: 'cert',     title: 'Certificate Decoder',  description: 'Decode X.509 certificates and view their details.' },
 { id: 'cropper', title: 'Image Cropper', description: 'Crop, resize, and export images in PNG/JPG/WebP.' },
        ],
        activeTool: loadFromLocalStorage('dev-toolkit.active-tool', null),
        toolSearch: '',
        filteredFormatterTools: [],
        filteredConverterTools: [],
        toolHeaderIcons: {
            json: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>`,
            case: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4-10 4 10"/><path d="M4.5 12h5"/><path d="M15 16V9a3 3 0 0 1 6 0v7"/><path d="M21 12h-6"/></svg>`,
            constant: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
            bem: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="9" y1="12" x2="21" y2="12"/></svg>`,
            base64: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
            url: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
            jwt: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="15" x2="7.01" y2="15"/><line x1="12" y1="15" x2="13.01" y2="15"/></svg>`,
            diff: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M5 12h4"/><path d="M15 12h4"/><path d="M17 10v4"/></svg>`,
            uuid: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 1.5 1.5M15.5 7.5 14 6"/></svg>`,
            html: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="4" x2="10" y2="20"/></svg>`,
            epoch: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
            regex: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M8 11h6"/><path d="M11 8v6"/></svg>`,
            color: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35843 19.5 5.25302 20.3129 4.67323 20.612C3.86477 21.0292 3 21.4398 3 22H12Z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="11.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="9.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>`,
            sql: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 6v6c0 1.66 4 3 9 3s9-1.34 9-3V6"/><path d="M3 12v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/></svg>`,
            ip: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
            hash: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="5"/></svg>`,
            qrcode: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="17" y="17" width="1.5" height="1.5"/><rect x="20.5" y="17" width="1.5" height="1.5"/><rect x="14" y="17" width="1.5" height="1.5"/><rect x="17" y="14" width="1.5" height="1.5"/><rect x="20.5" y="20.5" width="1.5" height="1.5"/></svg>`,
            lorem: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
            yaml: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M10 9H8v6h2"/><path d="M16 13h-4l4-4v6"/></svg>`,
            cert: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
 cropper: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2v4H2"/><path d="M18 2v4h4"/><path d="M22 18v4h-4"/><path d="M2 18v4h4"/><circle cx="12" cy="12" r="3"/></svg>`,
        },
        toolInfoTips: {
            json: {
                what: 'JSON (JavaScript Object Notation) is the universal data format for APIs, configs, and data exchange.',
                tip: 'Use <strong>Format</strong> to pretty-print minified JSON responses. <strong>Validate</strong> catches trailing commas, unquoted keys, and other common syntax errors before they cause bugs.',
            },
            case: {
                what: 'Naming conventions keep your codebase consistent. Different languages and frameworks prefer different styles.',
                tip: 'JavaScript/TypeScript uses <strong>camelCase</strong>, Python uses <strong>snake_case</strong>, CSS uses <strong>kebab-case</strong>, and constants are <strong>UPPER_SNAKE</strong>. Copy-paste between them instantly.',
            },
            constant: {
                what: 'Turn a list of values into typed constants or enums — avoid magic strings scattered across your code.',
                tip: 'Use <strong>PHP enum</strong> for Laravel backed enums with string values. <strong>TypeScript enum</strong> gives you compile-time safety in frontend projects.',
            },
            bem: {
                what: '<strong>BEM</strong> (Block, Element, Modifier) is a CSS naming methodology that makes your stylesheets scalable and maintainable by organizing classes into reusable components.',
                tip: '<strong>Block</strong> is the component root (<code>product-card</code>). <strong>Element</strong> is a child part (<code>product-card__title</code>). <strong>Modifier</strong> is a variant state (<code>product-card--active</code>). This tool auto-generates both the CSS selector and the matching HTML snippet.',
            },
            base64: {
                what: 'Base64 encodes binary data into ASCII text — used everywhere from data URIs to API authentication headers.',
                tip: 'Embed small images directly in CSS/HTML with <code>data:image/png;base64,...</code>. Encode credentials for <strong>Basic Auth</strong> headers. Remember: Base64 is <em>encoding</em>, not encryption.',
            },
            url: {
                what: 'URL encoding (percent-encoding) makes strings safe for URLs by replacing special characters like spaces and ampersands.',
                tip: 'Always <strong>encode</strong> query parameter values before appending them to URLs. <strong>Decode</strong> when reading <code>?redirect=</code> params or parsing webhook payloads.',
            },
            jwt: {
                what: 'JSON Web Tokens carry signed claims between parties. The payload is Base64-encoded, not encrypted — anyone can read it.',
                tip: 'Paste any JWT here to inspect its <strong>header</strong> (algorithm, type) and <strong>payload</strong> (user ID, roles, expiry). Never paste production tokens into untrusted tools — this one runs entirely in your browser.',
            },
            diff: {
                what: 'A line-by-line text comparison tool. Green lines were added, red lines were removed, unchanged lines stay neutral.',
                tip: 'Compare <strong>config files</strong> across environments, spot changes in <strong>error logs</strong> between deploys, or review <strong>code snippets</strong> without firing up a full git diff.',
            },
            uuid: {
                what: 'UUID v4 generates random, globally-unique identifiers. The password generator creates cryptographically random strings for secrets and API keys.',
                tip: 'UUIDs are perfect for <strong>database primary keys</strong> in distributed systems. For passwords, crank the length to <strong>32+ characters</strong> and enable all character sets for maximum entropy.',
            },
            html: {
                what: 'Pretty-print or compress HTML/XML documents. Works with any XML-based markup like SVG, RSS feeds, or sitemaps.',
                tip: 'Use <strong>Format</strong> to debug messy HTML output from WYSIWYG editors or template engines. <strong>Minify</strong> before pasting into email templates where whitespace matters.',
            },
            epoch: {
                what: 'Unix timestamps count seconds since January 1, 1970 (UTC). The universal time format for APIs, databases, and logging systems.',
                tip: 'Most systems use <strong>seconds</strong>, but JavaScript\'s <code>Date.now()</code> returns <strong>milliseconds</strong>. Divide by 1000 before using this tool. The live clock updates every second.',
            },
            regex: {
                what: 'Regular expressions find, match, and extract text patterns — from email validation to log parsing to search-and-replace.',
                tip: 'Use <strong>global (g)</strong> flag to find all matches, <strong>case-insensitive (i)</strong> for case-blind matching. Test your pattern here before shipping it to production validation logic.',
            },
            color: {
                what: 'Convert colors between HEX, RGB, and HSL formats. Click the preview box to open a native color picker.',
                tip: 'HEX is best for CSS. RGB/RGBA for dynamic transparency. HSL is the most human-readable — tweak <strong>Lightness</strong> for hover states and <strong>Saturation</strong> for muted variants. The picker syncs both ways.',
            },
            sql: {
                what: 'Format messy SQL into clean, readable queries. Uppercases keywords, adds line breaks before clauses, and indents for visual hierarchy.',
                tip: 'Paste the output of an ORM query log or a one-liner from a code review. Works with <strong>SELECT, INSERT, UPDATE, DELETE, JOINs, CTEs, window functions</strong> and more. Use <strong>Minify</strong> before embedding in application code.',
            },
            ip: {
                what: 'Look up geolocation data for any IPv4 or IPv6 address — country, city, ISP, timezone, and coordinates.',
                tip: 'Leave the input <strong>empty</strong> to look up your own IP. Useful for debugging CDN routing, verifying VPN connections, or checking where your users are coming from.',
            },
            hash: {
                what: 'Generate cryptographic hash digests from any input text. Supports MD5, SHA-1, SHA-256, SHA-384, and SHA-512.',
                tip: '<strong>SHA-256</strong> is the modern standard for integrity checks. <strong>MD5</strong> and <strong>SHA-1</strong> are fast but cryptographically broken — only use them for checksums, never for passwords.',
            },
            qrcode: {
                what: 'Turn any text or URL into a QR code image. Scan it with your phone camera to instantly open links or read data.',
                tip: 'QR codes can store up to <strong>4,296 alphanumeric characters</strong>. Use them for WiFi credentials, deep links, contact cards, or two-factor auth setup keys.',
            },
            lorem: {
                what: 'Generate Lorem Ipsum placeholder text — the classic dummy text used in design mockups since the 1500s.',
                tip: 'Generate by <strong>words, sentences, or paragraphs</strong>. Use paragraphs for layout testing, sentences for headings, and words for button labels.',
            },
            yaml: {
                what: 'Convert between YAML (human-friendly config format) and JSON (machine-friendly data format) with a single click.',
                tip: 'YAML is the standard for <strong>Docker Compose, GitHub Actions, Kubernetes, Ansible, and CI/CD pipelines</strong>. Convert your existing JSON configs to YAML or vice versa.',
            },
            cert: {
                what: 'Decode X.509 SSL/TLS certificates. Paste a PEM file to extract issuer, subject, validity period, and serial number.',
                tip: 'Use this to check when a certificate <strong>expires</strong>, verify the <strong>issuer</strong>, or debug SSL chain issues. The cert data never leaves your browser.',
            },
 cropper: {
 what: 'Crop, resize, and export images. Everything runs in your browser — your images never leave the device.',
 tip: 'Use <strong>aspect ratios</strong> (1:1, 4:3, 16:9) for social media presets. Enable <strong>Resize</strong> to scale the output. Choose <strong>PNG</strong> for transparency, <strong>JPG</strong> for smaller files, <strong>WebP</strong> for the best of both.',
 },
        },
        showToolInfo: true,
        showMobileMenu: false,
        dark: loadFromLocalStorage('dev-toolkit.theme', 'dark') !== 'light',
        toast: '',
        toastTimer: null,
        
        json: {
            input: loadFromLocalStorage('dev-toolkit.json.input', '{\n  "hello": "world"\n}'),
            output: '',
            message: 'Paste JSON then choose Format, Minify or Validate.',
            error: false,
        },
        jsonShare: {
            loading: false,
            url: '',
            expiresAt: '',
            error: '',
        },
        caseTool: {
            input: loadFromLocalStorage('dev-toolkit.case.input', 'user_name'),
            rows: [],
        },
        constantTool: {
            input: loadFromLocalStorage('dev-toolkit.constant.input', 'pending\napproved\nrejected'),
            mode: loadFromLocalStorage('dev-toolkit.constant.mode', 'php-const'),
            output: '',
        },
        bemTool: {
            block: loadFromLocalStorage('dev-toolkit.bem.block', 'product-card'),
            element: loadFromLocalStorage('dev-toolkit.bem.element', 'title'),
            modifier: loadFromLocalStorage('dev-toolkit.bem.modifier', 'active'),
            output: '',
        },
        base64: {
            input: loadFromLocalStorage('dev-toolkit.base64.input', 'Hello World'),
            output: '',
            error: false,
            message: '',
        },
        urlTool: {
            input: loadFromLocalStorage('dev-toolkit.url.input', 'https://example.com/?query=hello world'),
            output: '',
            error: false,
            message: '',
        },
        jwtTool: {
            input: loadFromLocalStorage('dev-toolkit.jwt.input', ''),
            header: '',
            payload: '',
            error: false,
            message: 'Paste your JWT token to decode.',
        },
        diffTool: {
            textA: loadFromLocalStorage('dev-toolkit.diff.textA', 'Hello World\nThis is original text\nNo changes here'),
            textB: loadFromLocalStorage('dev-toolkit.diff.textB', 'Hello World!\nThis is modified text\nNo changes here'),
            result: [],
        },
        uuidTool: {
            uuidCount: 5,
            passwordLength: 16,
            useUppercase: true,
            useNumbers: true,
            useSymbols: true,
            uuidOutput: '',
            passwordOutput: '',
        },
        htmlTool: {
            input: loadFromLocalStorage('dev-toolkit.html.input', '<div class="card"><h1>Hello World</h1><p>Description</p></div>'),
            output: '',
            error: false,
            message: 'Paste HTML/XML code then format or minify.',
        },
        epochTool: {
            currentEpoch: Math.floor(Date.now() / 1000),
            epochInput: Math.floor(Date.now() / 1000),
            outputs: null,
            error: false,
            errorMessage: '',
            dateInput: new Date().toISOString().slice(0, 19),
            dateOutput: '',
        },
        regexTool: {
            pattern: loadFromLocalStorage('dev-toolkit.regex.pattern', '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b'),
            flags: 'g',
            testText: loadFromLocalStorage('dev-toolkit.regex.testText', 'Contact us at info@example.com or support@company.org'),
            matches: [],
            error: false,
            message: '',
        },
        colorTool: {
            input: loadFromLocalStorage('dev-toolkit.color.input', '#06b6d4'),
            hex: '',
            rgb: '',
            hsl: '',
            error: false,
            message: '',
        },

        // ── New Tools ──
        sqlTool: {
            input: loadFromLocalStorage('dev-toolkit.sql.input', 'select id, name, email from users where status = 1 order by created_at desc limit 10'),
            output: '',
            error: false,
            message: 'Paste a SQL query then Format or Minify.',
        },
        ipTool: {
            input: '',
            result: null,
            loading: false,
            error: '',
        },
        hashTool: {
            input: loadFromLocalStorage('dev-toolkit.hash.input', 'Hello World'),
            results: null,
            loading: false,
        },
        qrTool: {
            input: loadFromLocalStorage('dev-toolkit.qr.input', 'https://toolkit.minhnv.work'),
            size: 256,
            imageUrl: '',
        },
        loremTool: {
            type: 'paragraphs',
            count: 3,
            output: '',
        },
        yamlTool: {
            yamlInput: loadFromLocalStorage('dev-toolkit.yaml.input', 'name: My App\nversion: "1.0"\nserver:\n  port: 8080\n  host: 0.0.0.0'),
            jsonInput: '',
            error: false,
            message: 'Convert YAML → JSON or paste JSON to convert back.',
        },
        certTool: {
            input: '',
            result: null,
            error: '',
        },

         cropperTool: {
             inputName: '',
             imageSrc: '',
             naturalWidth: 0,
             naturalHeight: 0,
             aspectRatio: 'free',
             crop: { x: 0, y: 0, width: 0, height: 0 },
             outputFormat: 'image/png',
             quality: 92,
             resizeEnabled: false,
             resizeWidth: 0,
             resizeHeight: 0,
             result: null,
             processing: false,
             error: '',
             message: 'Upload an image to start cropping.',
         },

        init() {
            document.documentElement.classList.toggle('dark', this.dark);

            // Initialize tool filters
            this.filterTools();

            // Initial executions for all tools
            this.convertCase();
            this.generateConstant();
            this.generateBem();
            this.runDiff();
            this.runRegex();
            this.runColor();
            this.runEpochToDate();
            this.runDateToEpoch();
            this.runQrCode();
            this.runHash();

            // Set live epoch timer
            setInterval(() => {
                this.epochTool.currentEpoch = Math.floor(Date.now() / 1000);
            }, 1000);

            // Auto-load shared JSON from URL ?share=
            const params = new URLSearchParams(window.location.search);
            const shareSlug = params.get('share');
            if (shareSlug) {
                this.selectTool('json');
                this.loadSharedJson(shareSlug);
                // Xoá query param khỏi URL mà không reload
                window.history.replaceState({}, '', window.location.pathname);
            }
        },

        currentTool() {
            return this.tools.find((tool) => tool.id === this.activeTool) ?? null;
        },

        currentToolInfo() {
            if (!this.activeTool) return null;
            return this.toolInfoTips[this.activeTool] ?? null;
        },

        toggleToolInfo() {
            this.showToolInfo = !this.showToolInfo;
        },

        selectTool(toolId) {
            this.activeTool = toolId;
            this.toolSearch = '';
            this.filterTools();
            this.showMobileMenu = false;
            saveToLocalStorage('dev-toolkit.active-tool', toolId || '');
        },

        // Tool search & filter
        filterTools() {
            const query = (this.toolSearch || '').toLowerCase().trim();
            const formatterIds = ['json', 'html', 'diff', 'case', 'constant', 'bem', 'sql'];
            const converterIds = ['base64', 'url', 'jwt', 'uuid', 'epoch', 'regex', 'color', 'ip', 'hash', 'qrcode', 'lorem', 'yaml', 'cert', 'cropper'];

            const match = (tool) => {
                if (!query) return true;
                return tool.title.toLowerCase().includes(query) ||
                       tool.description.toLowerCase().includes(query) ||
                       tool.id.toLowerCase().includes(query);
            };

            this.filteredFormatterTools = this.tools.filter(t => formatterIds.includes(t.id) && match(t));
            this.filteredConverterTools = this.tools.filter(t => converterIds.includes(t.id) && match(t));
        },

        // Keyboard shortcuts (plain text — rendered via x-text)
        getKeyboardHints() {
            const tool = this.currentTool();
            if (!tool) return '';
            const hints = {
                json:     'Ctrl+Enter  Format',
                case:     'Ctrl+Enter  Convert',
                constant: 'Ctrl+Enter  Generate',
                bem:      'Ctrl+Enter  Generate',
                base64:   'Ctrl+Enter  Encode',
                url:      'Ctrl+Enter  Encode',
                jwt:      'Ctrl+Enter  Decode',
                diff:     'Ctrl+Enter  Compare',
                uuid:     'Ctrl+Enter  Generate UUIDs',
                html:     'Ctrl+Enter  Format',
                epoch:    '',
                regex:    'Ctrl+Enter  Test Match',
                color:    '',
                sql:      'Ctrl+Enter  Format',
                ip:       'Enter  Lookup',
                hash:     '',
                qrcode:   '',
                lorem:    'Ctrl+Enter  Generate',
                yaml:     '',
                cert: 'Ctrl+Enter Decode',
 cropper: 'Ctrl+Enter Crop',
            };
            return hints[tool.id] || '';
        },

        handleGlobalKeydown(e) {
            // Ctrl+K or / — focus search
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !this.isInputFocused())) {
                e.preventDefault();
                this.$refs.toolSearchInput.focus();
                return;
            }

            // Escape — clear active tool (go to welcome)
            if (e.key === 'Escape' && !this.isInputFocused() && this.activeTool) {
                e.preventDefault();
                this.activeTool = null;
                saveToLocalStorage('dev-toolkit.active-tool', '');
                return;
            }

            // Ctrl+Enter — trigger primary action
            if (e.ctrlKey && e.key === 'Enter' && this.activeTool && !this.isInputFocused()) {
                e.preventDefault();
                this.triggerPrimaryAction();
                return;
            }
        },

        isInputFocused() {
            const el = document.activeElement;
            return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);
        },

        triggerPrimaryAction() {
            const actions = {
                json: () => this.formatJson(),
                case: () => this.convertCase(),
                constant: () => this.generateConstant(),
                bem: () => this.generateBem(),
                base64: () => this.runBase64Encode(),
                url: () => this.runUrlEncode(),
                jwt: () => this.runJwtDecode(),
                diff: () => this.runDiff(),
                uuid: () => this.generateUuids(),
                html: () => this.runHtmlFormat(),
                epoch: () => {},
                regex: () => this.runRegex(),
                color: () => {},
                sql: () => this.runSqlFormat(),
                ip: () => this.runIpLookup(),
                hash: () => this.runHash(),
                qrcode: () => this.runQrCode(),
                lorem: () => this.generateLorem(),
                yaml: () => this.runYamlToJson(),
                cert: () => this.runCertDecode(),
                cropper: () => this.runCropImage(),
 };
            const action = actions[this.activeTool];
            if (action) {
                action();
                this.showToast('Action triggered!');
            }
        },

        toggleTheme() {
            this.dark = !this.dark;
            document.documentElement.classList.toggle('dark', this.dark);
            saveToLocalStorage('dev-toolkit.theme', this.dark ? 'dark' : 'light');
        },

        // JSON Tool
        formatJson() { this.runJsonTransform(formatJson, 'Formatted JSON successfully.'); },
        minifyJson() { this.runJsonTransform(minifyJson, 'Minified JSON successfully.'); },
        validateJson() {
            try {
                validateJson(this.json.input);
                this.json.error = false;
                this.json.message = 'Valid JSON.';
            } catch (error) {
                this.showJsonError(error);
            }
        },
        runJsonTransform(transformer, successMessage) {
            try {
                this.json.output = transformer(this.json.input);
                this.json.error = false;
                this.json.message = successMessage;
            } catch (error) {
                this.showJsonError(error);
            }
        },
        showJsonError(error) {
            this.json.error = true;
            this.json.message = `Invalid JSON: ${error.message}`;
        },
        swapJson() {
            if (!this.json.output) return;
            this.json.input = this.json.output;
            this.json.output = '';
            this.persistJsonInput();
        },
        copyJsonOutput() { this.copy(this.json.output); },
        persistJsonInput() { saveToLocalStorage('dev-toolkit.json.input', this.json.input); },

        // JSON Share
        async shareJson() {
            const content = this.json.output || this.json.input;
            if (!content.trim()) {
                this.showToast('Không có nội dung để share!');
                return;
            }
            this.jsonShare.loading = true;
            this.jsonShare.url = '';
            this.jsonShare.error = '';
            try {
                const res = await fetch('/api/json/share', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ content }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Lỗi server');
                this.jsonShare.url = data.url;
                this.jsonShare.expiresAt = data.expires_at;
                // Auto-copy link vào clipboard
                copyToClipboard(data.url, () => {});
                this.showToast('Link đã được copy!');
            } catch (e) {
                this.jsonShare.error = e.message;
            } finally {
                this.jsonShare.loading = false;
            }
        },
        async loadSharedJson(slug) {
            try {
                const res = await fetch(`/api/json/share/${slug}`, {
                    headers: { 'Accept': 'application/json' },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Link hết hạn');
                this.json.input = data.content;
                this.json.output = '';
                this.json.error = false;
                this.json.message = 'Đã load nội dung từ link chia sẻ.';
                saveToLocalStorage('dev-toolkit.json.input', data.content);
            } catch (e) {
                this.json.error = true;
                this.json.message = e.message;
            }
        },
        copyShareUrl() {
            if (this.jsonShare.url) {
                this.copy(this.jsonShare.url);
            }
        },
        resetShareUrl() {
            this.jsonShare.url = '';
            this.jsonShare.error = '';
        },

        // Case Converter
        persistCaseInput() {
            saveToLocalStorage('dev-toolkit.case.input', this.caseTool.input);
            this.convertCase();
        },
        convertCase() { this.caseTool.rows = convertCases(this.caseTool.input); },
        copyCaseOutput() { this.copy(serializeCaseRows(this.caseTool.rows)); },

        // Constant Generator
        persistConstantInput() {
            saveToLocalStorage('dev-toolkit.constant.input', this.constantTool.input);
            this.generateConstant();
        },
        saveConstantMode() { saveToLocalStorage('dev-toolkit.constant.mode', this.constantTool.mode); },
        generateConstant() { this.constantTool.output = generateConstants(this.constantTool.input, this.constantTool.mode); },
        copyConstantOutput() { this.copy(this.constantTool.output); },

        // BEM Generator
        persistBemInput() {
            saveToLocalStorage('dev-toolkit.bem.block', this.bemTool.block);
            saveToLocalStorage('dev-toolkit.bem.element', this.bemTool.element);
            saveToLocalStorage('dev-toolkit.bem.modifier', this.bemTool.modifier);
            this.generateBem();
        },
        generateBem() { this.bemTool.output = generateBem(this.bemTool); },
        copyBemOutput() { this.copy(this.bemTool.output); },

        // Base64 Tool
        persistBase64Input() { saveToLocalStorage('dev-toolkit.base64.input', this.base64.input); },
        runBase64Encode() {
            try {
                this.base64.output = encodeBase64(this.base64.input);
                this.base64.error = false;
                this.base64.message = 'Encoded successfully.';
            } catch (e) {
                this.base64.error = true;
                this.base64.message = e.message;
            }
        },
        runBase64Decode() {
            try {
                this.base64.output = decodeBase64(this.base64.input);
                this.base64.error = false;
                this.base64.message = 'Decoded successfully.';
            } catch (e) {
                this.base64.error = true;
                this.base64.message = e.message;
            }
        },
        swapBase64() {
            if (!this.base64.output) return;
            this.base64.input = this.base64.output;
            this.base64.output = '';
            this.persistBase64Input();
        },

        // URL Tool
        persistUrlInput() { saveToLocalStorage('dev-toolkit.url.input', this.urlTool.input); },
        runUrlEncode() {
            this.urlTool.output = encodeUrl(this.urlTool.input);
            this.urlTool.error = false;
            this.urlTool.message = 'Encoded successfully.';
        },
        runUrlDecode() {
            try {
                this.urlTool.output = decodeUrl(this.urlTool.input);
                this.urlTool.error = false;
                this.urlTool.message = 'Decoded successfully.';
            } catch (e) {
                this.urlTool.error = true;
                this.urlTool.message = e.message;
            }
        },
        swapUrl() {
            if (!this.urlTool.output) return;
            this.urlTool.input = this.urlTool.output;
            this.urlTool.output = '';
            this.persistUrlInput();
        },

        // JWT Decoder
        persistJwtInput() { saveToLocalStorage('dev-toolkit.jwt.input', this.jwtTool.input); },
        runJwtDecode() {
            try {
                const result = decodeJwt(this.jwtTool.input);
                this.jwtTool.header = result.header;
                this.jwtTool.payload = result.payload;
                this.jwtTool.error = false;
                this.jwtTool.message = 'JWT decoded successfully.';
            } catch (e) {
                this.jwtTool.error = true;
                this.jwtTool.header = '';
                this.jwtTool.payload = '';
                this.jwtTool.message = e.message;
            }
        },

        // Diff Checker
        persistDiffInput() {
            saveToLocalStorage('dev-toolkit.diff.textA', this.diffTool.textA);
            saveToLocalStorage('dev-toolkit.diff.textB', this.diffTool.textB);
            this.runDiff();
        },
        runDiff() {
            this.diffTool.result = computeDiff(this.diffTool.textA, this.diffTool.textB);
        },

        // UUID & Key Gen
        generateUuids() {
            const count = Math.min(Math.max(Number(this.uuidTool.uuidCount), 1), 50);
            const uuids = [];
            for (let i = 0; i < count; i++) {
                uuids.push(generateUuid());
            }
            this.uuidTool.uuidOutput = uuids.join('\n');
            this.showToast('UUIDs generated!');
        },
        generatePasswords() {
            const length = Math.min(Math.max(Number(this.uuidTool.passwordLength), 4), 128);
            this.uuidTool.passwordOutput = generatePassword(
                length,
                this.uuidTool.useUppercase,
                this.uuidTool.useNumbers,
                this.uuidTool.useSymbols
            );
            this.showToast('Password generated!');
        },

        // HTML Formatter
        persistHtmlInput() { saveToLocalStorage('dev-toolkit.html.input', this.htmlTool.input); },
        runHtmlFormat() {
            this.htmlTool.output = formatHtml(this.htmlTool.input);
            this.htmlTool.error = false;
            this.htmlTool.message = 'Formatted HTML/XML successfully.';
        },
        runHtmlMinify() {
            this.htmlTool.output = minifyHtml(this.htmlTool.input);
            this.htmlTool.error = false;
            this.htmlTool.message = 'Minified HTML/XML successfully.';
        },
        swapHtml() {
            if (!this.htmlTool.output) return;
            this.htmlTool.input = this.htmlTool.output;
            this.htmlTool.output = '';
            this.persistHtmlInput();
        },

        // Epoch Converter
        runEpochToDate() {
            try {
                const result = epochToDate(this.epochTool.epochInput);
                this.epochTool.outputs = result;
                this.epochTool.error = false;
            } catch (e) {
                this.epochTool.outputs = null;
                this.epochTool.error = true;
                this.epochTool.errorMessage = e.message;
            }
        },
        runDateToEpoch() {
            try {
                this.epochTool.dateOutput = dateToEpoch(this.epochTool.dateInput);
            } catch (e) {
                this.epochTool.dateOutput = e.message;
            }
        },

        // Regex Tester
        persistRegexInput() {
            saveToLocalStorage('dev-toolkit.regex.pattern', this.regexTool.pattern);
            saveToLocalStorage('dev-toolkit.regex.testText', this.regexTool.testText);
            this.runRegex();
        },
        runRegex() {
            const res = testRegex(this.regexTool.pattern, this.regexTool.flags, this.regexTool.testText);
            this.regexTool.matches = res.matches;
            this.regexTool.error = res.error;
            this.regexTool.message = res.message;
        },

        // Color Converter
        persistColorInput() {
            saveToLocalStorage('dev-toolkit.color.input', this.colorTool.input);
            this.runColor();
        },
        runColor() {
            const res = parseColor(this.colorTool.input);
            if (res.error) {
                this.colorTool.error = true;
                this.colorTool.message = res.message;
                this.colorTool.hex = '';
                this.colorTool.rgb = '';
                this.colorTool.hsl = '';
            } else {
                this.colorTool.error = false;
                this.colorTool.message = 'Color parsed successfully.';
                this.colorTool.hex = res.hex;
                this.colorTool.rgb = res.rgb;
                this.colorTool.hsl = res.hsl;
            }
        },

        // SQL Formatter
        persistSqlInput() { saveToLocalStorage('dev-toolkit.sql.input', this.sqlTool.input); },
        runSqlFormat() {
            try {
                this.sqlTool.output = formatSql(this.sqlTool.input);
                this.sqlTool.error = false;
                this.sqlTool.message = 'SQL formatted successfully.';
            } catch (e) {
                this.sqlTool.error = true;
                this.sqlTool.message = e.message;
            }
        },
        runSqlMinify() {
            this.sqlTool.output = minifySql(this.sqlTool.input);
            this.sqlTool.error = false;
            this.sqlTool.message = 'SQL minified successfully.';
        },
        swapSql() {
            if (!this.sqlTool.output) return;
            this.sqlTool.input = this.sqlTool.output;
            this.sqlTool.output = '';
            this.persistSqlInput();
        },
        copySqlOutput() { this.copy(this.sqlTool.output); },

        // IP Lookup
        async runIpLookup(inputIp) {
            const ip = inputIp !== undefined ? inputIp : this.ipTool.input;
            this.ipTool.loading = true;
            this.ipTool.error = '';
            this.ipTool.result = null;
            try {
                this.ipTool.result = await lookupIp(ip);
            } catch (e) {
                this.ipTool.error = e.message;
            } finally {
                this.ipTool.loading = false;
            }
        },
        copyIp(field) {
            if (this.ipTool.result && this.ipTool.result[field]) {
                this.copy(this.ipTool.result[field]);
            }
        },

        // Hash Generator
        async runHash() {
            if (!this.hashTool.input) return;
            this.hashTool.loading = true;
            this.hashTool.results = null;
            try {
                this.hashTool.results = await generateAllHashes(this.hashTool.input);
            } catch (e) {
                // ignore
            } finally {
                this.hashTool.loading = false;
            }
        },
        copyHash(value) { this.copy(value); },
        persistHashInput() {
            saveToLocalStorage('dev-toolkit.hash.input', this.hashTool.input);
            this.runHash();
        },

        // QR Code
        runQrCode() {
            const text = this.qrTool.input.trim();
            if (!text) { this.qrTool.imageUrl = ''; return; }
            const size = Math.min(Math.max(Number(this.qrTool.size), 128), 1024);
            this.qrTool.imageUrl = generateQrCode(text, size);
        },
        persistQrInput() {
            saveToLocalStorage('dev-toolkit.qr.input', this.qrTool.input);
            this.runQrCode();
        },

        // Lorem Ipsum
        generateLorem() {
            this.loremTool.output = generateLorem(this.loremTool.type, this.loremTool.count);
            this.showToast('Generated!');
        },
        copyLorem() { this.copy(this.loremTool.output); },

        // YAML ↔ JSON
        runYamlToJson() {
            try {
                const json = yamlToJson(this.yamlTool.yamlInput);
                this.yamlTool.jsonInput = json;
                this.yamlTool.error = false;
                this.yamlTool.message = 'YAML → JSON converted successfully.';
            } catch (e) {
                this.yamlTool.error = true;
                this.yamlTool.message = 'YAML parse error: ' + e.message;
            }
        },
        runJsonToYaml() {
            try {
                const yamlStr = jsonToYaml(this.yamlTool.jsonInput);
                this.yamlTool.yamlInput = yamlStr;
                this.yamlTool.error = false;
                this.yamlTool.message = 'JSON → YAML converted successfully.';
            } catch (e) {
                this.yamlTool.error = true;
                this.yamlTool.message = 'JSON parse error: ' + e.message;
            }
        },
        copyYamlOutput() { this.copy(this.yamlTool.yamlInput); },
        copyJsonFromYaml() { this.copy(this.yamlTool.jsonInput); },
        persistYamlInput() {
            saveToLocalStorage('dev-toolkit.yaml.input', this.yamlTool.yamlInput);
        },
        swapYamlJson() {
            const y = this.yamlTool.yamlInput;
            const j = this.yamlTool.jsonInput;
            this.yamlTool.yamlInput = j;
            this.yamlTool.jsonInput = y;
        },

        // Certificate Decoder
        runCertDecode() {
            this.certTool.error = '';
            this.certTool.result = null;
            try {
                this.certTool.result = decodeCertificate(this.certTool.input);
                // Compute fingerprints async
                this.computeCertFingerprints(this.certTool.input);
            } catch (e) {
                this.certTool.error = e.message;
            }
        },
        async computeCertFingerprints(pem) {
            const match = pem.match(/-----BEGIN CERTIFICATE-----([\s\S]*?)-----END CERTIFICATE-----/);
            if (!match) return;
            const binary = atob(match[1].replace(/\s+/g, ''));
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

            try {
                const [sha1, sha256] = await Promise.all([
                    crypto.subtle.digest('SHA-1', bytes),
                    crypto.subtle.digest('SHA-256', bytes),
                ]);
                const toHex = (buf) => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join(':');
                if (this.certTool.result) {
                    this.certTool.result.fingerprintSHA1 = toHex(sha1);
                    this.certTool.result.fingerprintSHA256 = toHex(sha256);
                }
            } catch (e) {
                // ignore
            }
        },

        // Image Cropper
        async onCropperFileChange(event) {
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            await this.loadCropperImage(file);
            event.target.value = '';
        },
        async loadCropperImage(file) {
            this.cropperTool.error = '';
            this.cropperTool.result = null;
            this.cropperTool.message = 'Loading image...';
            try {
                const { image, dataUrl } = await loadImageFromFile(file);
                this.cropperTool.inputName = file.name;
                this.cropperTool.imageSrc = dataUrl;
                this.cropperTool.naturalWidth = image.naturalWidth;
                this.cropperTool.naturalHeight = image.naturalHeight;
                // Default crop = full image
                this.cropperTool.crop = {
                    x: 0,
                    y: 0,
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                };
                this.cropperTool.resizeWidth = image.naturalWidth;
                this.cropperTool.resizeHeight = image.naturalHeight;
                this.cropperTool.message = 'Image loaded. Drag on the canvas to adjust the crop area.';
            } catch (e) {
                this.cropperTool.error = e.message;
                this.cropperTool.message = '';
            }
        },
        setCropperAspect(ratio) {
            this.cropperTool.aspectRatio = ratio;
            this.applyCropperAspect();
        },
        applyCropperAspect() {
            if (!this.cropperTool.imageSrc) return;
            const ratio = this.cropperTool.aspectRatio;
            const W = this.cropperTool.naturalWidth;
            const H = this.cropperTool.naturalHeight;
            let targetRatio = null;
            if (ratio === '1:1') targetRatio = 1;
            else if (ratio === '4:3') targetRatio = 4 / 3;
            else if (ratio === '16:9') targetRatio = 16 / 9;
            else if (ratio === '3:2') targetRatio = 3 / 2;
            else if (ratio === 'free') targetRatio = null;
            if (!targetRatio) {
                // Restore full image as crop
                this.cropperTool.crop = { x: 0, y: 0, width: W, height: H };
                return;
            }
            // Center a largest-fit crop with the chosen aspect ratio
            const imgRatio = W / H;
            let cropW, cropH;
            if (imgRatio > targetRatio) {
                cropH = H;
                cropW = Math.round(H * targetRatio);
            } else {
                cropW = W;
                cropH = Math.round(W / targetRatio);
            }
            this.cropperTool.crop = {
                x: Math.round((W - cropW) / 2),
                y: Math.round((H - cropH) / 2),
                width: cropW,
                height: cropH,
            };
        },
        onCropRectChange(rect) {
            // Clamp to image bounds
            const W = this.cropperTool.naturalWidth;
            const H = this.cropperTool.naturalHeight;
            let x = Math.max(0, Math.min(Number(rect.x) || 0, W - 1));
            let y = Math.max(0, Math.min(Number(rect.y) || 0, H - 1));
            let w = Math.max(1, Math.min(Number(rect.width) || 1, W - x));
            let h = Math.max(1, Math.min(Number(rect.height) || 1, H - y));
            this.cropperTool.crop = { x, y, width: w, height: h };
        },
        setCropperFormat(format) {
            this.cropperTool.outputFormat = format;
        },
        setCropperQuality(value) {
            const v = Math.min(100, Math.max(1, Number(value) || 1));
            this.cropperTool.quality = v;
        },
        setCropperResizeWidth(value) {
            const v = Math.max(1, Math.floor(Number(value) || 1));
            this.cropperTool.resizeWidth = v;
        },
        setCropperResizeHeight(value) {
            const v = Math.max(1, Math.floor(Number(value) || 1));
            this.cropperTool.resizeHeight = v;
        },
        async runCropImage() {
            if (!this.cropperTool.imageSrc) {
                this.cropperTool.error = 'Please upload an image first.';
                return;
            }
            this.cropperTool.processing = true;
            this.cropperTool.error = '';
            this.cropperTool.result = null;
            try {
                // Re-load image to get a fresh HTMLImageElement
                const img = new Image();
                img.src = this.cropperTool.imageSrc;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = () => reject(new Error('Failed to load image for crop.'));
                });
                const resize = this.cropperTool.resizeEnabled
                    ? { width: this.cropperTool.resizeWidth, height: this.cropperTool.resizeHeight }
                    : null;
                const result = await cropImage(
                    img,
                    this.cropperTool.crop,
                    resize,
                    this.cropperTool.outputFormat,
                    this.cropperTool.quality / 100
                );
                this.cropperTool.result = {
                    dataUrl: result.dataUrl,
                    width: result.width,
                    height: result.height,
                    size: result.size,
                    format: result.format,
                };
                this.cropperTool.message = 'Cropped successfully.';
            } catch (e) {
                this.cropperTool.error = e.message;
                this.cropperTool.message = '';
            } finally {
                this.cropperTool.processing = false;
            }
        },
        downloadCroppedImage() {
            if (!this.cropperTool.result) return;
            const extMap = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
            const ext = extMap[this.cropperTool.result.format] || 'png';
            const baseName = (this.cropperTool.inputName || 'image').replace(/\\.[^.]+$/, '');
            const filename = baseName + '-cropped-' + this.cropperTool.result.width + 'x' + this.cropperTool.result.height + '.' + ext;
            // Convert dataURL to blob
            fetch(this.cropperTool.result.dataUrl)
                .then(r => r.blob())
                .then(blob => {
                    downloadBlob(blob, filename);
                    this.showToast('Downloaded ' + filename);
                });
        },
        copyCroppedImage() {
            if (!this.cropperTool.result) return;
            fetch(this.cropperTool.result.dataUrl)
                .then(r => r.blob())
                .then(blob => {
                    if (navigator.clipboard && window.ClipboardItem) {
                        const item = new ClipboardItem({ [blob.type]: blob });
                        return navigator.clipboard.write([item]);
                    }
                    throw new Error('Clipboard image not supported in this browser.');
                })
                .then(() => this.showToast('Image copied to clipboard!'))
                .catch(e => this.showToast(e.message));
        },
        resetCropper() {
            const w = this.cropperTool.naturalWidth;
            const h = this.cropperTool.naturalHeight;
            this.cropperTool.crop = { x: 0, y: 0, width: w, height: h };
            this.cropperTool.result = null;
            this.cropperTool.error = '';
            this.cropperTool.message = this.cropperTool.imageSrc ? 'Image loaded. Drag on the canvas to adjust the crop area.' : 'Upload an image to start cropping.';
        },
        clearCropper() {
            this.cropperTool.inputName = '';
            this.cropperTool.imageSrc = '';
            this.cropperTool.naturalWidth = 0;
            this.cropperTool.naturalHeight = 0;
            this.cropperTool.aspectRatio = 'free';
            this.cropperTool.crop = { x: 0, y: 0, width: 0, height: 0 };
            this.cropperTool.outputFormat = 'image/png';
            this.cropperTool.quality = 92;
            this.cropperTool.resizeEnabled = false;
            this.cropperTool.resizeWidth = 0;
            this.cropperTool.resizeHeight = 0;
            this.cropperTool.result = null;
            this.cropperTool.processing = false;
            this.cropperTool.error = '';
            this.cropperTool.message = 'Upload an image to start cropping.';
        },
        // Clear utilities
        clearInput(toolId) {
            if (toolId === 'json') {
                this.json.input = '';
                this.json.output = '';
                this.persistJsonInput();
                this.json.error = false;
                this.json.message = 'Input cleared.';
            } else if (toolId === 'case') {
                this.caseTool.input = '';
                this.persistCaseInput();
            } else if (toolId === 'constant') {
                this.constantTool.input = '';
                this.persistConstantInput();
            } else if (toolId === 'bem') {
                this.bemTool.block = '';
                this.bemTool.element = '';
                this.bemTool.modifier = '';
                this.persistBemInput();
            } else if (toolId === 'base64') {
                this.base64.input = '';
                this.base64.output = '';
                this.persistBase64Input();
                this.base64.error = false;
                this.base64.message = '';
            } else if (toolId === 'url') {
                this.urlTool.input = '';
                this.urlTool.output = '';
                this.persistUrlInput();
                this.urlTool.error = false;
                this.urlTool.message = '';
            } else if (toolId === 'jwt') {
                this.jwtTool.input = '';
                this.jwtTool.header = '';
                this.jwtTool.payload = '';
                this.persistJwtInput();
                this.jwtTool.error = false;
                this.jwtTool.message = '';
            } else if (toolId === 'diff') {
                this.diffTool.textA = '';
                this.diffTool.textB = '';
                this.persistDiffInput();
            } else if (toolId === 'html') {
                this.htmlTool.input = '';
                this.htmlTool.output = '';
                this.persistHtmlInput();
                this.htmlTool.error = false;
                this.htmlTool.message = '';
            } else if (toolId === 'regex') {
                this.regexTool.testText = '';
                this.persistRegexInput();
            } else if (toolId === 'color') {
                this.colorTool.input = '';
                this.persistColorInput();
            } else if (toolId === 'sql') {
                this.sqlTool.input = '';
                this.sqlTool.output = '';
                this.persistSqlInput();
                this.sqlTool.error = false;
                this.sqlTool.message = '';
            } else if (toolId === 'ip') {
                this.ipTool.input = '';
                this.ipTool.result = null;
                this.ipTool.error = '';
            } else if (toolId === 'hash') {
                this.hashTool.input = '';
                this.hashTool.results = null;
                this.persistHashInput();
            } else if (toolId === 'qrcode') {
                this.qrTool.input = '';
                this.qrTool.imageUrl = '';
                this.persistQrInput();
            } else if (toolId === 'lorem') {
                this.loremTool.output = '';
            } else if (toolId === 'yaml') {
                this.yamlTool.yamlInput = '';
                this.yamlTool.jsonInput = '';
                this.persistYamlInput();
                this.yamlTool.error = false;
                this.yamlTool.message = '';
            } else if (toolId === 'cert') {
                this.certTool.input = '';
                this.certTool.result = null;
                this.certTool.error = '';
            }
            else if (toolId === 'cropper') {
                this.clearCropper();
            }
        },

        copy(value) {
            copyToClipboard(value, () => this.showToast('Copied!'));
        },

        showToast(message) {
            this.toast = message;
            clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => {
                this.toast = '';
            }, 1600);

        },
    };
};

window.Alpine = Alpine;
Alpine.start();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch(() => {});
}

if ('caches' in window) {
    caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .catch(() => {});
}
