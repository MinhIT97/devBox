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

window.devToolkitApp = function devToolkitApp() {
    return {
        tools: [
            { id: 'json',     icon: '{}', title: 'JSON Formatter',      description: 'Format, minify & validate JSON with Monaco Editor.' },
            { id: 'case',     icon: 'Aa', title: 'Case Converter',       description: 'Convert text into camelCase, snake_case, PascalCase and more.' },
            { id: 'constant', icon: '#',  title: 'Constant Generator',   description: 'Generate PHP consts, PHP enums, JS objects & TS enums.' },
            { id: 'bem',      icon: '[]', title: 'BEM Generator',        description: 'Generate BEM CSS class names with matching HTML snippet.' },
        ],
        activeTool: loadFromLocalStorage('dev-toolkit.active-tool', 'json'),
        dark: loadFromLocalStorage('dev-toolkit.theme', 'dark') !== 'light',
        toast: '',
        toastTimer: null,
        editors: {},
        editorsLoading: false,
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

        init() {
            document.documentElement.classList.toggle('dark', this.dark);
            this.convertCase();
            this.generateConstant();
            this.generateBem();
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

        formatJson() {
            this.runJsonTransform(formatJson, 'Formatted JSON successfully.');
        },

        minifyJson() {
            this.runJsonTransform(minifyJson, 'Minified JSON successfully.');
        },

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
                const output = transformer(this.json.input);
                this.json.output = output;
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
            if (!this.json.output) {
                return;
            }

            this.json.input = this.json.output;
            this.json.output = '';
            this.persistJsonInput();
        },

        copyJsonOutput() {
            this.copy(this.json.output);
        },

        persistJsonInput() {
            saveToLocalStorage('dev-toolkit.json.input', this.json.input);
        },

        persistCaseInput() {
            saveToLocalStorage('dev-toolkit.case.input', this.caseTool.input);
            this.convertCase();
        },

        convertCase() {
            this.caseTool.rows = convertCases(this.caseTool.input);
        },

        copyCaseOutput() {
            this.copy(serializeCaseRows(this.caseTool.rows));
        },

        persistConstantInput() {
            saveToLocalStorage('dev-toolkit.constant.input', this.constantTool.input);
            this.generateConstant();
        },

        saveConstantMode() {
            saveToLocalStorage('dev-toolkit.constant.mode', this.constantTool.mode);
        },

        generateConstant() {
            this.constantTool.output = generateConstants(this.constantTool.input, this.constantTool.mode);
        },

        copyConstantOutput() {
            this.copy(this.constantTool.output);
        },

        persistBemInput() {
            saveToLocalStorage('dev-toolkit.bem.block', this.bemTool.block);
            saveToLocalStorage('dev-toolkit.bem.element', this.bemTool.element);
            saveToLocalStorage('dev-toolkit.bem.modifier', this.bemTool.modifier);
            this.generateBem();
        },

        generateBem() {
            this.bemTool.output = generateBem(this.bemTool);
        },

        copyBemOutput() {
            this.copy(this.bemTool.output);
        },

        clearInput(toolId) {
            if (toolId === 'json') {
                this.json.input = '';
                this.json.output = '';
                saveToLocalStorage('dev-toolkit.json.input', '');
                this.json.error = false;
                this.json.message = 'Input cleared.';
            }

            if (toolId === 'case') {
                this.caseTool.input = '';
                this.persistCaseInput();
            }

            if (toolId === 'constant') {
                this.constantTool.input = '';
                this.persistConstantInput();
            }

            if (toolId === 'bem') {
                this.bemTool.block = '';
                this.bemTool.element = '';
                this.bemTool.modifier = '';
                this.persistBemInput();
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
