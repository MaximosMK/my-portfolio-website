// Mohamed Karouch Portfolio - Interactive Components & Modals
(function() {
    const SoundFX = window.SoundFX || { playClick:()=>{}, playToggle:()=>{}, playPop:()=>{}, playSuccess:()=>{}, toggle:()=>false, isMuted:()=>true };

    // Ensure Modal DOM Containers are mounted
    function ensureComponentModals() {
        if (!document.getElementById('projectModal')) {
            const div = document.createElement('div');
            div.innerHTML = `<!-- Project Details Modal Dialog -->
    <div id="projectModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-backdrop"></div>
        <div class="modal-content glass-card">
            <div class="modal-drag-handle" aria-hidden="true"></div>
            <button class="close-modal-btn" id="closeModalBtn" aria-label="Close modal">&times;</button>
            <div class="modal-image-container">
                <img src="" alt="Project Showcase Screenshot" id="modalScreenshot" class="modal-screenshot" width="750" height="380" loading="lazy">
                <div class="modal-badge-group">
                    <span id="modalCategoryTag" class="modal-category-tag">Project</span>
                    <span id="modalMetricBadge" class="modal-metric-badge"></span>
                </div>
            </div>
            <div class="modal-inner-body">
                <h3 id="modalTitle" class="modal-heading"></h3>

                <!-- Modal Tabs Header -->
                <div class="modal-tabs-header" role="tablist">
                    <button type="button" class="modal-tab-btn active" data-modal-tab="overview" role="tab" aria-selected="true">
                        <span>Architecture &amp; Overview</span>
                    </button>
                    <button type="button" class="modal-tab-btn" data-modal-tab="code" role="tab" aria-selected="false">
                        <span>Code Showcase</span>
                    </button>
                    <button type="button" class="modal-tab-btn" data-modal-tab="deliverables" role="tab" aria-selected="false">
                        <span>Key Deliverables</span>
                    </button>
                </div>

                <!-- Tab 1: Architecture & Overview -->
                <div class="modal-tab-pane active" id="modalTabOverview" role="tabpanel">
                    <div class="modal-section">
                        <h4 class="modal-subheading">Overview &amp; Architecture</h4>
                        <p id="modalDescription" class="modal-text"></p>
                    </div>

                    <div class="modal-section">
                        <h4 class="modal-subheading">Challenges &amp; Solutions</h4>
                        <p id="modalProblems" class="modal-text"></p>
                    </div>
                </div>

                <!-- Tab 2: Code Snippet Showcase -->
                <div class="modal-tab-pane" id="modalTabCode" role="tabpanel">
                    <div class="modal-code-window">
                        <div class="modal-code-header">
                            <div class="window-controls">
                                <span class="control-dot dot-red"></span>
                                <span class="control-dot dot-yellow"></span>
                                <span class="control-dot dot-green"></span>
                            </div>
                            <span class="modal-code-lang" id="modalCodeLang">PHP</span>
                        </div>
                        <pre class="modal-code-pre"><code id="modalCodeSnippet" class="modal-code-snippet"></code></pre>
                    </div>
                </div>

                <!-- Tab 3: Key Deliverables -->
                <div class="modal-tab-pane" id="modalTabDeliverables" role="tabpanel">
                    <ul class="modal-deliverables-checklist" id="modalDeliverablesList">
                    </ul>
                </div>

                <div class="modal-actions-row">
                    <a href="#" id="modalGithubLink" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        <span>GitHub Repository</span>
                    </a>
                    <a href="#" id="modalDemoLink" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        <span>Live Preview</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>`.trim();
            document.body.appendChild(div.firstElementChild);
        }
        if (!document.getElementById('resumeModal')) {
            const div = document.createElement('div');
            div.innerHTML = `<div id="resumeModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="resumeTitle">
        <div class="modal-backdrop"></div>
        <div class="modal-content glass-card resume-modal-card">
            <button class="close-modal-btn" id="closeResumeBtn" aria-label="Close resume modal">&times;</button>
            <div class="resume-modal-header">
                <div>
                    <h3 id="resumeTitle" class="resume-name">Mohamed Karouch</h3>
                    <p class="resume-role">Web Developer &amp; Software Engineer &bull; Morocco</p>
                </div>
                <div class="resume-header-actions">
                    <button type="button" class="btn btn-secondary btn-sm" id="printResumeBtn" title="Print or Save to PDF">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        <span>Print / Save PDF</span>
                    </button>
                </div>
            </div>

            <div class="resume-modal-body">
                <!-- Summary Section -->
                <div class="resume-block">
                    <h4 class="resume-section-title">Executive Summary</h4>
                    <p class="resume-text">
                        Dedicated Web Developer with 2+ years of professional freelance experience designing, building, and maintaining high-performance, SEO-optimized web applications. Currently advancing software engineering mastery as an enrolled student at 1337 Coding School in Morocco (42 Network), specializing in systems programming, memory safety, algorithms, and full-stack web solutions.
                    </p>
                </div>

                <!-- Core Technologies -->
                <div class="resume-block">
                    <h4 class="resume-section-title">Technical Expertise</h4>
                    <div class="resume-skills-categories">
                        <div>
                            <strong>Frontend &amp; CMS:</strong> WordPress, HTML5, CSS3, JavaScript (ES6+), Responsive UI Design, Cross-Browser Compatibility.
                        </div>
                        <div>
                            <strong>Backend &amp; Databases:</strong> PHP, MySQL, SQL, Relational Schema Architecture, REST APIs.
                        </div>
                        <div>
                            <strong>Systems &amp; Languages:</strong> C/C++ (1337 / 42 Network), Python, C#, R.
                        </div>
                        <div>
                            <strong>Tools &amp; Marketing:</strong> Git/GitHub, Yoast SEO, On-Page SEO, Google PageSpeed Optimization, Flask, Tkinter.
                        </div>
                    </div>
                </div>

                <!-- Experience -->
                <div class="resume-block">
                    <h4 class="resume-section-title">Professional Experience</h4>
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <span class="resume-item-title">Freelance Web Developer</span>
                            <span class="resume-item-dates">Oct 2023 – Present</span>
                        </div>
                        <span class="resume-item-subtitle">Self-Employed &bull; Remote</span>
                        <ul class="resume-bullets">
                            <li>Delivered tailored, responsive WordPress and PHP web solutions for SMB clients, driving measurable increases in user engagement and search visibility.</li>
                            <li>Engineered custom layouts, optimized PageSpeed metrics to 90+, and implemented robust on-page SEO structures.</li>
                            <li>Maintained persistent security hardening, backups, and ongoing technical support.</li>
                        </ul>
                    </div>

                    <div class="resume-item">
                        <div class="resume-item-header">
                            <span class="resume-item-title">Software Engineering Intern</span>
                            <span class="resume-item-dates">Sept – Dec 2022</span>
                        </div>
                        <span class="resume-item-subtitle">Moroccan Customs &amp; Indirect Taxes Administration (ADII)</span>
                        <ul class="resume-bullets">
                            <li>Assisted in algorithmic refinement for national budget forecasting models and automated anomaly fraud detection.</li>
                            <li>Tuned complex relational database queries to resolve reporting bottlenecks and ensure transaction precision.</li>
                        </ul>
                    </div>
                </div>

                <!-- Education -->
                <div class="resume-block">
                    <h4 class="resume-section-title">Education &amp; Training</h4>
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <span class="resume-item-title">Software Engineering (42 Network)</span>
                            <span class="resume-item-dates">Current &bull; Present</span>
                        </div>
                        <span class="resume-item-subtitle">1337 Coding School &bull; Morocco</span>
                        <p class="resume-text">Rigorous, peer-to-peer engineering curriculum centered on C systems programming, data structures, memory management, and Unix environment.</p>
                    </div>

                    <div class="resume-item">
                        <div class="resume-item-header">
                            <span class="resume-item-title">Diploma in Informatics Development Techniques</span>
                            <span class="resume-item-dates">2021 – 2022</span>
                        </div>
                        <span class="resume-item-subtitle">ISTA NTIC Syba &bull; Marrakech, Morocco</span>
                    </div>

                    <div class="resume-item">
                        <div class="resume-item-header">
                            <span class="resume-item-title">ALX Software Engineering (Foundations Phase)</span>
                            <span class="resume-item-dates">2024 (2 Months)</span>
                        </div>
                        <span class="resume-item-subtitle">ALX Africa</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`.trim();
            const modalEl = div.firstElementChild;
            document.body.appendChild(modalEl);
            const closeBtn = modalEl.querySelector('#closeResumeBtn');
            if (closeBtn) closeBtn.addEventListener('click', closeResumeModal);
            const backdrop = modalEl.querySelector('.modal-backdrop');
            if (backdrop) backdrop.addEventListener('click', closeResumeModal);
            const printBtn = modalEl.querySelector('#printResumeBtn');
            if (printBtn) printBtn.addEventListener('click', () => window.print());
            if (typeof trapFocusInModal === 'function') trapFocusInModal(modalEl, closeResumeModal);
        }
    }
    ensureComponentModals();

    // ==========================================================================
    // ==========================================================================
    // 7. PROJECT DETAILS MODAL (WITH CODE SHOWCASE & DELIVERABLES TABS)
    // ==========================================================================
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalBackdrop = modal ? modal.querySelector('.modal-backdrop') : null;

    const modalScreenshot = document.getElementById('modalScreenshot');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategoryTag = document.getElementById('modalCategoryTag');
    const modalDescription = document.getElementById('modalDescription');
    const modalProblems = document.getElementById('modalProblems');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalDemoLink = document.getElementById('modalDemoLink');
    const modalMetricBadge = document.getElementById('modalMetricBadge');

    const modalTabBtns = modal ? modal.querySelectorAll('.modal-tab-btn') : [];
    const modalTabPanes = modal ? modal.querySelectorAll('.modal-tab-pane') : [];
    const modalCodeLang = document.getElementById('modalCodeLang');
    const modalCodeSnippet = document.getElementById('modalCodeSnippet');
    const modalDeliverablesList = document.getElementById('modalDeliverablesList');

    const PROJECT_CODE_SNIPPETS = {
        'freelance-web': {
            lang: 'PHP / WordPress',
            code: `<?php
/**
 * Custom REST Route & Post Type for High-Performance Client Web App
 * Engineered for sub-100ms headless and template query speeds.
 */
add_action('rest_api_init', function () {
    register_rest_route('mk-portfolio/v1', '/services', [
        'methods'  => WP_REST_Server::READABLE,
        'callback' => 'mk_get_services_payload',
        'permission_callback' => '__return_true'
    ]);
});

function mk_get_services_payload(WP_REST_Request $request) {
    $cache_key = 'mk_cached_services_data';
    $cached = wp_cache_get($cache_key, 'mk_group');
    if ($cached !== false) {
        return rest_ensure_response($cached);
    }

    $query = new WP_Query([
        'post_type'      => 'service_tier',
        'posts_per_page' => -1,
        'post_status'    => 'publish',
        'no_found_rows'  => true
    ]);

    $data = array_map(function($post) {
        return [
            'id'       => $post->ID,
            'title'    => get_the_title($post->ID),
            'overview' => get_post_meta($post->ID, '_service_overview', true),
            'stack'    => wp_get_post_terms($post->ID, 'tech_stack', ['fields' => 'names'])
        ];
    }, $query->posts);

    wp_cache_set($cache_key, $data, 'mk_group', 3600);
    return rest_ensure_response($data);
}`
        },
        'ecommerce': {
            lang: 'JavaScript / Node.js',
            code: `// Secure Cart & Order Checkout Session Handler
import { db } from '../config/database.js';

export async function processOrderCheckout(cartItems, customerDetails) {
    const client = await db.getClient();
    try {
        await client.query('BEGIN'); // Atomic transaction

        // 1. Verify live stock and compute server-side pricing
        let subtotal = 0;
        for (const item of cartItems) {
            const res = await client.query(
                'SELECT price, inventory_qty FROM products WHERE id = $1 FOR UPDATE',
                [item.id]
            );
            if (!res.rows.length || res.rows[0].inventory_qty < item.qty) {
                throw new Error(\`Insufficient stock for item #\${item.id}\`);
            }
            subtotal += parseFloat(res.rows[0].price) * item.qty;
        }

        // 2. Insert order record with calculated checksum
        const orderRes = await client.query(
            \`INSERT INTO orders (customer_email, total_amount, status, created_at)
             VALUES ($1, $2, 'processing', NOW()) RETURNING id\`,
            [customerDetails.email, subtotal]
        );

        // 3. Decrement reserved inventory
        for (const item of cartItems) {
            await client.query(
                'UPDATE products SET inventory_qty = inventory_qty - $1 WHERE id = $2',
                [item.qty, item.id]
            );
        }

        await client.query('COMMIT');
        return { success: true, orderId: orderRes.rows[0].id, total: subtotal };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}`
        },
        'piper-tts': {
            lang: 'Python / ONNX',
            code: `import wave
from pathlib import Path
from piper import PiperVoice

class TTSAudioEngine:
    """High-speed localized text-to-speech converter using Piper ONNX models."""
    
    def __init__(self, model_path: str, config_path: str):
        self.model_path = Path(model_path)
        self.config_path = Path(config_path)
        self.voice = PiperVoice.load(str(self.model_path), str(self.config_path))
        print(f"[TTS] Loaded localized model at {self.voice.sample_rate}Hz")

    def synthesize_to_wav(self, text: str, output_path: str, speaker_id: int = 0):
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with wave.open(output_path, "wb") as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)  # 16-bit PCM
            wav_file.setframerate(self.voice.sample_rate)
            
            # Stream low-latency audio chunks directly
            for audio_bytes in self.voice.synthesize_stream_raw(text, speaker_id=speaker_id):
                wav_file.writeframes(audio_bytes)
                
        return {"status": "success", "file": output_path, "sample_rate": self.voice.sample_rate}`
        },
        'webscraper': {
            lang: 'Python / AsyncIO',
            code: `import asyncio
import aiohttp
from bs4 import BeautifulSoup
from typing import List, Dict

class WTRLabScraper:
    """Async multi-worker web scraping pipeline with exponential backoff."""

    def __init__(self, base_url: str, concurrency_limit: int = 5):
        self.base_url = base_url
        self.semaphore = asyncio.Semaphore(concurrency_limit)
        self.headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    async def fetch_page(self, session: aiohttp.ClientSession, url: str) -> str:
        async with self.semaphore:
            for attempt in range(3):
                try:
                    async with session.get(url, headers=self.headers, timeout=12) as response:
                        if response.status == 200:
                            return await response.text()
                except Exception:
                    await asyncio.sleep(2 ** attempt)
            return ""

    def parse_records(self, html: str) -> List[Dict]:
        soup = BeautifulSoup(html, "html.parser")
        entries = []
        for card in soup.select(".record-row"):
            title = card.select_one(".title-col")
            meta = card.select_one(".meta-badge")
            if title:
                entries.append({
                    "title": title.get_text(strip=True),
                    "status": meta.get_text(strip=True) if meta else "N/A"
                })
        return entries`
        },
        'adii-customs': {
            lang: 'Python / Pandas',
            code: `import pandas as pd
import numpy as np

def analyze_customs_tariffs(file_path: str) -> pd.DataFrame:
    """
    Automated data cleansing and tax tariff classification pipeline
    for ADII Customs & Indirect Taxes regulatory datasets.
    """
    # Load raw customs declarations
    df = pd.read_excel(file_path, sheet_name="Declarations_2024")
    
    # 1. Clean tariff code syntax and filter valid chapters
    df['hs_code'] = df['CODE_SH'].astype(str).str.replace(r'[^0-9]', '', regex=True)
    df = df[df['hs_code'].str.len() >= 6].copy()
    
    # 2. Vectorized calculation of duty rates & VAT liability
    df['calculated_duty'] = np.where(
        df['IMPORT_ORIGIN'] == 'EU',
        df['VALEUR_DECLAREE'] * df['TAUX_PREFERENTIEL'],
        df['VALEUR_DECLAREE'] * df['TAUX_GENERAL']
    )
    df['total_tax_liability'] = df['calculated_duty'] + (df['VALEUR_DECLAREE'] * 0.20)
    
    # 3. Aggregate fiscal volume by economic sector
    summary = df.groupby('SECTEUR_ACTIVITE').agg({
        'hs_code': 'count',
        'VALEUR_DECLAREE': 'sum',
        'total_tax_liability': 'sum'
    }).rename(columns={'hs_code': 'dossier_count'})
    
    return summary`
        }
    };

    const PROJECT_DELIVERABLES = {
        'freelance-web': [
            'Bespoke mobile-first responsive frontend built with semantic HTML5, CSS3, and modern JavaScript',
            'Custom WordPress theme & REST API endpoints optimized for PageSpeed 95+ scores',
            'Interactive client contact workflow and automated lead routing',
            'Full SEO metadata schema markup, OpenGraph cards, and Core Web Vitals optimization',
            'Milestone-driven delivery with cross-browser testing across Safari, Chrome, and Firefox'
        ],
        'ecommerce': [
            'Full-featured product catalog with faceted category filtering and search',
            'Responsive shopping cart with atomic stock validation and session persistence',
            'Multi-step checkout flow with form validation and feedback notifications',
            'Secure transactional database schema with rollback guarantees',
            'Mobile payment UI layout optimized for fast conversion'
        ],
        'piper-tts': [
            'Neural text-to-speech conversion pipeline leveraging lightweight Piper ONNX models',
            'Sub-second voice synthesis with zero cloud API latency or ongoing costs',
            'Custom voice model configuration and multi-speaker pitch adjustment',
            'Batch export and automated WAV audio stream generation',
            'Intuitive CLI & GUI wrapper for local desktop operation'
        ],
        'webscraper': [
            'Asynchronous multi-worker data extraction engine using aiohttp & BeautifulSoup',
            'Automated rate-limiting and exponential backoff retry algorithms to avoid blocking',
            'Clean data normalization and JSON / CSV export pipeline',
            'Headless browser automation for dynamic JavaScript-rendered pages',
            'Continuous execution logging and error diagnostics dashboard'
        ],
        'adii-customs': [
            'Automated data ingestion and sanitization for complex customs import/export ledgers',
            'Vectorized tariff calculation rules adhering to Moroccan ADII regulatory schedules',
            'Executive summary dashboards detailing revenue, duties, and sector distributions',
            'High-speed Excel and CSV reporting output saving hours of manual calculation',
            'Data integrity validation ensuring zero rounding drift in fiscal figures'
        ]
    };

    // Tab switching event bindings
    modalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabTarget = btn.dataset.modalTab;
            modalTabBtns.forEach(b => {
                const isActive = b === btn;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            modalTabPanes.forEach(pane => {
                pane.classList.toggle('active', pane.id === `modalTab${tabTarget.charAt(0).toUpperCase() + tabTarget.slice(1)}`);
            });
            SoundFX.playClick();
        });
    });

    function openProjectModal(card) {
        if (!modal) return;

        const projectId = card.dataset.projectId || '';

        modalTitle.textContent = card.dataset.modalTitle || 'Project Details';
        modalCategoryTag.textContent = card.dataset.modalTag || 'Featured Project';
        modalDescription.textContent = card.dataset.modalDescription || 'No description provided.';
        modalProblems.textContent = card.dataset.modalProblems || 'Comprehensive architecture engineered to solve key client requirements.';

        // Populate Code Showcase
        const snippetData = PROJECT_CODE_SNIPPETS[projectId];
        if (modalCodeLang && modalCodeSnippet) {
            if (snippetData) {
                modalCodeLang.textContent = snippetData.lang;
                modalCodeSnippet.textContent = snippetData.code;
            } else {
                modalCodeLang.textContent = 'Code';
                modalCodeSnippet.textContent = '// Full source code available via client repository / portfolio demo';
            }
        }

        // Populate Key Deliverables Checklist
        if (modalDeliverablesList) {
            const deliverables = PROJECT_DELIVERABLES[projectId] || [
                'Complete responsive frontend engineering and performance tuning',
                'Modular maintainable backend integrations and database schemas',
                'Comprehensive client documentation and deployment handover'
            ];
            modalDeliverablesList.innerHTML = deliverables.map(item => `
                <li class="modal-deliverable-item">
                    <span class="modal-deliverable-icon">✓</span>
                    <span>${item}</span>
                </li>
            `).join('');
        }

        // Reset tabs to Overview by default
        modalTabBtns.forEach(btn => {
            const isOverview = btn.dataset.modalTab === 'overview';
            btn.classList.toggle('active', isOverview);
            btn.setAttribute('aria-selected', isOverview ? 'true' : 'false');
        });
        modalTabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === 'modalTabOverview');
        });

        if (card.dataset.modalMetric && modalMetricBadge) {
            modalMetricBadge.textContent = card.dataset.modalMetric;
            modalMetricBadge.style.display = 'inline-flex';
        } else if (modalMetricBadge) {
            modalMetricBadge.style.display = 'none';
        }

        if (card.dataset.modalScreenshot) {
            modalScreenshot.src = card.dataset.modalScreenshot;
            modalScreenshot.style.display = 'block';
        } else {
            modalScreenshot.style.display = 'none';
        }

        if (card.dataset.modalGithub && card.dataset.modalGithub !== '#') {
            modalGithubLink.href = card.dataset.modalGithub;
            modalGithubLink.style.display = 'inline-flex';
        } else {
            modalGithubLink.style.display = 'none';
        }

        if (card.dataset.modalDemo && card.dataset.modalDemo !== '#') {
            modalDemoLink.href = card.dataset.modalDemo;
            modalDemoLink.style.display = 'inline-flex';
        } else {
            modalDemoLink.style.display = 'none';
        }

        const pModal = document.getElementById('projectModal');
        if (pModal) pModal.classList.add('visible');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        if (typeof SoundFX !== 'undefined' && SoundFX.playPop) SoundFX.playPop();
    }

    function closeProjectModal() {
        const pModal = document.getElementById('projectModal');
        if (pModal) pModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        if (typeof SoundFX !== 'undefined' && SoundFX.playClick) SoundFX.playClick();
    }

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openProjectModal(card);
        });
    });

    const cModalBtn = document.getElementById('closeModalBtn');
    if (cModalBtn) cModalBtn.addEventListener('click', closeProjectModal);
    const mBackdrop = document.querySelector('#projectModal .modal-backdrop');
    if (mBackdrop) mBackdrop.addEventListener('click', closeProjectModal);

    // Resume Modal Elements & Handlers
    function openResumeModal() {
        ensureComponentModals();
        const rModal = document.getElementById('resumeModal');
        if (!rModal) return;
        rModal.classList.add('visible');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        const rModal = document.getElementById('resumeModal');
        if (!rModal) return;
        rModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    const openResumeBtn = document.getElementById('openResumeBtn');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const footerResumeTrigger = document.getElementById('footerResumeTrigger');
    if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
    if (footerResumeTrigger) footerResumeTrigger.addEventListener('click', openResumeModal);

    // Modal Focus Trap Helper for Enterprise Accessibility
    function trapFocusInModal(modalEl, closeCallback) {
        if (!modalEl) return;
        modalEl.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusables = modalEl.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
                if (focusables.length === 0) return;
                const first = focusables[0];
                const last = focusables[focusables.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') {
                if (typeof closeCallback === 'function') closeCallback();
            }
        });
    }

    trapFocusInModal(modal, closeProjectModal);
    trapFocusInModal(document.getElementById('resumeModal'), closeResumeModal);


    // ==========================================================================
    // 8. DESIGN LAB INTERACTIVE EXPERIMENTS
    // ==========================================================================
    
    // Experiment 1: 3D Tilt Card with Glare
    const tiltContainer = document.getElementById('tiltCardContainer');
    const tiltCard = document.getElementById('tiltCard');

    if (tiltContainer && tiltCard) {
        tiltContainer.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            const glareX = (x / rect.width) * 100;
            const glareY = (y / rect.height) * 100;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            tiltCard.style.setProperty('--glare-x', `${glareX}%`);
            tiltCard.style.setProperty('--glare-y', `${glareY}%`);
        });

        tiltContainer.addEventListener('mouseleave', () => {
            tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    // Experiment 2: Cursor Spotlight Background
    const reactiveSpotlight = document.getElementById('reactiveSpotlight');
    const coordDisplay = document.getElementById('coordDisplay');

    if (reactiveSpotlight) {
        reactiveSpotlight.addEventListener('mousemove', (e) => {
            const rect = reactiveSpotlight.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            reactiveSpotlight.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
            reactiveSpotlight.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);

            if (coordDisplay) {
                coordDisplay.textContent = `X: ${x.toFixed(0)}% | Y: ${y.toFixed(0)}%`;
            }
        });
    }

    // Experiment 3: 3D Interactive Tech Cube
    const cubeField = document.getElementById('geometricFieldContainer');
    const techCube = document.getElementById('techCube');

    if (cubeField && techCube) {
        let currentRotX = -20;
        let currentRotY = 30;

        cubeField.addEventListener('mousemove', (e) => {
            const rect = cubeField.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - rect.width / 2;
            const mouseY = e.clientY - rect.top - rect.height / 2;

            currentRotY = 30 + (mouseX / (rect.width / 2)) * 50;
            currentRotX = -20 - (mouseY / (rect.height / 2)) * 50;

            techCube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
        });

        cubeField.addEventListener('mouseleave', () => {
            currentRotX = -20;
            currentRotY = 30;
            techCube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
        });
    }


    // ==========================================================================
    // 12. HIGH-PERFORMANCE PARTICLE CANVAS
    // ==========================================================================
    const canvas = document.getElementById('globalParticleCanvas');
    if (canvas && typeof canvas.getContext === 'function') {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let particles = [];
        let animationFrameId;
        let isPageVisible = true;

        const DPR = window.devicePixelRatio || 1;
        let width = window.innerWidth;
        let height = window.innerHeight;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * DPR;
            canvas.height = height * DPR;
            ctx.scale(DPR, DPR);
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(color) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        }

        let particleColor = 'rgba(139, 92, 246, 0.4)';
        let lineColor = 'rgba(139, 92, 246, 0.08)';

        function reInitParticleColors() {
            const isLight = document.body && document.body.classList.contains('light-theme');
            particleColor = isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(139, 92, 246, 0.45)';
            lineColor = isLight ? 'rgba(99, 102, 241, 0.04)' : 'rgba(139, 92, 246, 0.08)';
        }
        window.reInitParticleColors = reInitParticleColors;
        reInitParticleColors();

        function initParticles() {
            particles = [];
            // Target ~45 particles for smooth 60fps rendering without battery drain
            const count = Math.min(50, Math.floor((width * height) / 25000));
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        function renderParticles() {
            if (!isPageVisible) return;
            ctx.clearRect(0, 0, width, height);

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particles.forEach(p => {
                p.update();
                p.draw(particleColor);
            });

            animationFrameId = requestAnimationFrame(renderParticles);
        }

        resizeCanvas();
        initParticles();
        renderParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        }, { passive: true });

        // Pause animation when tab is inactive to save battery & CPU
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isPageVisible = false;
                cancelAnimationFrame(animationFrameId);
            } else {
                isPageVisible = true;
                renderParticles();
            }
        });
    }


    // ==========================================================================
    // 13. HERO CODE WINDOW 3D PERSPECTIVE TILT (DESKTOP / POINTER ONLY)
    // ==========================================================================
    const isTouchDevice = typeof window.matchMedia === 'function' ? window.matchMedia('(hover: none) or (pointer: coarse)').matches : false;
    const heroCodeWrapper = document.getElementById('heroCodeCardWrapper');
    const heroCodeWindow = document.getElementById('heroCodeWindow');

    if (heroCodeWrapper && heroCodeWindow && !isTouchDevice) {
        let isHovered = false;

        heroCodeWrapper.addEventListener('mouseenter', () => {
            isHovered = true;
            heroCodeWindow.style.transition = 'transform 0.1s ease-out';
        });

        heroCodeWrapper.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = heroCodeWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Maximum tilt: ~7 degrees
            const rotateX = (-(y / (rect.height / 2)) * 7).toFixed(2);
            const rotateY = ((x / (rect.width / 2)) * 7).toFixed(2);

            heroCodeWindow.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        heroCodeWrapper.addEventListener('mouseleave', () => {
            isHovered = false;
            heroCodeWindow.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            heroCodeWindow.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    }

    // ==========================================================================
    // 14. LINEAR / RAYCAST DYNAMIC CURSOR BORDER-GLOW (DESKTOP ONLY)
    // ==========================================================================
    if (!isTouchDevice) {
        const glowCards = document.querySelectorAll(
            '.project-card, .service-card, .skill-card, .metrics-strip, .hero-code-window, .metric-card, .testimonial-card, .scope-calculator-card'
        );

        glowCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }, { passive: true });
        });
    }


    // Expose globals
    window.openProjectModal = openProjectModal;
    window.closeProjectModal = closeProjectModal;
    window.openResumeModal = openResumeModal;
    window.closeResumeModal = closeResumeModal;
})();
