// Mohamed Karouch Portfolio - Developer Tools & Command Suite
(function() {

    // Ensure Developer Tools DOM Containers are mounted
    function ensureToolModals() {
        if (!document.getElementById('devConsole')) {
            const div = document.createElement('div');
            div.innerHTML = ``.trim();
            document.body.appendChild(div.firstElementChild);
        }
        if (!document.getElementById('commandPaletteModal')) {
            const div = document.createElement('div');
            div.innerHTML = ``.trim();
            document.body.appendChild(div.firstElementChild);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureToolModals);
    } else {
        ensureToolModals();
    }

    // ==========================================================================
    // 9. DEV CONSOLE TERMINAL (EASTER EGG & TERMINAL TOOL)
    // ==========================================================================
    const devConsole = document.getElementById('devConsole');
    const openTerminalBtn = document.getElementById('openTerminalBtn');
    const closeConsoleBtn = document.getElementById('closeConsoleBtn');
    const consoleOutput = document.getElementById('consoleOutput');
    const consoleInput = document.getElementById('consoleInput');

    function toggleDevConsole() {
        if (!devConsole) return;
        const isVisible = devConsole.classList.contains('visible');
        if (isVisible) {
            devConsole.classList.remove('visible');
        } else {
            devConsole.classList.add('visible');
            if (consoleInput) consoleInput.focus();
        }
    }

    const footerTerminalTrigger = document.getElementById('footerTerminalTrigger');
    if (footerTerminalTrigger) {
        footerTerminalTrigger.addEventListener('click', toggleDevConsole);
    }
    if (openTerminalBtn) {
        openTerminalBtn.addEventListener('click', toggleDevConsole);
    }
    if (closeConsoleBtn) {
        closeConsoleBtn.addEventListener('click', toggleDevConsole);
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
            e.preventDefault();
            toggleDevConsole();
        }
    });

    function appendConsoleMessage(text, type = 'info') {
        if (!consoleOutput) return;
        const p = document.createElement('p');
        if (type === 'command') {
            p.textContent = `guest@mk-portfolio:~$ ${text}`;
            p.style.color = '#10b981';
        } else if (type === 'error') {
            p.textContent = `[Error] ${text}`;
            p.style.color = '#ef4444';
        } else if (type === 'success') {
            p.textContent = text;
            p.style.color = '#34d399';
        } else {
            p.textContent = text;
            p.style.color = '#38bdf8';
        }
        consoleOutput.appendChild(p);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    function executeCommand(cmdLine) {
        const trimmed = cmdLine.trim();
        if (!trimmed) return;
        appendConsoleMessage(trimmed, 'command');

        const parts = trimmed.toLowerCase().split(' ');
        const cmd = parts[0];

        switch (cmd) {
            case 'help':
                appendConsoleMessage("Available Terminal Commands:");
                appendConsoleMessage("  help        - Display list of available commands");
                appendConsoleMessage("  skills      - Inspect core technologies and skills");
                appendConsoleMessage("  services    - Inspect offered services & solutions");
                appendConsoleMessage("  projects    - Summary of featured engineering projects");
                appendConsoleMessage("  about       - Read developer background & bio");
                appendConsoleMessage("  contact     - Display direct contact details");
                appendConsoleMessage("  github      - View GitHub profile and repository");
                appendConsoleMessage("  theme       - Toggle Light / Dark mode");
                appendConsoleMessage("  date        - Current timestamp");
                appendConsoleMessage("  matrix      - Activate cyber terminal simulation");
                appendConsoleMessage("  hire        - Inquire for project availability");
                appendConsoleMessage("  sudo        - Request root permissions");
                appendConsoleMessage("  clear       - Clear terminal screen");
                break;
            case 'services':
                appendConsoleMessage("Services & Solutions Offered:");
                appendConsoleMessage("  1. Custom Web Development — High-performance responsive websites (HTML/CSS/JS).");
                appendConsoleMessage("  2. WordPress & E-Commerce — Custom WooCommerce stores, themes, security & SEO.");
                appendConsoleMessage("  3. Performance & SEO — PageSpeed 90+ tuning, schema JSON-LD, Core Web Vitals.");
                appendConsoleMessage("  4. Python Automation — Custom scrapers, data workflows, APIs & desktop utilities.");
                break;
            case 'skills':
                appendConsoleMessage("Core Stack: WordPress, PHP, JavaScript (ES6+), HTML5, CSS3, SQL, MySQL, Python, C#, R.");
                appendConsoleMessage("Specializations: Responsive design, REST APIs, performance tuning, on-page SEO, automation.");
                break;
            case 'projects':
                appendConsoleMessage("1. Freelance Web Development — Client websites built with WordPress, PHP & SEO.");
                appendConsoleMessage("2. E-Commerce Platform — Custom online clothing store with MySQL database.");
                appendConsoleMessage("3. Piper TTS Converter — Python desktop GUI & Flask API voice synthesizer.");
                appendConsoleMessage("4. Web Scraper — Automated data extraction engine for literature analytics.");
                appendConsoleMessage("5. ADII Customs Internship — Forecasting algorithms & fraud anomaly detection.");
                break;
            case 'about':
                appendConsoleMessage("Mohamed Karouch — Active Freelance Web Developer & Software Engineering student at 1337 Coding School (42 Network, Morocco).");
                appendConsoleMessage("2+ years experience building web apps for SMBs while mastering low-level systems programming in C, algorithms, and Unix architecture.");
                break;
            case 'contact':
                appendConsoleMessage("Email:    karouchmohamed21@gmail.com");
                appendConsoleMessage("Phone:    +212 680-165532 (WhatsApp)");
                appendConsoleMessage("LinkedIn: linkedin.com/in/mohamed-karouch/");
                appendConsoleMessage("GitHub:   github.com/MaximosMK");
                break;
            case 'github':
                appendConsoleMessage("Redirecting to https://github.com/MaximosMK ...");
                window.open('https://github.com/MaximosMK', '_blank');
                break;
            case 'theme':
                const isLight = body.classList.contains('light-theme');
                applyTheme(isLight ? 'dark' : 'light');
                appendConsoleMessage(`Switched theme to ${isLight ? 'dark' : 'light'} mode.`, 'success');
                break;
            case 'clear':
                consoleOutput.innerHTML = '';
                break;
            case 'date':
                appendConsoleMessage(`System time: ${new Date().toLocaleString()}`);
                break;
            case 'hire':
                appendConsoleMessage("Status: Currently OPEN for freelance projects and engineering roles!", 'success');
                appendConsoleMessage("Send an email to karouchmohamed21@gmail.com to start collaborating.");
                break;
            case 'sudo':
                appendConsoleMessage("Nice try! Guest users do not have root access on this portfolio server ;)", 'error');
                break;
            case 'matrix':
                appendConsoleMessage("Follow the white rabbit, Neo... Reality is merely an electrical impulse interpreted by your brain.", 'success');
                break;
            default:
                appendConsoleMessage(`Command not recognized: '${cmd}'. Type 'help' for supported commands.`, 'error');
                break;
        }
    }

    if (consoleInput) {
        consoleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeCommand(consoleInput.value);
                consoleInput.value = '';
            }
        });
    }


    // ==========================================================================
    // 15. INTERACTIVE PROJECT SCOPE & BUDGET CALCULATOR
    // ==========================================================================
    const scopeCalcCard = document.getElementById('scopeCalculator');
    const calcChecks = document.querySelectorAll('.calc-deliverable-check');
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const calcTurnaroundDisplay = document.getElementById('calcTurnaroundDisplay');
    const calcLoadContactBtn = document.getElementById('calcLoadContactBtn');
    const calcWhatsappBtn = document.getElementById('calcWhatsappBtn');

    function recalculateScope() {
        let totalPrice = 0;
        let totalDays = 0;
        let selectedCount = 0;

        calcChecks.forEach(chk => {
            const card = chk.closest('.calc-checkbox-card');
            if (chk.checked) {
                if (card) card.classList.add('active');
                totalPrice += parseInt(chk.dataset.price, 10) || 0;
                totalDays += parseInt(chk.dataset.days, 10) || 0;
                selectedCount++;
            } else {
                if (card) card.classList.remove('active');
            }
        });

        if (calcPriceDisplay) {
            calcPriceDisplay.textContent = `$${totalPrice.toLocaleString()}`;
        }

        if (calcTurnaroundDisplay) {
            if (selectedCount === 0) {
                calcTurnaroundDisplay.textContent = '0 Days';
            } else {
                const minDays = Math.max(3, totalDays - 2);
                const maxDays = totalDays + 2;
                calcTurnaroundDisplay.textContent = `${minDays}–${maxDays} Days`;
            }
        }
    }

    if (calcChecks.length > 0) {
        calcChecks.forEach(chk => {
            chk.addEventListener('change', () => {
                recalculateScope();
                SoundFX.playToggle();
            });
        });
        recalculateScope();
    }

    if (calcLoadContactBtn) {
        calcLoadContactBtn.addEventListener('click', () => {
            const selectedItems = [];
            let totalPrice = 0;
            let totalDays = 0;

            calcChecks.forEach(chk => {
                if (chk.checked) {
                    const name = chk.dataset.name || chk.closest('.calc-checkbox-card')?.querySelector('strong')?.textContent.trim() || 'Deliverable';
                    const price = parseInt(chk.dataset.price, 10) || 0;
                    const days = parseInt(chk.dataset.days, 10) || 0;
                    totalPrice += price;
                    totalDays += days;
                    selectedItems.push(`• ${name} (+$${price}, ~${days}d)`);
                }
            });

            if (selectedItems.length === 0) {
                showToast('Please select at least one deliverable to load.');
                return;
            }

            const minDays = Math.max(3, totalDays - 2);
            const maxDays = totalDays + 2;
            const formattedScope = `Project Scope & Requirements (Built via Estimator):\n` +
                `${selectedItems.join('\n')}\n\n` +
                `Estimated Investment: $${totalPrice.toLocaleString()}\n` +
                `Estimated Turnaround: ${minDays}–${maxDays} Days\n\n` +
                `Additional Notes / Questions:`;

            const senderMessage = document.getElementById('senderMessage');
            if (senderMessage) {
                senderMessage.value = formattedScope;
                senderMessage.dispatchEvent(new Event('input'));
            }

            // Sync budget range chip in contact form
            const budgetChips = document.querySelectorAll('#budgetChipsGroup .proposition-chip');
            budgetChips.forEach(chip => {
                const val = chip.dataset.value;
                let match = false;
                if (totalPrice < 500 && val === '< $500') match = true;
                else if (totalPrice >= 500 && totalPrice <= 1500 && val === '$500 - $1,500') match = true;
                else if (totalPrice > 1500 && totalPrice <= 3000 && val === '$1,500 - $3,000') match = true;
                else if (totalPrice > 3000 && val === '$3,000+') match = true;

                if (match) {
                    budgetChips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    const budgetInput = document.getElementById('budgetRangeInput');
                    if (budgetInput) budgetInput.value = val;
                    const briefBudgetTag = document.getElementById('briefBudgetTag');
                    if (briefBudgetTag) briefBudgetTag.textContent = `Budget: ${val}`;
                }
            });

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (senderMessage) senderMessage.focus();
                }, 600);
            }

            SoundFX.playSuccess();
            showToast('Scope loaded into Project Brief! 🚀');
        });
    }

    if (calcWhatsappBtn) {
        calcWhatsappBtn.addEventListener('click', () => {
            const selectedItems = [];
            let totalPrice = 0;
            let totalDays = 0;

            calcChecks.forEach(chk => {
                if (chk.checked) {
                    const name = chk.dataset.name || chk.closest('.calc-checkbox-card')?.querySelector('strong')?.textContent.trim() || 'Deliverable';
                    const price = parseInt(chk.dataset.price, 10) || 0;
                    const days = parseInt(chk.dataset.days, 10) || 0;
                    totalPrice += price;
                    totalDays += days;
                    selectedItems.push(`- ${name}`);
                }
            });

            if (selectedItems.length === 0) {
                showToast('Please select at least one deliverable for WhatsApp.');
                return;
            }

            const minDays = Math.max(3, totalDays - 2);
            const maxDays = totalDays + 2;
            const msg = `Hi Mohamed! I built a custom project scope via your portfolio estimator:\n\n` +
                `${selectedItems.join('\n')}\n\n` +
                `Estimated Budget: $${totalPrice.toLocaleString()}\n` +
                `Estimated Turnaround: ${minDays}–${maxDays} Days\n\n` +
                `I'd love to discuss kicking off this project!`;

            const waUrl = `https://wa.me/212680165532?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
            SoundFX.playSuccess();
            showToast('Launching WhatsApp with your project scope... 💬');
        });
    }


    // ==========================================================================
    // 16. RAYCAST / LINEAR STYLE COMMAND PALETTE (Ctrl + K / Cmd + K)
    // ==========================================================================
    const paletteModal = document.getElementById('commandPaletteModal');
    const paletteBackdrop = document.getElementById('paletteBackdrop');
    const paletteSearchInput = document.getElementById('paletteSearchInput');
    const paletteResultsList = document.getElementById('paletteResultsList');
    const openPaletteBtn = document.getElementById('openPaletteBtn');

    const COMMAND_ACTIONS = [
        // Navigation Section
        {
            id: 'nav-projects',
            group: 'Navigation',
            icon: '📁',
            label: 'Go to Featured Projects',
            desc: 'Explore web applications, tools & client case studies',
            badge: 'Section',
            keywords: 'projects work portfolio showcase code web python',
            action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'nav-services',
            group: 'Navigation',
            icon: '⚡',
            label: 'Go to Services & Skills',
            desc: 'Full-stack engineering, WordPress, SEO & automation',
            badge: 'Section',
            keywords: 'services skills tech stack abilities offerings wordpress php',
            action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'nav-about',
            group: 'Navigation',
            icon: '👤',
            label: 'Go to About Mohamed',
            desc: 'Background, journey, developer philosophy & 1337 studies',
            badge: 'Section',
            keywords: 'about bio profile background mohamed karouch 1337',
            action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'nav-testimonials',
            group: 'Navigation',
            icon: '⭐',
            label: 'Go to Client Testimonials',
            desc: 'Read verified reviews and recommendations from clients',
            badge: 'Section',
            keywords: 'testimonials reviews feedback clients ratings trust',
            action: () => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'nav-faq',
            group: 'Navigation',
            icon: '❓',
            label: 'Frequently Asked Questions (FAQ)',
            desc: 'Turnaround times, WordPress, pricing, SEO & project workflow',
            badge: 'Section',
            keywords: 'faq questions answers help support turnaround timeline cost pricing wordpress seo',
            action: () => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'nav-contact',
            group: 'Navigation',
            icon: '📬',
            label: 'Go to Contact & Proposition Form',
            desc: 'Direct inquiry, project brief formulation, email or WhatsApp',
            badge: 'Section',
            keywords: 'contact message hire quote email brief proposition talk',
            action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        },

        // Tools & Estimators
        {
            id: 'tool-calculator',
            group: 'Tools & Estimators',
            icon: '🧮',
            label: 'Build Project Scope & Budget (Estimator)',
            desc: 'Interactive checklist for instant investment & turnaround estimate',
            badge: 'Tool',
            keywords: 'calculator scope budget estimate pricing quote estimator deliverables',
            action: () => document.getElementById('scopeCalculator')?.scrollIntoView({ behavior: 'smooth' })
        },
        {
            id: 'tool-resume',
            group: 'Tools & Estimators',
            icon: '📄',
            label: 'Open Resume & Credentials (PDF / Print)',
            desc: 'View comprehensive CV, experience & competencies modal',
            badge: 'Modal',
            keywords: 'resume cv curriculum vitae credentials experience education print',
            action: () => openResumeModal()
        },
        {
            id: 'tool-terminal',
            group: 'Tools & Estimators',
            icon: '💻',
            label: 'Open Developer Terminal Console',
            desc: 'Interactive command shell with help, skills, cat, and clear',
            badge: 'Ctrl+\\',
            keywords: 'terminal console cli shell bash command prompt dev',
            action: () => toggleDevConsole()
        },

        // Fast Communication
        {
            id: 'comm-whatsapp',
            group: 'Direct Communication',
            icon: '💬',
            label: 'Chat Directly on WhatsApp (+212 680-165532)',
            desc: 'Instant direct chat for fast response and proposals',
            badge: 'Direct',
            keywords: 'whatsapp chat call message phone 212680165532',
            action: () => {
                window.open('https://wa.me/212680165532?text=Hi%20Mohamed,%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect!', '_blank', 'noopener,noreferrer');
            }
        },
        {
            id: 'comm-copy-email',
            group: 'Direct Communication',
            icon: '📋',
            label: 'Copy Email Address',
            desc: 'karouchmohamed21@gmail.com',
            badge: 'Copy',
            keywords: 'email copy clipboard address karouchmohamed21 mail',
            action: () => {
                navigator.clipboard.writeText('karouchmohamed21@gmail.com').then(() => {
                    showToast('Email copied to clipboard: karouchmohamed21@gmail.com 📋');
                });
            }
        },

        // User Preferences
        {
            id: 'pref-theme',
            group: 'Preferences',
            icon: '🌓',
            label: 'Toggle Dark / Light Theme',
            desc: 'Switch between dark mode and high-contrast light mode',
            badge: 'Toggle',
            keywords: 'theme dark light mode toggle contrast style',
            action: () => {
                const isLight = document.body.classList.contains('light-theme');
                applyTheme(isLight ? 'dark' : 'light');
                showToast(`Switched to ${isLight ? 'Dark' : 'Light'} Mode`);
            }
        },
        {
            id: 'pref-sound',
            group: 'Preferences',
            icon: '🔊',
            label: 'Toggle Tactile Sound Effects',
            desc: 'Enable or mute Web Audio API micro-interactions',
            badge: 'Toggle',
            keywords: 'sound audio mute effects volume clicks beep tactile',
            action: () => {
                const enabled = SoundFX.toggle();
                updateSoundUI();
                showToast(enabled ? 'Sound Effects Enabled 🔊' : 'Sound Effects Muted 🔇');
            }
        },

        // Case Studies
        {
            id: 'proj-web',
            group: 'Featured Case Studies',
            icon: '💻',
            label: 'Case Study: Freelance Web Development',
            desc: 'PHP, WordPress, JavaScript, and custom REST API endpoints',
            badge: 'Case Study',
            keywords: 'freelance web development wordpress php responsive html css',
            action: () => {
                const card = document.querySelector('[data-project-id="freelance-web"]');
                if (card) openProjectModal(card);
            }
        },
        {
            id: 'proj-ecom',
            group: 'Featured Case Studies',
            icon: '🛒',
            label: 'Case Study: Full-Stack E-Commerce Platform',
            desc: 'Responsive product catalog, transactional cart & checkout',
            badge: 'Case Study',
            keywords: 'ecommerce store cart shop products checkout node',
            action: () => {
                const card = document.querySelector('[data-project-id="ecommerce"]');
                if (card) openProjectModal(card);
            }
        },
        {
            id: 'proj-piper',
            group: 'Featured Case Studies',
            icon: '🎙️',
            label: 'Case Study: Piper TTS Audio Converter',
            desc: 'Localized neural text-to-speech engine using Piper ONNX models',
            badge: 'Case Study',
            keywords: 'piper tts speech text python onnx audio voice synthesis',
            action: () => {
                const card = document.querySelector('[data-project-id="piper-tts"]');
                if (card) openProjectModal(card);
            }
        },
        {
            id: 'proj-scraper',
            group: 'Featured Case Studies',
            icon: '🕷️',
            label: 'Case Study: Web Scraper for WTR-Lab',
            desc: 'Async data extraction with rate limiting & structured JSON export',
            badge: 'Case Study',
            keywords: 'scraper scraping python wtr-lab extraction data crawler beautifulsoup',
            action: () => {
                const card = document.querySelector('[data-project-id="webscraper"]');
                if (card) openProjectModal(card);
            }
        },
        {
            id: 'proj-adii',
            group: 'Featured Case Studies',
            icon: '📊',
            label: 'Case Study: ADII Customs & Tax Analytics',
            desc: 'Regulatory customs data ingestion & automated fiscal reporting',
            badge: 'Case Study',
            keywords: 'adii customs tax tariffs analytics pandas python excel data',
            action: () => {
                const card = document.querySelector('[data-project-id="adii-customs"]');
                if (card) openProjectModal(card);
            }
        }
    ];

    let currentFilteredActions = [...COMMAND_ACTIONS];
    let selectedPaletteIndex = 0;

    function renderCommandPalette(actions) {
        if (!paletteResultsList) return;
        currentFilteredActions = actions;
        selectedPaletteIndex = 0;

        if (actions.length === 0) {
            paletteResultsList.innerHTML = `<div class="palette-empty">No matching commands or actions found for "${paletteSearchInput.value}".</div>`;
            return;
        }

        // Group by group name
        const groups = {};
        actions.forEach((act, idx) => {
            if (!groups[act.group]) groups[act.group] = [];
            groups[act.group].push({ ...act, flatIndex: idx });
        });

        let html = '';
        Object.entries(groups).forEach(([groupName, items]) => {
            html += `<div class="palette-group-title">${groupName}</div>`;
            items.forEach(item => {
                const isSelected = item.flatIndex === selectedPaletteIndex;
                html += `
                    <div class="palette-item ${isSelected ? 'selected' : ''}" 
                         role="option" 
                         data-action-index="${item.flatIndex}"
                         aria-selected="${isSelected ? 'true' : 'false'}">
                        <div class="palette-item-left">
                            <span class="palette-item-icon">${item.icon}</span>
                            <div class="palette-item-info">
                                <span class="palette-item-label">${item.label}</span>
                                <span class="palette-item-desc">${item.desc}</span>
                            </div>
                        </div>
                        <span class="palette-item-badge">${item.badge}</span>
                    </div>
                `;
            });
        });

        paletteResultsList.innerHTML = html;

        // Add click events to items
        const renderedItems = paletteResultsList.querySelectorAll('.palette-item');
        renderedItems.forEach(itemEl => {
            itemEl.addEventListener('click', () => {
                const idx = parseInt(itemEl.dataset.actionIndex, 10);
                executePaletteAction(idx);
            });
            itemEl.addEventListener('mouseenter', () => {
                const idx = parseInt(itemEl.dataset.actionIndex, 10);
                updatePaletteSelection(idx);
            });
        });
    }

    function updatePaletteSelection(newIndex) {
        if (currentFilteredActions.length === 0) return;
        selectedPaletteIndex = (newIndex + currentFilteredActions.length) % currentFilteredActions.length;
        const renderedItems = paletteResultsList.querySelectorAll('.palette-item');
        renderedItems.forEach(item => {
            const idx = parseInt(item.dataset.actionIndex, 10);
            const isSelected = idx === selectedPaletteIndex;
            item.classList.toggle('selected', isSelected);
            item.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            if (isSelected) {
                item.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    function executePaletteAction(index) {
        const actionObj = currentFilteredActions[index];
        if (!actionObj) return;
        closeCommandPalette();
        SoundFX.playSuccess();
        setTimeout(() => {
            actionObj.action();
        }, 150);
    }

    function openCommandPalette() {
        if (!paletteModal) return;
        paletteModal.classList.add('visible');
        document.body.classList.add('modal-open');
        if (paletteSearchInput) {
            paletteSearchInput.value = '';
            renderCommandPalette(COMMAND_ACTIONS);
            setTimeout(() => paletteSearchInput.focus(), 50);
        }
        SoundFX.playPop();
    }

    function closeCommandPalette() {
        if (!paletteModal || !paletteModal.classList.contains('visible')) return;
        paletteModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        SoundFX.playClick();
    }

    function toggleCommandPalette() {
        if (paletteModal && paletteModal.classList.contains('visible')) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
    }

    if (openPaletteBtn) {
        openPaletteBtn.addEventListener('click', openCommandPalette);
    }
    if (paletteBackdrop) {
        paletteBackdrop.addEventListener('click', closeCommandPalette);
    }
    const paletteCloseBtn = document.getElementById('paletteCloseBtn');
    if (paletteCloseBtn) {
        paletteCloseBtn.addEventListener('click', closeCommandPalette);
    }
    const footerPaletteTrigger = document.getElementById('footerPaletteTrigger');
    if (footerPaletteTrigger) {
        footerPaletteTrigger.addEventListener('click', openCommandPalette);
    }
    if (typeof trapFocusInModal === 'function') {
        trapFocusInModal(paletteModal, closeCommandPalette);
    }

    if (paletteSearchInput) {
        paletteSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (!query) {
                renderCommandPalette(COMMAND_ACTIONS);
                return;
            }
            const filtered = COMMAND_ACTIONS.filter(item => 
                item.label.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query) ||
                item.group.toLowerCase().includes(query)
            );
            renderCommandPalette(filtered);
        });

        paletteSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                updatePaletteSelection(selectedPaletteIndex + 1);
                SoundFX.playClick();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                updatePaletteSelection(selectedPaletteIndex - 1);
                SoundFX.playClick();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executePaletteAction(selectedPaletteIndex);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeCommandPalette();
            }
        });
    }

    // Global Keydown Handler for Command Palette (Ctrl/Cmd + K) and Escape
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            toggleCommandPalette();
        } else if (e.key === 'Escape') {
            if (paletteModal && paletteModal.classList.contains('visible')) {
                closeCommandPalette();
            }
        }
    });


    // Expose globals
    window.toggleDevConsole = toggleDevConsole;
    window.closeDevConsole = closeDevConsole;
    window.openCommandPalette = openCommandPalette;
    window.closeCommandPalette = closeCommandPalette;
    window.toggleCommandPalette = toggleCommandPalette;
})();
