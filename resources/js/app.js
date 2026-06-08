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
            color: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.35843 19.5 5.25302 20.3129 4.67323 20.612C3.86477 21.0292 3 21.4398 3 22H12Z"/><circle cx="7.5" cy="10.5" r="1.5"/><circle cx="11.5" cy="7.5" r="1.5"/><circle cx="16.5" cy="9.5" r="1.5"/><circle cx="15.5" cy="14.5" r="1.5"/></svg>`
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
        },
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

            // Set live epoch timer
            setInterval(() => {
                this.epochTool.currentEpoch = Math.floor(Date.now() / 1000);
            }, 1000);
        },

        currentTool() {
            return this.tools.find((tool) => tool.id === this.activeTool) ?? null;
        },

        selectTool(toolId) {
            this.activeTool = toolId;
            this.toolSearch = '';
            this.filterTools();
            saveToLocalStorage('dev-toolkit.active-tool', toolId || '');
        },

        // Tool search & filter
        filterTools() {
            const query = (this.toolSearch || '').toLowerCase().trim();
            const formatterIds = ['json', 'html', 'diff', 'case', 'constant', 'bem'];
            const converterIds = ['base64', 'url', 'jwt', 'uuid', 'epoch', 'regex', 'color'];

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
