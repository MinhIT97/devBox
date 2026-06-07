@extends('layouts.app')

@section('title', 'Dev Toolkit — Daily utilities for developers')

@section('content')
<div x-data="devToolkitApp()" x-init="init()" :class="{ 'light': !dark }" class="app-wrapper">

    {{-- ══ SIDEBAR ══ --}}
    <aside class="sidebar">

        {{-- Logo + Header --}}
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="sidebar-logo-icon">⚡</div>
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
                x-text="dark ? '☀️' : '🌙'"
            ></button>
        </div>

        {{-- Nav label --}}
        <span class="nav-section-label">Tools</span>

        {{-- Nav items --}}
        <nav class="sidebar-nav" aria-label="Tool navigation">
            <template x-for="tool in tools" :key="tool.id">
                <button
                    type="button"
                    class="tool-nav"
                    :class="{ 'tool-nav-active': activeTool === tool.id }"
                    @click="selectTool(tool.id)"
                    :id="'nav-' + tool.id"
                    :aria-current="activeTool === tool.id ? 'page' : null"
                >
                    <span class="nav-title" x-text="tool.icon + ' ' + tool.title"></span>
                    <span class="nav-desc" x-text="tool.description"></span>
                </button>
            </template>
        </nav>

        {{-- Footer --}}
        <div class="sidebar-footer">
            <span>⚙️</span>
            <span>v1.0 &mdash; Open in browser</span>
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
                    <span>✓</span>
                    <span x-text="toast"></span>
                </div>
            </header>

            {{-- ── JSON Formatter ── --}}
            <section x-show="activeTool === 'json'" x-cloak>
                <div class="toolbar">
                    <button id="json-format-btn"   type="button" class="btn-primary" @click="formatJson()">⚡ Format</button>
                    <button id="json-minify-btn"   type="button" class="btn"         @click="minifyJson()">⬜ Minify</button>
                    <button id="json-validate-btn" type="button" class="btn"         @click="validateJson()">✓ Validate</button>
                    <button id="json-swap-btn"     type="button" class="btn"         @click="swapJson()">⇄ Swap</button>
                    <button id="json-copy-btn"     type="button" class="btn"         @click="copyJsonOutput()">⎘ Copy output</button>
                    <button id="json-clear-btn"    type="button" class="btn-danger"  @click="clearInput('json')">✕ Clear</button>
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
                    <button id="case-convert-btn" type="button" class="btn-primary" @click="convertCase()">⚡ Convert</button>
                    <button id="case-copy-btn"    type="button" class="btn"         @click="copyCaseOutput()">⎘ Copy output</button>
                    <button id="case-clear-btn"   type="button" class="btn-danger"  @click="clearInput('case')">✕ Clear</button>
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
                    <button id="const-generate-btn" type="button" class="btn-primary" @click="generateConstant()">⚡ Generate</button>
                    <select id="const-mode-select" class="select-shell" x-model="constantTool.mode" @change="saveConstantMode(); generateConstant()">
                        <option value="php-const">PHP const</option>
                        <option value="php-enum">PHP enum (Laravel)</option>
                        <option value="js-object">JavaScript object</option>
                        <option value="ts-enum">TypeScript enum</option>
                    </select>
                    <button id="const-copy-btn"  type="button" class="btn"        @click="copyConstantOutput()">⎘ Copy output</button>
                    <button id="const-clear-btn" type="button" class="btn-danger" @click="clearInput('constant')">✕ Clear</button>
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
                    <button id="bem-generate-btn" type="button" class="btn-primary" @click="generateBem()">⚡ Generate</button>
                    <button id="bem-copy-btn"     type="button" class="btn"        @click="copyBemOutput()">⎘ Copy output</button>
                    <button id="bem-clear-btn"    type="button" class="btn-danger" @click="clearInput('bem')">✕ Clear</button>
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

        </div>
    </main>
</div>
@endsection
