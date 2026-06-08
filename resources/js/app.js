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
} from './tools/additionalTools';

window.devToolkitApp = function devToolkitApp() {
    return {
        tools: [
            { id: 'json',     icon: '{}', title: 'JSON Formatter',      description: 'Format, minify & validate JSON.' },
            { id: 'case',     icon: 'Aa', title: 'Case Converter',       description: 'Convert text between camel, snake, kebab, Pascal, etc.' },
            { id: 'constant', icon: '#',  title: 'Constant Gen',         description: 'Generate PHP consts, PHP enums, JS objects, TS enums.' },
            { id: 'bem',      icon: '[]', title: 'BEM Generator',        description: 'Generate BEM CSS classes with HTML snippets.' },
            { id: 'base64',   icon: '🔒', title: 'Base64 Tool',          description: 'Encode and decode Base64 strings.' },
            { id: 'url',      icon: '🔗', title: 'URL Tool',             description: 'Encode and decode URL-safe strings.' },
            { id: 'jwt',      icon: '🎫', title: 'JWT Decoder',          description: 'Decode and inspect JSON Web Tokens.' },
            { id: 'diff',     icon: '📊', title: 'Diff Checker',         description: 'Compare text differences line-by-line.' },
            { id: 'uuid',     icon: '🔑', title: 'UUID & Key Gen',       description: 'Generate UUID v4 & random password keys.' },
            { id: 'html',     icon: '🌐', title: 'HTML Formatter',       description: 'Format or minify HTML/XML documents.' },
            { id: 'epoch',    icon: '⏰', title: 'Epoch Converter',      description: 'Convert Unix timestamp to human datetime.' },
            { id: 'regex',    icon: '🔍', title: 'Regex Tester',         description: 'Match patterns against test text.' },
            { id: 'color',    icon: '🎨', title: 'Color Converter',      description: 'Convert HEX, RGB, HSL and preview colors.' },
        ],
        activeTool: loadFromLocalStorage('dev-toolkit.active-tool', 'json'),
        dark: loadFromLocalStorage('dev-toolkit.theme', 'dark') !== 'light',
        toast: '',
        toastTimer: null,
        
        json: {
            input: loadFromLocalStorage('dev-toolkit.json.input', '{\n  "hello": "world"\n}'),
            output: '',
            message: 'Paste JSON then choose Format, Minify or Validate.',
            error: false,
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
            epochOutput: '',
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

        init() {
            document.documentElement.classList.toggle('dark', this.dark);
            
            // Initial executions
            this.convertCase();
            this.generateConstant();
            this.generateBem();
            this.runDiff();
            this.runRegex();
            this.runColor();
            this.runEpochToDate();
            this.runDateToEpoch();
            
            // Set live epoch timer
            setInterval(() => {
                this.epochTool.currentEpoch = Math.floor(Date.now() / 1000);
            }, 1000);
        },

        currentTool() {
            return this.tools.find((tool) => tool.id === this.activeTool) ?? this.tools[0];
        },

        selectTool(toolId) {
            this.activeTool = toolId;
            saveToLocalStorage('dev-toolkit.active-tool', toolId);
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
                this.epochTool.epochOutput = `Format: ${result.custom}\nISO:    ${result.iso}\nUTC:    ${result.utc}\nLocal:  ${result.local}`;
            } catch (e) {
                this.epochTool.epochOutput = e.message;
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
