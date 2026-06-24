@extends('layouts.app')

@section('title', 'Dev Toolkit — Daily utilities for developers')

@section('content')
<div x-data="devToolkitApp()" x-init="init()" :class="{ 'light': !dark }" class="app-wrapper" @keydown.window="handleGlobalKeydown($event)">

    {{-- Ambient orbs --}}
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    {{-- ══ MOBILE HEADER ══ --}}
    <header class="mobile-header">
        <div class="sidebar-logo">
            <div class="sidebar-logo-icon">
                <svg class="logo-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
            </div>
            <span class="sidebar-title">Dev Toolkit</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px">
            {{-- Theme toggle mobile --}}
            <button
                type="button"
                class="theme-btn-mobile"
                @click="toggleTheme()"
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
            {{-- Hamburger menu --}}
            <button
                type="button"
                class="menu-toggle-btn"
                @click="showMobileMenu = !showMobileMenu"
                :aria-expanded="showMobileMenu"
                aria-label="Toggle menu"
            >
                <svg x-show="!showMobileMenu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg x-show="showMobileMenu" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    </header>

    {{-- ══ SIDEBAR ══ --}}
    <aside class="sidebar" :class="{ 'sidebar-open': showMobileMenu }">

        {{-- Logo + Header (Desktop Only) --}}
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

        {{-- Tool Search --}}
        <div class="sidebar-search">
            <svg class="sidebar-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
                type="text"
                class="sidebar-search-input"
                x-model="toolSearch"
                x-ref="toolSearchInput"
                @input="filterTools()"
                placeholder="Search tools..."
                aria-label="Search tools"
            >
            <span class="sidebar-search-shortcut" x-show="!toolSearch">/</span>
        </div>

        <div class="sidebar-body">
            {{-- Group: Formatters --}}
            <template x-if="filteredFormatterTools.length > 0">
                <span class="nav-section-label">Formatters</span>
            </template>
            <nav class="sidebar-nav" aria-label="Formatter tools">
                <template x-for="tool in filteredFormatterTools" :key="tool.id">
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
            <template x-if="filteredConverterTools.length > 0">
                <span class="nav-section-label">Converters & Generators</span>
            </template>
            <nav class="sidebar-nav" aria-label="Converter tools">
                <template x-for="tool in filteredConverterTools" :key="tool.id">
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

            {{-- No results --}}
            <div class="no-results" x-show="toolSearch && filteredFormatterTools.length === 0 && filteredConverterTools.length === 0">
                <p>No tools match "<strong x-text="toolSearch"></strong>"</p>
                <p style="font-size:11px; margin-top:4px">Try a different keyword.</p>
            </div>
        </div>

        {{-- Footer --}}
        <div class="sidebar-footer">
            <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Dev Toolkit</span>
            <span class="sidebar-footer-badge">v1.2</span>
        </div>
    </aside>

    {{-- ══ MAIN CONTENT ══ --}}
    <main class="main-content">
        <div style="max-width:1200px; margin:0 auto">

            {{-- ══ WELCOME HERO ══ --}}
            <div x-show="!activeTool" x-cloak class="welcome-hero">
                <div class="welcome-hero-icon">
                    <svg class="welcome-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                </div>
                <h2>All-in-one Developer Toolkit</h2>
                <p>13 powerful utilities to speed up your daily workflow. Format JSON, convert cases, generate constants, decode JWTs, test regex, and more — all from your browser.</p>
                <div class="welcome-quick-actions">
                    <button class="welcome-quick-chip" @click="selectTool('json')">
                        <span x-html="icons.json" style="display:inline-flex; align-items:center"></span>
                        JSON Formatter
                    </button>
                    <button class="welcome-quick-chip" @click="selectTool('base64')">
                        <span x-html="icons.base64" style="display:inline-flex; align-items:center"></span>
                        Base64 Tool
                    </button>
                    <button class="welcome-quick-chip" @click="selectTool('uuid')">
                        <span x-html="icons.uuid" style="display:inline-flex; align-items:center"></span>
                        UUID Generator
                    </button>
                    <button class="welcome-quick-chip" @click="selectTool('diff')">
                        <span x-html="icons.diff" style="display:inline-flex; align-items:center"></span>
                        Diff Checker
                    </button>
                    <button class="welcome-quick-chip" @click="selectTool('regex')">
                        <span x-html="icons.regex" style="display:inline-flex; align-items:center"></span>
                        Regex Tester
                    </button>
                    <button class="welcome-quick-chip" @click="selectTool('color')">
                        <span x-html="icons.color" style="display:inline-flex; align-items:center"></span>
                        Color Converter
                    </button>
                </div>
                <div class="kbd-hint" style="margin-top:24px">
                    <span class="kbd">/</span> Search tools &nbsp;&middot;&nbsp;
                    <span class="kbd">Ctrl</span>+<span class="kbd">K</span> Command palette &nbsp;&middot;&nbsp;
                    <span class="kbd">Esc</span> Clear tool
                </div>
            </div>

            {{-- ══ TOOL HEADER ══ --}}
            <template x-if="activeTool">
                <header class="page-header">
                    <div class="page-header-left">
                        <div class="page-header-tool-icon" x-html="toolHeaderIcons[activeTool] || ''"></div>
                        <div>
                            <h1 class="page-title" x-text="currentTool() ? currentTool().title : ''"></h1>
                            <p class="page-desc" x-text="currentTool() ? currentTool().description : ''"></p>
                            <div class="kbd-hint" x-text="getKeyboardHints()"></div>
                            <div class="kbd-hint" style="margin-top:4px" x-show="currentToolInfo() && !showToolInfo">
                                <button type="button" class="tool-info-reveal" @click="showToolInfo = true">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    Show tips
                                </button>
                            </div>
                        </div>
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
            </template>

            {{-- ══ TOOL INFO BANNER ══ --}}
            <template x-if="activeTool && currentToolInfo()">
                <div
                    class="tool-info-banner"
                    x-show="showToolInfo"
                    x-transition:enter="transition ease-out duration-250"
                    x-transition:enter-start="opacity-0 transform scale-95"
                    x-transition:enter-end="opacity-100 transform scale-100"
                    x-transition:leave="transition ease-in duration-150"
                    x-transition:leave-start="opacity-100"
                    x-transition:leave-end="opacity-0"
                >
                    <div class="tool-info-inner">
                        <div class="tool-info-header">
                            <div class="tool-info-header-left">
                                <svg class="tool-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <span class="tool-info-title">About <span x-text="currentTool() ? currentTool().title : ''"></span></span>
                            </div>
                            <button type="button" class="tool-info-close" @click="showToolInfo = false" title="Dismiss" aria-label="Dismiss info">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="tool-info-body">
                            <p class="tool-info-what">
                                <span class="tool-info-label">What is it?</span>
                                <span x-html="currentToolInfo() ? currentToolInfo().what : ''"></span>
                            </p>
                            <div class="tool-info-divider"></div>
                            <p class="tool-info-tip">
                                <span class="tool-info-label">Pro tip</span>
                                <span x-html="currentToolInfo() ? currentToolInfo().tip : ''"></span>
                            </p>
                        </div>
                    </div>
                </div>
            </template>

            {{-- ── JSON Formatter ── --}}
            <section x-show="activeTool === 'json'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="json-format-btn"   type="button" class="btn-primary" @click="formatJson()">Format</button>
                    <button id="json-minify-btn"   type="button" class="btn"         @click="minifyJson()">Minify</button>
                    <button id="json-validate-btn" type="button" class="btn"         @click="validateJson()">Validate</button>
                    <button id="json-swap-btn"     type="button" class="btn"         @click="swapJson()">Swap</button>
                    <button id="json-copy-btn"     type="button" class="btn"         @click="copyJsonOutput()">Copy Output</button>
                    <button id="json-share-btn"    type="button" class="btn"         @click="shareJson()" :disabled="jsonShare.loading">
                        <template x-if="!jsonShare.loading">
                            <span style="display:inline-flex;align-items:center;gap:5px">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                Share
                            </span>
                        </template>
                        <template x-if="jsonShare.loading">
                            <span style="display:inline-flex;align-items:center;gap:5px">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                                Đang tạo...
                            </span>
                        </template>
                    </button>
                    <button id="json-clear-btn"    type="button" class="btn-danger"  @click="clearInput('json'); resetShareUrl()">Clear</button>
                </div>

                {{-- Share Link Result — nằm trên, nổi bật --}}
                <div
                    x-show="jsonShare.url"
                    x-transition:enter="transition ease-out duration-250"
                    x-transition:enter-start="opacity-0 -translate-y-3"
                    x-transition:enter-end="opacity-100 translate-y-0"
                    class="json-share-panel"
                >
                    <div class="json-share-inner">
                        <div class="json-share-header">
                            <div style="display:flex;align-items:center;gap:8px">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--success)"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                <span style="font-size:13px;font-weight:700;color:var(--text-primary)">Link chia sẻ</span>
                                <span class="json-share-badge">Hết hạn sau 24h</span>
                            </div>
                            <button type="button" class="json-share-close" @click="resetShareUrl()" title="Đóng">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                        </div>
                        <div class="json-share-url-row">
                            <code class="json-share-url" x-text="jsonShare.url" @click="copyShareUrl()" title="Click để copy"></code>
                            <button type="button" class="btn-primary" style="min-height:34px;padding:0 14px;font-size:12px" @click="copyShareUrl()">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                Copy
                            </button>
                        </div>
                        <p class="json-share-auto-hint">Link đã được tự động copy vào clipboard</p>
                    </div>
                </div>

                {{-- Share error --}}
                <div
                    x-show="jsonShare.error && !jsonShare.url"
                    class="json-share-error"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <span x-text="jsonShare.error"></span>
                </div>

                <p class="json-status"
                   :class="json.error ? 'json-status-error' : 'json-status-ok'"
                   x-text="json.message"
                   style="margin-top:12px"
                ></p>

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
            </section>

            {{-- ── Case Converter ── --}}
            <section x-show="activeTool === 'case'" x-cloak class="tool-section-enter">
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
                                    <button
                                        type="button"
                                        class="case-copy-btn"
                                        @click="copy(row.value)"
                                        :title="'Copy ' + row.label"
                                        aria-label="Copy value"
                                    >
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            {{-- ── Constant Generator ── --}}
            <section x-show="activeTool === 'constant'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'bem'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="bem-generate-btn" type="button" class="btn-primary" @click="generateBem()">Generate</button>
                    <button id="bem-copy-btn"     type="button" class="btn"        @click="copyBemOutput()">Copy Output</button>
                    <button id="bem-clear-btn"    type="button" class="btn-danger" @click="clearInput('bem')">Clear</button>
                </div>

                <div style="display:grid; gap:16px; grid-template-columns: minmax(0,0.75fr) minmax(0,1.25fr)">
                    <div class="tool-panel">
                        <div style="display:flex; flex-direction:column; gap:16px">
                            <label style="display:block">
                                <span class="field-label">Block</span>
                                <input id="bem-block" class="input-shell" x-model="bemTool.block" @input="persistBemInput()" placeholder="product-card">
                            </label>
                            <label style="display:block">
                                <span class="field-label">Element</span>
                                <input id="bem-element" class="input-shell" x-model="bemTool.element" @input="persistBemInput()" placeholder="title">
                            </label>
                            <label style="display:block">
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
            <section x-show="activeTool === 'base64'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'url'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'jwt'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'diff'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'uuid'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'html'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'epoch'" x-cloak class="tool-section-enter">
                <div class="tool-panel tool-panel-accent" style="margin-bottom:16px; display:flex; align-items:center; justify-content:space-between">
                    <div>
                        <span class="field-label" style="margin:0">Current Unix Timestamp Clock</span>
                        <div style="font-family:var(--font-mono); font-size:28px; font-weight:700; color:var(--accent); margin-top:4px; letter-spacing:-0.5px" x-text="epochTool.currentEpoch"></div>
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
                            <div style="font-family:var(--font-mono); font-size:22px; font-weight:700; padding:14px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--surface-2); letter-spacing:-0.3px" x-text="epochTool.dateOutput"></div>
                        </div>
                        <button type="button" class="btn" style="margin-top:12px; width:100%" @click="copy(epochTool.dateOutput)">Copy Epoch</button>
                    </div>
                </div>
            </section>

            {{-- ── Regex Tester ── --}}
            <section x-show="activeTool === 'regex'" x-cloak class="tool-section-enter">
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
            <section x-show="activeTool === 'color'" x-cloak class="tool-section-enter">
                <div class="tool-panel" style="display:grid; gap:16px; grid-template-columns: 1fr 160px; margin-bottom:16px">
                    <div>
                        <label class="field-label" for="color-input">Color Input (HEX / RGB / HSL)</label>
                        <input id="color-input" type="text" class="input-shell" x-model="colorTool.input" @input="persistColorInput()" placeholder="#06b6d4, rgb(6, 182, 212), HSL(188, 95%, 43%)">
                    </div>
                    <div style="display:flex; flex-direction:column">
                        <span class="field-label">Picker / Preview</span>
                        <button
                            type="button"
                            class="color-preview-box"
                            :style="'background-color: ' + (colorTool.hex || 'transparent')"
                            @click="$refs.nativePicker.click()"
                            title="Click to open color picker"
                        >
                            <div class="color-preview-overlay">
                                <svg class="color-picker-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </button>
                        <input
                            type="color"
                            x-ref="nativePicker"
                            style="opacity: 0; position: absolute; width: 0; height: 0; pointer-events: none;"
                            :value="colorTool.hex || '#06b6d4'"
                            @input="colorTool.input = $event.target.value; persistColorInput()"
                        >
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

            {{-- ── SQL Formatter ── --}}
            <section x-show="activeTool === 'sql'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="sql-format-btn" type="button" class="btn-primary" @click="runSqlFormat()">Format</button>
                    <button id="sql-minify-btn" type="button" class="btn"         @click="runSqlMinify()">Minify</button>
                    <button id="sql-swap-btn"   type="button" class="btn"         @click="swapSql()">Swap</button>
                    <button id="sql-copy-btn"   type="button" class="btn"         @click="copySqlOutput()">Copy Output</button>
                    <button id="sql-clear-btn"  type="button" class="btn-danger"  @click="clearInput('sql')">Clear</button>
                </div>
                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <label class="field-label" for="sql-input">Input SQL</label>
                        <textarea id="sql-input" class="textarea-shell" x-model="sqlTool.input" @input="persistSqlInput()" spellcheck="false" placeholder="SELECT ... FROM ... WHERE ..."></textarea>
                    </div>
                    <div class="tool-panel">
                        <label class="field-label" for="sql-output">Output</label>
                        <textarea id="sql-output" class="textarea-shell" x-model="sqlTool.output" readonly spellcheck="false"></textarea>
                    </div>
                </div>
                <p class="json-status" x-show="sqlTool.message" :class="sqlTool.error ? 'json-status-error' : 'json-status-ok'" x-text="sqlTool.message" style="margin-top:12px"></p>
            </section>

            {{-- ── IP / Geo Lookup ── --}}
            <section x-show="activeTool === 'ip'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="ip-lookup-btn" type="button" class="btn-primary" @click="runIpLookup()" :disabled="ipTool.loading">
                        <span x-show="!ipTool.loading">Lookup</span>
                        <span x-show="ipTool.loading">Looking up...</span>
                    </button>
                    <button id="ip-myip-btn" type="button" class="btn" @click="ipTool.input=''; runIpLookup('')">My IP</button>
                    <button id="ip-clear-btn"  type="button" class="btn-danger" @click="clearInput('ip')">Clear</button>
                </div>
                <div class="tool-panel" style="margin-bottom:16px">
                    <label class="field-label" for="ip-input">IP Address (leave empty to detect yours)</label>
                    <input id="ip-input" type="text" class="input-shell" x-model="ipTool.input" @keyup.enter="runIpLookup()" placeholder="8.8.8.8 or 2001:4860:4860::8888">
                </div>
                <template x-if="ipTool.result">
                    <div class="tool-panel" style="margin-bottom:16px">
                        <span class="field-label">Result</span>
                        <div class="case-output-table">
                            <template x-for="row in [
                                {label:'IP', value:ipTool.result.ip},
                                {label:'Country', value:ipTool.result.country + ' (' + ipTool.result.countryCode + ')'},
                                {label:'City / Region', value:ipTool.result.city + ', ' + ipTool.result.region},
                                {label:'ISP', value:ipTool.result.isp},
                                {label:'Timezone', value:ipTool.result.timezone},
                                {label:'Coordinates', value:ipTool.result.lat + ', ' + ipTool.result.lon},
                                {label:'Postal Code', value:ipTool.result.postal || '-'}
                            ]" :key="row.label">
                                <div class="case-output-row">
                                    <span class="case-label" x-text="row.label"></span>
                                    <code class="case-value" x-text="row.value"></code>
                                    <button type="button" class="case-copy-btn" @click="copy(row.value)" :title="'Copy ' + row.label">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
                <div x-show="ipTool.error" class="json-share-error" style="margin-top:12px" x-text="ipTool.error"></div>
            </section>

            {{-- ── Hash Generator ── --}}
            <section x-show="activeTool === 'hash'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="hash-gen-btn"  type="button" class="btn-primary" @click="runHash()" :disabled="hashTool.loading">Generate</button>
                    <button id="hash-clear-btn" type="button" class="btn-danger" @click="clearInput('hash')">Clear</button>
                </div>
                <div class="tool-panel" style="margin-bottom:16px">
                    <label class="field-label" for="hash-input">Input text</label>
                    <textarea id="hash-input" class="textarea-shell" style="min-height:100px" x-model="hashTool.input" @input="persistHashInput()" placeholder="Enter text to hash..."></textarea>
                </div>
                <template x-if="hashTool.results">
                    <div class="tool-panel">
                        <span class="field-label">Hash Results</span>
                        <div class="case-output-table">
                            <template x-for="row in [
                                {label:'MD5', value:hashTool.results.md5},
                                {label:'SHA-1', value:hashTool.results.sha1},
                                {label:'SHA-256', value:hashTool.results.sha256},
                                {label:'SHA-384', value:hashTool.results.sha384},
                                {label:'SHA-512', value:hashTool.results.sha512}
                            ]" :key="row.label">
                                <div class="case-output-row">
                                    <span class="case-label" x-text="row.label"></span>
                                    <code class="case-value" x-text="row.value" style="font-size:10.5px"></code>
                                    <button type="button" class="case-copy-btn" @click="copyHash(row.value)" :title="'Copy ' + row.label">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </section>

            {{-- ── QR Code Generator ── --}}
            <section x-show="activeTool === 'qrcode'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="qr-gen-btn"   type="button" class="btn-primary" @click="runQrCode()">Generate</button>
                    <button id="qr-clear-btn" type="button" class="btn-danger"  @click="clearInput('qrcode')">Clear</button>
                </div>
                <div style="display:grid; gap:16px; grid-template-columns: 1fr auto">
                    <div class="tool-panel">
                        <label class="field-label" for="qr-input">Text or URL</label>
                        <textarea id="qr-input" class="textarea-shell" style="min-height:120px" x-model="qrTool.input" @input="persistQrInput()" placeholder="https://example.com or any text..."></textarea>
                        <div style="display:flex; align-items:center; gap:10px; margin-top:12px">
                            <span style="font-size:11px; color:var(--text-muted)">Size:</span>
                            <input type="range" x-model="qrTool.size" min="128" max="512" step="32" @input="runQrCode()" style="flex:1; accent-color:var(--accent)">
                            <span style="font-size:11px; color:var(--text-muted); min-width:40px" x-text="qrTool.size + 'px'"></span>
                        </div>
                    </div>
                    <div class="tool-panel" style="display:flex; align-items:center; justify-content:center; min-width:280px">
                        <div style="text-align:center">
                            <template x-if="qrTool.imageUrl">
                                <div>
                                    <img :src="qrTool.imageUrl" alt="QR Code" style="border-radius:var(--radius-md); display:block; max-width:280px" width="256" height="256">
                                    <button type="button" class="btn" style="margin-top:12px; width:100%" @click="copy(qrTool.input)">Copy Text</button>
                                </div>
                            </template>
                            <template x-if="!qrTool.imageUrl">
                                <div style="color:var(--text-muted); font-size:13px; padding:40px 20px">Enter text or URL and click Generate to create a QR code</div>
                            </template>
                        </div>
                    </div>
                </div>
            </section>

            {{-- ── Lorem Ipsum Generator ── --}}
            <section x-show="activeTool === 'lorem'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="lorem-gen-btn"  type="button" class="btn-primary" @click="generateLorem()">Generate</button>
                    <select id="lorem-type" class="select-shell" x-model="loremTool.type">
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                    </select>
                    <input type="number" class="input-shell" style="max-width:80px" x-model="loremTool.count" min="1" max="100">
                    <button id="lorem-copy-btn" type="button" class="btn"        @click="copyLorem()">Copy</button>
                    <button id="lorem-clear-btn" type="button" class="btn-danger" @click="clearInput('lorem')">Clear</button>
                </div>
                <div class="tool-panel">
                    <label class="field-label">Generated Text</label>
                    <textarea class="textarea-shell" x-model="loremTool.output" readonly placeholder="Click Generate to create Lorem Ipsum text..."></textarea>
                </div>
            </section>

            {{-- ── YAML ↔ JSON ── --}}
            <section x-show="activeTool === 'yaml'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="yaml-to-json-btn" type="button" class="btn-primary" @click="runYamlToJson()">YAML → JSON</button>
                    <button id="json-to-yaml-btn" type="button" class="btn"         @click="runJsonToYaml()">JSON → YAML</button>
                    <button id="yaml-swap-btn"    type="button" class="btn"         @click="swapYamlJson()">Swap</button>
                    <button id="yaml-clear-btn"   type="button" class="btn-danger"  @click="clearInput('yaml')">Clear</button>
                </div>
                <div style="display:grid; gap:16px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
                    <div class="tool-panel">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
                            <label class="field-label" for="yaml-input">YAML</label>
                            <button type="button" class="btn" style="min-height:28px;padding:0 8px;font-size:11px" @click="copyYamlOutput()">Copy</button>
                        </div>
                        <textarea id="yaml-input" class="textarea-shell" x-model="yamlTool.yamlInput" @input="persistYamlInput()" spellcheck="false" placeholder="key: value"></textarea>
                    </div>
                    <div class="tool-panel">
                        <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
                            <label class="field-label" for="yaml-json-output">JSON</label>
                            <button type="button" class="btn" style="min-height:28px;padding:0 8px;font-size:11px" @click="copyJsonFromYaml()">Copy</button>
                        </div>
                        <textarea id="yaml-json-output" class="textarea-shell" x-model="yamlTool.jsonInput" spellcheck="false" placeholder='{"key": "value"}'></textarea>
                    </div>
                </div>
                <p class="json-status" x-show="yamlTool.message" :class="yamlTool.error ? 'json-status-error' : 'json-status-ok'" x-text="yamlTool.message" style="margin-top:12px"></p>
            </section>

            {{-- ── Certificate Decoder ── --}}
            <section x-show="activeTool === 'cert'" x-cloak class="tool-section-enter">
                <div class="toolbar">
                    <button id="cert-decode-btn" type="button" class="btn-primary" @click="runCertDecode()">Decode</button>
                    <button id="cert-clear-btn"  type="button" class="btn-danger"  @click="clearInput('cert')">Clear</button>
                </div>
                <div class="tool-panel" style="margin-bottom:16px">
                    <label class="field-label" for="cert-input">PEM Certificate</label>
                    <textarea id="cert-input" class="textarea-shell" style="min-height:200px; font-size:11px" x-model="certTool.input" placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----" spellcheck="false"></textarea>
                </div>
                <div x-show="certTool.error" class="json-share-error" style="margin-top:12px" x-text="certTool.error"></div>
                <template x-if="certTool.result">
                    <div class="tool-panel">
                        <span class="field-label">Certificate Details</span>
                        <div class="case-output-table">
                            <template x-for="row in [
                                {label:'Subject', value:certTool.result.subject},
                                {label:'Issuer', value:certTool.result.issuer},
                                {label:'Valid From', value:certTool.result.validFrom},
                                {label:'Valid To', value:certTool.result.validTo},
                                {label:'Serial Number', value:certTool.result.serialNumber},
                                {label:'SHA-1 Fingerprint', value:certTool.result.fingerprintSHA1 || 'Computing...'},
                                {label:'SHA-256 Fingerprint', value:certTool.result.fingerprintSHA256 || 'Computing...'}
                            ]" :key="row.label">
                                <div class="case-output-row">
                                    <span class="case-label" x-text="row.label"></span>
                                    <code class="case-value" x-text="row.value" :style="row.label.includes('Fingerprint') ? 'font-size:9.5px' : ''"></code>
                                    <button type="button" class="case-copy-btn" @click="copy(row.value)" :title="'Copy ' + row.label">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>

            </section>

            {{-- ── Image Cropper ── }}
            <section x-show="activeTool === 'cropper'" x-cloak class="tool-section-enter">
                <div class="toolbar cropper-toolbar">
                    <button id="cropper-crop-btn" type="button" class="btn-primary" @click="runCropImage()" :disabled="!cropperTool.imageSrc || cropperTool.processing">
                        <span x-show="!cropperTool.processing">Crop</span>
                        <span x-show="cropperTool.processing">Processing...</span>
                    </button>
                    <button id="cropper-dl-btn" type="button" class="btn" @click="downloadCroppedImage()" :disabled="!cropperTool.result">Download</button>
                    <button id="cropper-copy-btn" type="button" class="btn" @click="copyCroppedImage()" :disabled="!cropperTool.result">Copy</button>
                    <button id="cropper-reset-btn" type="button" class="btn" @click="resetCropper()" :disabled="!cropperTool.imageSrc">Reset</button>
                    <button id="cropper-clear-btn" type="button" class="btn-danger" @click="clearInput('cropper')">Clear</button>
                </div>

                {{-- Upload Area --}}
                <div x-show="!cropperTool.imageSrc"
                    class="cropper-upload"
                    :class="{ 'is-dragging': cropperTool.draggingUpload }"
                    @dragover.prevent="cropperTool.draggingUpload = true"
                    @dragleave.prevent="cropperTool.draggingUpload = false"
                    @drop.prevent="onCropperDrop($event)">
                    <label for="cropper-file-input" class="cropper-upload-label">
                        <svg class="cropper-upload-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        <span class="cropper-upload-title">Click or drag an image here</span>
                        <span style="color:var(--text-muted); font-size:11px; margin-top:4px; display:inline-block">PNG, JPG, GIF, WebP, BMP — up to 20 MB</span>
                    </label>
                    <input type="file" id="cropper-file-input" accept="image/png,image/jpeg,image/gif,image/webp,image/bmp" class="cropper-file-input" @change="onCropperFileChange($event)">
                </div>

                {{-- Main Crop Area --}}
                <div x-show="cropperTool.imageSrc" class="cropper-workspace">
                    <div class="tool-panel cropper-stage-panel">
                        <div class="cropper-stage-head">
                            <div>
                                <span class="field-label">Crop Preview</span>
                                <p class="cropper-hint">Drag inside the box to move it. Pull a handle to resize.</p>
                            </div>
                            <label for="cropper-file-input" class="btn cropper-replace-btn">Replace image</label>
                        </div>
                        <div class="cropper-stage"
                            x-ref="cropperStage"
                            :class="{ 'is-moving': cropperTool.interaction.active }"
                            @pointerdown="startCropperDraw($event)"
                            @dragover.prevent
                            @drop.prevent="onCropperDrop($event)">
                            <img :src="cropperTool.imageSrc" class="cropper-img" alt="Image to crop" @load="syncCropperStage()">
                            <div class="cropper-selection"
                                :style="cropperSelectionStyle()"
                                @pointerdown.stop="startCropperMove($event)">
                                <div class="cropper-rule cropper-rule-v cropper-rule-v1"></div>
                                <div class="cropper-rule cropper-rule-v cropper-rule-v2"></div>
                                <div class="cropper-rule cropper-rule-h cropper-rule-h1"></div>
                                <div class="cropper-rule cropper-rule-h cropper-rule-h2"></div>
                                <template x-for="handle in cropperHandles" :key="handle">
                                    <button type="button"
                                        class="cropper-handle"
                                        :class="'cropper-handle-' + handle"
                                        :aria-label="'Resize crop ' + handle"
                                        @pointerdown.stop="startCropperResize($event, handle)"></button>
                                </template>
                            </div>
                        </div>
                    </div>

                    {{-- Controls Sidebar --}}
                    <div class="cropper-controls">
                        {{-- Crop Coordinates --}}
                        <div class="tool-panel">
                            <span class="field-label">Crop Area (px)</span>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px">
                                <div>
                                    <span style="font-size:10px; color:var(--text-muted)">X</span>
                                    <input type="number" class="input-shell" style="width:100%" x-model="cropperTool.crop.x" min="0" @input="onCropRectChange({x: cropperTool.crop.x, y: cropperTool.crop.y, width: cropperTool.crop.width, height: cropperTool.crop.height})">
                                </div>
                                <div>
                                    <span style="font-size:10px; color:var(--text-muted)">Y</span>
                                    <input type="number" class="input-shell" style="width:100%" x-model="cropperTool.crop.y" min="0" @input="onCropRectChange({x: cropperTool.crop.x, y: cropperTool.crop.y, width: cropperTool.crop.width, height: cropperTool.crop.height})">
                                </div>
                                <div>
                                    <span style="font-size:10px; color:var(--text-muted)">Width</span>
                                    <input type="number" class="input-shell" style="width:100%" x-model="cropperTool.crop.width" min="1" @input="onCropRectChange({x: cropperTool.crop.x, y: cropperTool.crop.y, width: cropperTool.crop.width, height: cropperTool.crop.height})">
                                </div>
                                <div>
                                    <span style="font-size:10px; color:var(--text-muted)">Height</span>
                                    <input type="number" class="input-shell" style="width:100%" x-model="cropperTool.crop.height" min="1" @input="onCropRectChange({x: cropperTool.crop.x, y: cropperTool.crop.y, width: cropperTool.crop.width, height: cropperTool.crop.height})">
                                </div>
                            </div>
                            <div style="font-size:10px; color:var(--text-muted); margin-top:8px">
                                Image: <strong x-text="cropperTool.naturalWidth + ' × ' + cropperTool.naturalHeight"></strong>
                            </div>
                        </div>

                        {{-- Aspect Ratio --}}
                        <div class="tool-panel">
                            <span class="field-label">Aspect Ratio</span>
                            <div style="display:flex; flex-wrap:wrap; gap:6px">
                                <template x-for="ratio in [{id:'free',label:'Free'},{id:'1:1',label:'1:1'},{id:'4:3',label:'4:3'},{id:'16:9',label:'16:9'},{id:'3:2',label:'3:2'}]" :key="ratio.id">
                                    <button type="button" class="btn" style="min-height:28px;padding:0 10px;font-size:11px"
                                        :class="{ 'btn-primary': cropperTool.aspectRatio === ratio.id }"
                                        @click="setCropperAspect(ratio.id)"
                                        x-text="ratio.label"
                                        :disabled="!cropperTool.imageSrc"></button>
                                </template>
                            </div>
                        </div>

                        {{-- Output Format --}}
                        <div class="tool-panel">
                            <span class="field-label">Format</span>
                            <select class="select-shell" x-model="cropperTool.outputFormat" @change="setCropperFormat(cropperTool.outputFormat)" style="width:100%">
                                <option value="image/png">PNG</option>
                                <option value="image/jpeg">JPEG</option>
                                <option value="image/webp">WebP</option>
                            </select>
                        </div>

                        {{-- Quality --}}
                        <div class="tool-panel" x-show="cropperTool.outputFormat !== 'image/png'">
                            <span class="field-label">Quality: <span x-text="cropperTool.quality + '%'"></span></span>
                            <input type="range" x-model="cropperTool.quality" min="10" max="100" step="5" @input="setCropperQuality(cropperTool.quality)" style="width:100%; accent-color:var(--accent)">
                        </div>

                        {{-- Resize --}}
                        <div class="tool-panel">
                            <label style="display:flex; align-items:center; gap:8px; cursor:pointer">
                                <input type="checkbox" x-model="cropperTool.resizeEnabled" style="accent-color:var(--accent)">
                                <span class="field-label" style="margin-bottom:0">Resize Output</span>
                            </label>
                            <div x-show="cropperTool.resizeEnabled" style="display:flex; gap:8px; margin-top:8px; align-items:center">
                                <input type="number" class="input-shell" x-model="cropperTool.resizeWidth" min="1" max="4096" @input="setCropperResizeWidth(cropperTool.resizeWidth)" style="width:80px" placeholder="W">
                                <span style="color:var(--text-muted); font-size:12px">&times;</span>
                                <input type="number" class="input-shell" x-model="cropperTool.resizeHeight" min="1" max="4096" @input="setCropperResizeHeight(cropperTool.resizeHeight)" style="width:80px" placeholder="H">
                                <span style="color:var(--text-muted); font-size:11px">px</span>
                            </div>
                        </div>

                        {{-- Error / Message --}}
                        <div x-show="cropperTool.error" class="json-share-error" style="margin-top:0" x-text="cropperTool.error"></div>
                        <p x-show="cropperTool.message && !cropperTool.error && cropperTool.imageSrc" class="json-status json-status-ok" style="margin-top:0; font-size:11px" x-text="cropperTool.message"></p>

                        {{-- File Info --}}
                        <div class="tool-panel" style="font-size:10px; color:var(--text-muted); display:flex; align-items:center; justify-content:space-between">
                            <span x-text="cropperTool.inputName" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:180px"></span>
                        </div>
                    </div>
                </div>

                {{-- Result Section --}}
                <template x-if="cropperTool.result">
                    <div style="display:grid; gap:16px; grid-template-columns: auto 1fr; margin-top:16px; align-items:start">
                        <div class="tool-panel tool-panel-accent" style="padding:12px">
                            <img :src="cropperTool.result.dataUrl" style="display:block; max-width:200px; max-height:200px; border-radius:var(--radius-md)" alt="Cropped result">
                        </div>
                        <div class="tool-panel" style="display:flex; flex-direction:column; gap:8px; justify-content:center">
                            <span class="field-label">Cropped Result</span>
                            <div style="font-size:12px; color:var(--text-muted); display:flex; gap:20px; flex-wrap:wrap">
                                <span><strong x-text="cropperTool.result.width + ' × ' + cropperTool.result.height"></strong> px</span>
                                <span><strong x-text="formatBytes(cropperTool.result.size)"></strong></span>
                                <span style="text-transform:uppercase" x-text="cropperTool.result.format.split('/')[1]"></span>
                            </div>
                            <div style="display:flex; gap:8px; margin-top:4px">
                                <button type="button" class="btn" style="min-height:30px;padding:0 14px;font-size:12px" @click="downloadCroppedImage()">Download</button>
                                <button type="button" class="btn" style="min-height:30px;padding:0 14px;font-size:12px" @click="copyCroppedImage()">Copy to Clipboard</button>
                            </div>
                        </div>
                    </div>
                </template>
            </section>

        </div>
    </main>
</div>
@endsection
