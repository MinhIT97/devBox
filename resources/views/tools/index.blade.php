@extends('layouts.app')

@section('title', 'Dev Toolkit — Daily utilities for developers')

@section('content')
<div x-data="devToolkitApp()" x-init="init()" :class="{ 'light': !dark }" class="app-wrapper">

    {{-- Ambient orbs --}}
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    {{-- ══ SIDEBAR ══ --}}
    <aside class="sidebar">

        {{-- Logo + Header --}}
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="sidebar-logo-icon">
                    <svg class="logo-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                </div>
                <span class="sidebar-title">Dev Toolkit</span>
            </div>
            <p class="sidebar-subtitle">Daily utilities for developers.</p>

            {{-- Theme toggle --}}
            <button
                type="button"
                id="theme-toggle"
                class="theme-btn"
                @click="toggleTheme()"
                :title="dark ? 'Switch to Light mode' : 'Switch to Dark mode'"
                aria-label="Toggle theme"
            >
                <svg x-show="dark" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg x-show="!dark" class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </button>
        </div>

        {{-- Group: Formatters --}}
        <span class="nav-section-label">Formatters</span>
        <nav class="sidebar-nav" aria-label="Formatter tools">
            @php
            $formatters = ['json','html','diff','case','constant','bem'];
            @endphp
            <template x-for="tool in tools.filter(t => ['json','html','diff','case','constant','bem'].includes(t.id))" :key="tool.id">
                <button
                    type="button"
                    class="tool-nav"
                    :class="{ 'tool-nav-active': activeTool === tool.id }"
                    @click="selectTool(tool.id)"
                    :id="'nav-' + tool.id"
                    :aria-current="activeTool === tool.id ? 'page' : null"
                >
                    <span class="nav-title">
                        <span x-html="icons[tool.id]" style="display:inline-flex; align-items:center"></span>
                        <span x-text="tool.title"></span>
                    </span>
                    <span class="nav-desc" x-text="tool.description"></span>
                </button>
            </template>
        </nav>

        {{-- Group: Converters & Generators --}}
        <span class="nav-section-label">Converters & Generators</span>
        <nav class="sidebar-nav" aria-label="Converter tools">
            <template x-for="tool in tools.filter(t => ['base64','url','jwt','uuid','epoch','regex','color'].includes(t.id))" :key="tool.id">
                <button
                    type="button"
                    class="tool-nav"
                    :class="{ 'tool-nav-active': activeTool === tool.id }"
                    @click="selectTool(tool.id)"
                    :id="'nav-' + tool.id"
                    :aria-current="activeTool === tool.id ? 'page' : null"
                >
                    <span class="nav-title">
                        <span x-html="icons[tool.id]" style="display:inline-flex; align-items:center"></span>
                        <span x-text="tool.title"></span>
                    </span>
                    <span class="nav-desc" x-text="tool.description"></span>
                </button>
            </template>
        </nav>

        {{-- Footer --}}
        <div class="sidebar-footer">
            <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Dev Toolkit</span>
            <span class="sidebar-footer-badge">v1.1</span>
        </div>
    </aside>

    {{-- ══ MAIN ══ --}}
    <main class="main-content">
        <div style="max-width:1200px; margin:0 auto">

            {{-- Page header --}}
            <header class="page-header">
                <div>
                    <h1 class="page-title" x-text="currentTool().title"></h1>
                    <p class="page-desc" x-text="currentTool().description"></p>
                </div>

                {{-- Toast --}}
                <div
                    x-show="toast"
                    x-transition:enter="transition ease-out duration-200"
                    x-transition:enter-start="opacity-0 translate-y-1"
                    x-transition:enter-end="opacity-100 translate-y-0"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                    class="toast"
                    role="status"
                    aria-live="polite"
                >
                    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span x-text="toast"></span>
                </div>
            </header>

            {{-- ── JSON Formatter ── --}}
            <section x-show="activeTool === 'json'" x-cloak>
                <div class="toolbar">
                    <button id="json-format-btn"   type="button" class="btn-primary" @click="formatJson()">Format</button>
                    <button id="json-minify-btn"   type="button" class="btn"         @click="minifyJson()">Minify</button>
                    <button id="json-validate-btn" type="button" class="btn"         @click="validateJson()">Validate</button>
                    <button id="json-swap-btn"     type="button" class="btn"         @click="swapJson()">Swap</button>
                    <button id="json-copy-btn"     type="button" class="btn"         @click="copyJsonOutput()">Copy Output</button>
                    <button id="json-clear-btn"    type="button" class="btn-danger"  @click="clearInput('json')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
                            <label class="field-label" for="json-input">Input JSON</label>
                        </div>
                        <textarea
                            id="json-input"
                            class="textarea-shell"
                            x-model="json.input"
                            @input="persistJsonInput()"
                            spellcheck="false"
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="json-output">Output</label>
                        <textarea
                            id="json-output"
                            class="textarea-shell"
                            x-model="json.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>

                <p class="json-status"
                   :class="json.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="json.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── Case Converter ── --}}
            <section x-show="activeTool === 'case'" x-cloak>
                <div class="toolbar">
                    <button id="case-convert-btn" type="button" class="btn-primary" @click="convertCase()">Convert</button>
                    <button id="case-copy-btn"    type="button" class="btn"         @click="copyCaseOutput()">Copy Output</button>
                    <button id="case-clear-btn"   type="button" class="btn-danger"  @click="clearInput('case')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: minmax(0,0.9fr) minmax(0,1.1fr)">
                    <div class="tool-panel">
                        <label class="field-label" for="case-input">Input text</label>
                        <textarea
                            id="case-input"
                            class="textarea-shell"
                            x-model="caseTool.input"
                            @input="persistCaseInput()"
                            placeholder="user_name"
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <span class="field-label">Converted cases</span>
                        <div class="case-output-table">
                            <template x-for="row in caseTool.rows" :key="row.label">
                                <div class="case-output-row">
                                    <span class="case-label" x-text="row.label"></span>
                                    <code class="case-value" x-text="row.value"></code>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            {{-- ── Constant Generator ── --}}
            <section x-show="activeTool === 'constant'" x-cloak>
                <div class="toolbar">
                    <button id="const-generate-btn" type="button" class="btn-primary" @click="generateConstant()">Generate</button>
                    <select id="const-mode-select" class="select-shell" x-model="constantTool.mode" @change="saveConstantMode(); generateConstant()">
                        <option value="php-const">PHP const</option>
                        <option value="php-enum">PHP enum (Laravel)</option>
                        <option value="js-object">JavaScript object</option>
                        <option value="ts-enum">TypeScript enum</option>
                    </select>
                    <button id="const-copy-btn"  type="button" class="btn"        @click="copyConstantOutput()">Copy Output</button>
                    <button id="const-clear-btn" type="button" class="btn-danger" @click="clearInput('constant')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="constant-input">Values — one per line</label>
                        <textarea
                            id="constant-input"
                            class="textarea-shell"
                            x-model="constantTool.input"
                            @input="persistConstantInput()"
                            placeholder="pending&#10;approved&#10;rejected"
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
                            <label class="field-label" for="constant-output">Output</label>
                        </div>
                        <textarea
                            id="constant-output"
                            class="textarea-shell"
                            x-model="constantTool.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>
            </section>

            {{-- ── BEM Generator ── --}}
            <section x-show="activeTool === 'bem'" x-cloak>
                <div class="toolbar">
                    <button id="bem-generate-btn" type="button" class="btn-primary" @click="generateBem()">Generate</button>
                    <button id="bem-copy-btn"     type="button" class="btn"        @click="copyBemOutput()">Copy Output</button>
                    <button id="bem-clear-btn"    type="button" class="btn-danger" @click="clearInput('bem')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: minmax(0,0.75fr) minmax(0,1.25fr)">
                    <div class="tool-panel">
                        <div style="display:flex; flex-direction:column; gap:16px">
                            <label class="block" style="display:block">
                                <span class="field-label">Block</span>
                                <input id="bem-block" class="input-shell" x-model="bemTool.block" @input="persistBemInput()" placeholder="product-card">
                            </label>
                            <label class="block" style="display:block">
                                <span class="field-label">Element</span>
                                <input id="bem-element" class="input-shell" x-model="bemTool.element" @input="persistBemInput()" placeholder="title">
                            </label>
                            <label class="block" style="display:block">
                                <span class="field-label">Modifier</span>
                                <input id="bem-modifier" class="input-shell" x-model="bemTool.modifier" @input="persistBemInput()" placeholder="active">
                            </label>
                        </div>
                    </div>
                    <div class="tool-panel">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
                            <label class="field-label" for="bem-output">Generated output</label>
                        </div>
                        <textarea
                            id="bem-output"
                            class="textarea-shell"
                            x-model="bemTool.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>
            </section>

            {{-- ── Base64 Tool ── --}}
            <section x-show="activeTool === 'base64'" x-cloak>
                <div class="toolbar">
                    <button id="base64-encode-btn" type="button" class="btn-primary" @click="runBase64Encode()">Encode</button>
                    <button id="base64-decode-btn" type="button" class="btn"         @click="runBase64Decode()">Decode</button>
                    <button id="base64-swap-btn"   type="button" class="btn"         @click="swapBase64()">Swap</button>
                    <button id="base64-copy-btn"   type="button" class="btn"         @click="copy(base64.output)">Copy Output</button>
                    <button id="base64-clear-btn"  type="button" class="btn-danger"  @click="clearInput('base64')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="base64-input">Input text / Base64</label>
                        <textarea
                            id="base64-input"
                            class="textarea-shell"
                            x-model="base64.input"
                            @input="persistBase64Input()"
                            placeholder="Enter text to encode or Base64 to decode..."
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="base64-output">Output</label>
                        <textarea
                            id="base64-output"
                            class="textarea-shell"
                            x-model="base64.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>

                <p class="json-status"
                   x-show="base64.message"
                   :class="base64.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="base64.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── URL Tool ── --}}
            <section x-show="activeTool === 'url'" x-cloak>
                <div class="toolbar">
                    <button id="url-encode-btn" type="button" class="btn-primary" @click="runUrlEncode()">Encode</button>
                    <button id="url-decode-btn" type="button" class="btn"         @click="runUrlDecode()">Decode</button>
                    <button id="url-swap-btn"   type="button" class="btn"         @click="swapUrl()">Swap</button>
                    <button id="url-copy-btn"   type="button" class="btn"         @click="copy(urlTool.output)">Copy Output</button>
                    <button id="url-clear-btn"  type="button" class="btn-danger"  @click="clearInput('url')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="url-input">Input URL / string</label>
                        <textarea
                            id="url-input"
                            class="textarea-shell"
                            x-model="urlTool.input"
                            @input="persistUrlInput()"
                            placeholder="Enter URL or query parameters..."
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="url-output">Output</label>
                        <textarea
                            id="url-output"
                            class="textarea-shell"
                            x-model="urlTool.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>

                <p class="json-status"
                   x-show="urlTool.message"
                   :class="urlTool.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="urlTool.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── JWT Decoder ── --}}
            <section x-show="activeTool === 'jwt'" x-cloak>
                <div class="toolbar">
                    <button id="jwt-decode-btn" type="button" class="btn-primary" @click="runJwtDecode()">Decode</button>
                    <button id="jwt-copy-header-btn"  type="button" class="btn" @click="copy(jwtTool.header)">Copy Header</button>
                    <button id="jwt-copy-payload-btn" type="button" class="btn" @click="copy(jwtTool.payload)">Copy Payload</button>
                    <button id="jwt-clear-btn"  type="button" class="btn-danger"  @click="clearInput('jwt')">Clear</button>
                </div>

                <div style="display:flex; flex-direction:column; gap:16px">
                    <div class="tool-panel">
                        <label class="field-label" for="jwt-input">JWT Token</label>
                        <textarea
                            id="jwt-input"
                            class="textarea-shell"
                            style="min-height: 120px"
                            x-model="jwtTool.input"
                            @input="persistJwtInput()"
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        ></textarea>
                    </div>
                    <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                        <div class="tool-panel">
                            <label class="field-label" for="jwt-header">Header (Decoded)</label>
                            <textarea
                                id="jwt-header"
                                class="textarea-shell"
                                style="min-height: 250px"
                                x-model="jwtTool.header"
                                readonly
                                spellcheck="false"
                            ></textarea>
                        </div>
                        <div class="tool-panel">
                            <label class="field-label" for="jwt-payload">Payload (Decoded)</label>
                            <textarea
                                id="jwt-payload"
                                class="textarea-shell"
                                style="min-height: 250px"
                                x-model="jwtTool.payload"
                                readonly
                                spellcheck="false"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <p class="json-status"
                   x-show="jwtTool.message"
                   :class="jwtTool.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="jwtTool.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── Diff Checker ── --}}
            <section x-show="activeTool === 'diff'" x-cloak>
                <div class="toolbar">
                    <button id="diff-compare-btn" type="button" class="btn-primary" @click="runDiff()">Compare</button>
                    <button id="diff-clear-btn"   type="button" class="btn-danger"  @click="clearInput('diff')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="diff-textA">Original Text</label>
                        <textarea
                            id="diff-textA"
                            class="textarea-shell"
                            style="min-height: 200px"
                            x-model="diffTool.textA"
                            @input="persistDiffInput()"
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="diff-textB">Modified Text</label>
                        <textarea
                            id="diff-textB"
                            class="textarea-shell"
                            style="min-height: 200px"
                            x-model="diffTool.textB"
                            @input="persistDiffInput()"
                        ></textarea>
                    </div>
                </div>

                <div class="tool-panel" style="margin-top:16px">
                    <label class="field-label">Difference Output</label>
                    <div class="diff-output-container">
                        <template x-for="(line, index) in diffTool.result" :key="index">
                            <div class="diff-line" :class="'diff-line-' + line.type">
                                <span class="diff-line-prefix" x-text="line.type === 'added' ? '+' : (line.type === 'removed' ? '-' : ' ')"></span>
                                <span class="diff-line-content" x-text="line.value"></span>
                            </div>
                        </template>
                        <template x-if="diffTool.result.length === 0">
                            <div class="diff-empty">No differences computed. Enter text A and B to compare.</div>
                        </template>
                    </div>
                </div>
            </section>

            {{-- ── UUID & Key Gen ── --}}
            <section x-show="activeTool === 'uuid'" x-cloak>
                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label">UUID v4 Generator</label>
                        <div style="display:flex; gap:8px; margin-bottom:12px">
                            <input type="number" class="input-shell" style="max-width:100px" x-model="uuidTool.uuidCount" min="1" max="50">
                            <button id="uuid-gen-btn" type="button" class="btn-primary" style="flex:1" @click="generateUuids()">Generate UUIDs</button>
                        </div>
                        <textarea
                            class="textarea-shell"
                            style="min-height: 240px"
                            x-model="uuidTool.uuidOutput"
                            readonly
                            placeholder="Generated UUIDs will appear here..."
                        ></textarea>
                        <button type="button" class="btn" style="margin-top:12px; width:100%" @click="copy(uuidTool.uuidOutput)">Copy UUIDs</button>
                    </div>

                    <div class="tool-panel">
                        <label class="field-label">Secure Password/Secret Generator</label>
                        <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px">
                            <div style="display:flex; align-items:center; justify-content:space-between">
                                <span style="font-size:13px; color:var(--text-secondary)">Length:</span>
                                <input type="number" class="input-shell" style="max-width:80px; min-height:30px; padding:4px 8px" x-model="uuidTool.passwordLength" min="4" max="128">
                            </div>
                            <div style="display:flex; flex-wrap:wrap; gap:12px; margin:4px 0">
                                <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer">
                                    <input type="checkbox" x-model="uuidTool.useUppercase"> Uppercase
                                </label>
                                <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer">
                                    <input type="checkbox" x-model="uuidTool.useNumbers"> Numbers
                                </label>
                                <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer">
                                    <input type="checkbox" x-model="uuidTool.useSymbols"> Symbols
                                </label>
                            </div>
                            <button id="pass-gen-btn" type="button" class="btn-primary" @click="generatePasswords()">Generate Password</button>
                        </div>
                        <textarea
                            class="textarea-shell"
                            style="min-height: 190px"
                            x-model="uuidTool.passwordOutput"
                            readonly
                            placeholder="Generated password will appear here..."
                        ></textarea>
                        <button type="button" class="btn" style="margin-top:12px; width:100%" @click="copy(uuidTool.passwordOutput)">Copy Password</button>
                    </div>
                </div>
            </section>

            {{-- ── HTML Formatter ── --}}
            <section x-show="activeTool === 'html'" x-cloak>
                <div class="toolbar">
                    <button id="html-format-btn" type="button" class="btn-primary" @click="runHtmlFormat()">Format</button>
                    <button id="html-minify-btn" type="button" class="btn"         @click="runHtmlMinify()">Minify</button>
                    <button id="html-swap-btn"   type="button" class="btn"         @click="swapHtml()">Swap</button>
                    <button id="html-copy-btn"   type="button" class="btn"         @click="copy(htmlTool.output)">Copy Output</button>
                    <button id="html-clear-btn"  type="button" class="btn-danger"  @click="clearInput('html')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="html-input">Input HTML/XML</label>
                        <textarea
                            id="html-input"
                            class="textarea-shell"
                            x-model="htmlTool.input"
                            @input="persistHtmlInput()"
                            placeholder="Paste HTML or XML code here..."
                        ></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="html-output">Output</label>
                        <textarea
                            id="html-output"
                            class="textarea-shell"
                            x-model="htmlTool.output"
                            readonly
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>

                <p class="json-status"
                   x-show="htmlTool.message"
                   :class="htmlTool.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="htmlTool.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── Epoch Converter ── --}}
            <section x-show="activeTool === 'epoch'" x-cloak>
                <div class="tool-panel" style="margin-bottom:16px; display:flex; align-items:center; justify-content:space-between">
                    <div>
                        <span class="field-label" style="margin:0">Current Unix Timestamp Clock</span>
                        <div style="font-family:var(--font-mono); font-size:24px; font-weight:700; color:var(--accent); margin-top:4px" x-text="epochTool.currentEpoch"></div>
                    </div>
                    <button type="button" class="btn" @click="copy(epochTool.currentEpoch)">Copy Current Epoch</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel" style="display:flex; flex-direction:column; justify-content:space-between">
                        <div>
                            <label class="field-label">Convert Epoch to Human Date</label>
                            <div style="display:flex; gap:8px; margin-bottom:12px">
                                <input type="number" class="input-shell" x-model="epochTool.epochInput" @input="runEpochToDate()">
                                <button type="button" class="btn-primary" @click="epochTool.epochInput = epochTool.currentEpoch; runEpochToDate()">Now</button>
                            </div>
                            <span class="field-label">Date Outputs</span>
                            <div class="case-output-table" style="margin-top:8px" x-show="epochTool.outputs">
                                <div class="case-output-row">
                                    <span class="case-label">Format (h:i:s d/m/y)</span>
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                        <code class="case-value" x-text="epochTool.outputs ? epochTool.outputs.custom : ''"></code>
                                        <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(epochTool.outputs.custom)">Copy</button>
                                    </div>
                                </div>
                                <div class="case-output-row">
                                    <span class="case-label">ISO 8601</span>
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                        <code class="case-value" x-text="epochTool.outputs ? epochTool.outputs.iso : ''"></code>
                                        <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(epochTool.outputs.iso)">Copy</button>
                                    </div>
                                </div>
                                <div class="case-output-row">
                                    <span class="case-label">UTC</span>
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                        <code class="case-value" x-text="epochTool.outputs ? epochTool.outputs.utc : ''"></code>
                                        <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(epochTool.outputs.utc)">Copy</button>
                                    </div>
                                </div>
                                <div class="case-output-row">
                                    <span class="case-label">Local</span>
                                    <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                        <code class="case-value" x-text="epochTool.outputs ? epochTool.outputs.local : ''"></code>
                                        <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(epochTool.outputs.local)">Copy</button>
                                    </div>
                                </div>
                            </div>
                            <div class="json-status json-status-error" x-show="epochTool.error" style="margin-top:8px">
                                <span x-text="epochTool.errorMessage"></span>
                            </div>
                        </div>
                    </div>

                    <div class="tool-panel" style="display:flex; flex-direction:column; justify-content:space-between">
                        <div>
                            <label class="field-label">Convert Date/Time to Epoch</label>
                            <div style="display:flex; gap:8px; margin-bottom:12px">
                                <input type="text" class="input-shell" x-model="epochTool.dateInput" @input="runDateToEpoch()" placeholder="2026-06-08T15:00:00">
                                <button type="button" class="btn-primary" @click="epochTool.dateInput = new Date().toISOString().slice(0, 19); runDateToEpoch()">Now</button>
                            </div>
                            <span class="field-label">Epoch Output</span>
                            <div style="font-family:var(--font-mono); font-size:20px; font-weight:700; padding:12px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--surface-2)" x-text="epochTool.dateOutput"></div>
                        </div>
                        <button type="button" class="btn" style="margin-top:12px; width:100%" @click="copy(epochTool.dateOutput)">Copy Epoch</button>
                    </div>
                </div>
            </section>

            {{-- ── Regex Tester ── --}}
            <section x-show="activeTool === 'regex'" x-cloak>
                <div class="toolbar">
                    <button id="regex-test-btn" type="button" class="btn-primary" @click="runRegex()">Test Match</button>
                    <button id="regex-clear-btn" type="button" class="btn-danger"  @click="clearInput('regex')">Clear Text</button>
                </div>

                <div style="display:flex; flex-direction:column; gap:16px">
                    <div class="tool-panel" style="display:grid; gap:12px; grid-template-columns: 1fr 120px">
                        <div>
                            <label class="field-label" for="regex-pattern">Regex Pattern</label>
                            <input id="regex-pattern" type="text" class="input-shell" style="font-family:var(--font-mono)" x-model="regexTool.pattern" @input="persistRegexInput()" placeholder="[a-zA-Z0-9]+">
                        </div>
                        <div>
                            <label class="field-label" for="regex-flags">Flags</label>
                            <select id="regex-flags" class="select-shell" style="width:100%; min-width:unset" x-model="regexTool.flags" @change="persistRegexInput()">
                                <option value="g">g (global)</option>
                                <option value="gi">gi (global, case-insensitive)</option>
                                <option value="i">i (case-insensitive)</option>
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>

                    <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                        <div class="tool-panel">
                            <label class="field-label" for="regex-text">Test Text</label>
                            <textarea
                                id="regex-text"
                                class="textarea-shell"
                                style="min-height: 240px"
                                x-model="regexTool.testText"
                                @input="persistRegexInput()"
                            ></textarea>
                        </div>
                        <div class="tool-panel">
                            <label class="field-label">Matches</label>
                            <div class="regex-matches-container">
                                <template x-for="(match, idx) in regexTool.matches" :key="idx">
                                    <div class="regex-match-item">
                                        <div style="display:flex; justify-content:space-between; margin-bottom:4px">
                                            <span class="regex-match-idx" x-text="'Match #' + (idx + 1)"></span>
                                            <span class="regex-match-pos" x-text="'Index: ' + match.index"></span>
                                        </div>
                                        <code class="regex-match-val" x-text="match.text"></code>
                                    </div>
                                </template>
                                <template x-if="regexTool.matches.length === 0">
                                    <div class="regex-empty">No matches found.</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="json-status"
                   x-show="regexTool.message"
                   :class="regexTool.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="regexTool.message"
                   style="margin-top:12px"
                ></p>
            </section>

            {{-- ── Color Converter ── --}}
            <section x-show="activeTool === 'color'" x-cloak>
                <div class="tool-panel" style="display:grid; gap:16px; grid-template-columns: 1fr 160px; margin-bottom:16px">
                    <div>
                        <label class="field-label" for="color-input">Color Input (HEX / RGB / HSL)</label>
                        <input id="color-input" type="text" class="input-shell" x-model="colorTool.input" @input="persistColorInput()" placeholder="#06b6d4, rgb(6, 182, 212), HSL(188, 95%, 43%)">
                    </div>
                    <div style="display:flex; flex-direction:column">
                        <span class="field-label">Preview</span>
                        <div class="color-preview-box" :style="'background-color: ' + (colorTool.hex || 'transparent')"></div>
                    </div>
                </div>

                <div class="tool-panel">
                    <span class="field-label">Converted Formats</span>
                    <div class="case-output-table">
                        <div class="case-output-row">
                            <span class="case-label">HEX</span>
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                <code class="case-value" x-text="colorTool.hex || '-'"></code>
                                <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(colorTool.hex)" :disabled="!colorTool.hex">Copy</button>
                            </div>
                        </div>
                        <div class="case-output-row">
                            <span class="case-label">RGB</span>
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                <code class="case-value" x-text="colorTool.rgb || '-'"></code>
                                <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(colorTool.rgb)" :disabled="!colorTool.rgb">Copy</button>
                            </div>
                        </div>
                        <div class="case-output-row">
                            <span class="case-label">HSL</span>
                            <div style="display:flex; justify-content:space-between; align-items:center; width:100%">
                                <code class="case-value" x-text="colorTool.hsl || '-'"></code>
                                <button type="button" class="btn" style="min-height:28px; padding:0 8px; font-size:11px" @click="copy(colorTool.hsl)" :disabled="!colorTool.hsl">Copy</button>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="json-status"
                   x-show="colorTool.message"
                   :class="colorTool.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="colorTool.message"
                   style="margin-top:12px"
                ></p>
            </section>

        </div>
    </main>
</div>
@endsection
