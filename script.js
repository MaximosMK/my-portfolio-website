/**
 * ==========================================================================
 * MOHAMED KAROUCH — PORTFOLIO CORE JAVASCRIPT
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Dynamic Copyright Year ---
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Initialize AOS (Animate On Scroll) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 80,
            easing: 'ease-out-cubic'
        });
    }

    // ==========================================================================
    // 1. THEME TOGGLE FUNCTIONALITY
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const STORAGE_KEY = 'mk_portfolio_theme';

    function applyTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-theme');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem(STORAGE_KEY, 'light');
        } else {
            body.classList.remove('light-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem(STORAGE_KEY, 'dark');
        }
        if (typeof reInitParticleColors === 'function') {
            reInitParticleColors();
        }
    }

    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'light') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            applyTheme(isLight ? 'dark' : 'light');
            showToast(`Switched to ${isLight ? 'Dark' : 'Light'} Mode`);
        });
    }

    // ==========================================================================
    // 2. MOBILE NAVIGATION & SCROLLSPY
    // ==========================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primaryNavigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const header = document.getElementById('mainHeader');

    if (mobileNavToggle && primaryNav) {
        function closeMobileNav() {
            primaryNav.classList.remove('nav-visible');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }

        mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = primaryNav.classList.contains('nav-visible');
            if (isOpen) {
                closeMobileNav();
            } else {
                primaryNav.classList.add('nav-visible');
                mobileNavToggle.setAttribute('aria-expanded', 'true');
                document.body.classList.add('nav-open');
            }
        });

        // Close nav when clicking on any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        // Close nav when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (primaryNav.classList.contains('nav-visible') && 
                !primaryNav.contains(e.target) && 
                !mobileNavToggle.contains(e.target)) {
                closeMobileNav();
            }
        });
    }

    // Scrollspy navigation active state
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    // Scroll-to-Top Button & Reading Progress Indicator
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollProgressBar = document.getElementById('scrollProgressBar');

    function updateScrollProgress() {
        if (!scrollProgressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    function handleScrollEvents() {
        updateActiveNavLink();
        updateScrollProgress();

        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScrollEvents, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 3. TOAST NOTIFICATION UTILITY
    // ==========================================================================
    const toastEl = document.getElementById('toastNotification');
    let toastTimeout;

    function showToast(message) {
        if (!toastEl) return;
        toastEl.textContent = message;
        toastEl.classList.add('active');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('active');
        }, 3000);
    }

    // Quick Copy to Clipboard Buttons
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');

    function setupCopyButton(btn, label) {
        if (!btn) return;
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`${label} copied to clipboard! 📋✨`);
            }).catch(() => {
                showToast(`Failed to copy to clipboard`);
            });
        });
    }

    setupCopyButton(copyEmailBtn, 'Email address');
    setupCopyButton(copyPhoneBtn, 'Phone number');

    // ==========================================================================
    // 4. GSAP HERO TYPEWRITER
    // ==========================================================================
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline && typeof gsap !== 'undefined') {
        const quotes = [
            "\"Turning ideas into digital reality with code.\"",
            "\"Building scalable web apps & modern digital solutions.\"",
            "\"Specializing in WordPress, PHP, JavaScript, and Python.\""
        ];

        let quoteIndex = 0;
        function cycleHeroQuotes() {
            gsap.to(heroTagline, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    quoteIndex = (quoteIndex + 1) % quotes.length;
                    heroTagline.textContent = quotes[quoteIndex];
                    gsap.to(heroTagline, { opacity: 1, duration: 0.5 });
                }
            });
        }

        // Cycle quote every 6 seconds
        setInterval(cycleHeroQuotes, 6000);
    }

    // ==========================================================================
    // 5. SKILLS FILTER FUNCTIONALITY
    // ==========================================================================
    const skillFilterBtns = document.querySelectorAll('.skills-filter-controls .filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    if (skillFilterBtns.length && skillCards.length) {
        skillFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                skillFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filter === 'all' || cardCategory === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 6. PROJECTS FILTER FUNCTIONALITY
    // ==========================================================================
    const projectFilterBtns = document.querySelectorAll('.project-filter-controls .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectFilterBtns.length && projectCards.length) {
        projectFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                projectFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-project-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-project-category');
                    if (filter === 'all' || cardCategory === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 7. PROJECT DETAILS MODAL
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

    function openProjectModal(card) {
        if (!modal) return;

        modalTitle.textContent = card.dataset.modalTitle || 'Project Details';
        modalCategoryTag.textContent = card.dataset.modalTag || 'Featured Project';
        modalDescription.textContent = card.dataset.modalDescription || 'No description provided.';
        modalProblems.textContent = card.dataset.modalProblems || 'Comprehensive architecture engineered to solve key client requirements.';

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

        modal.classList.add('visible');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            openProjectModal(card);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    // Resume Modal Elements & Handlers
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');
    const printResumeBtn = document.getElementById('printResumeBtn');
    const resumeModalBackdrop = resumeModal ? resumeModal.querySelector('.modal-backdrop') : null;

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add('visible');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openResumeModal);
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResumeModal);
    if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResumeModal);
    if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResumeModal);
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('visible')) {
                closeProjectModal();
            }
            if (resumeModal && resumeModal.classList.contains('visible')) {
                closeResumeModal();
            }
        }
    });

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

    if (openTerminalBtn) {
        openTerminalBtn.addEventListener('click', toggleDevConsole);
    }
    if (closeConsoleBtn) {
        closeConsoleBtn.addEventListener('click', toggleDevConsole);
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === '\\' || e.key === 'k' || e.key === 'K')) {
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
    // 10. SERVICES AUTO-SELECTION, CHIPS & LIVE PROPOSITION BRIEF
    // ==========================================================================
    const serviceTypeInput = document.getElementById('serviceTypeInput');
    const budgetRangeInput = document.getElementById('budgetRangeInput');
    const timelineInput = document.getElementById('timelineInput');

    const serviceChipsGroup = document.getElementById('serviceChipsGroup');
    const budgetChipsGroup = document.getElementById('budgetChipsGroup');
    const timelineChipsGroup = document.getElementById('timelineChipsGroup');

    const briefTurnaroundBadge = document.getElementById('briefTurnaroundBadge');
    const briefServiceTag = document.getElementById('briefServiceTag');
    const briefBudgetTag = document.getElementById('briefBudgetTag');
    const briefTimelineTag = document.getElementById('briefTimelineTag');

    function updateLiveBrief() {
        const activeServiceChip = serviceChipsGroup ? serviceChipsGroup.querySelector('.proposition-chip.active') : null;
        const activeBudgetChip = budgetChipsGroup ? budgetChipsGroup.querySelector('.proposition-chip.active') : null;
        const activeTimelineChip = timelineChipsGroup ? timelineChipsGroup.querySelector('.proposition-chip.active') : null;

        const serviceVal = activeServiceChip ? activeServiceChip.getAttribute('data-value') : (serviceTypeInput ? serviceTypeInput.value : 'Custom Web Development');
        const turnaroundVal = activeServiceChip ? activeServiceChip.getAttribute('data-turnaround') : '~1-2 Weeks';
        const budgetVal = activeBudgetChip ? activeBudgetChip.getAttribute('data-value') : (budgetRangeInput ? budgetRangeInput.value : '$500 - $1,500');
        const timelineVal = activeTimelineChip ? activeTimelineChip.getAttribute('data-value') : (timelineInput ? timelineInput.value : 'Standard (2-4 weeks)');

        if (serviceTypeInput) serviceTypeInput.value = serviceVal;
        if (budgetRangeInput) budgetRangeInput.value = budgetVal;
        if (timelineInput) timelineInput.value = timelineVal;

        if (briefTurnaroundBadge) briefTurnaroundBadge.textContent = turnaroundVal;
        if (briefServiceTag) briefServiceTag.textContent = serviceVal;
        if (briefBudgetTag) briefBudgetTag.textContent = `Budget: ${budgetVal}`;
        if (briefTimelineTag) briefTimelineTag.textContent = `Timeline: ${timelineVal}`;
    }

    function setupChipGroup(groupEl, inputEl) {
        if (!groupEl) return;
        const chips = groupEl.querySelectorAll('.proposition-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                if (inputEl) inputEl.value = chip.getAttribute('data-value');
                updateLiveBrief();
            });
        });
    }

    function setChipActive(groupEl, inputEl, matchValue) {
        if (!groupEl || !matchValue) return;
        const chips = groupEl.querySelectorAll('.proposition-chip');
        let matched = false;
        const normalizedMatch = matchValue.toLowerCase().trim();

        chips.forEach(chip => {
            const val = (chip.getAttribute('data-value') || '').toLowerCase().trim();
            if (!matched && (val === normalizedMatch || val.includes(normalizedMatch) || normalizedMatch.includes(val))) {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                if (inputEl) inputEl.value = chip.getAttribute('data-value');
                matched = true;
            }
        });

        updateLiveBrief();
    }

    setupChipGroup(serviceChipsGroup, serviceTypeInput);
    setupChipGroup(budgetChipsGroup, budgetRangeInput);
    setupChipGroup(timelineChipsGroup, timelineInput);
    updateLiveBrief();

    // Proposition Routing from Services Section Cards
    const serviceActionBtns = document.querySelectorAll('.service-action-btn');
    serviceActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetService = btn.getAttribute('data-service-select');
            const targetBudget = btn.getAttribute('data-budget-select');
            const targetTimeline = btn.getAttribute('data-timeline-select');

            if (targetService) setChipActive(serviceChipsGroup, serviceTypeInput, targetService);
            if (targetBudget) setChipActive(budgetChipsGroup, budgetRangeInput, targetBudget);
            if (targetTimeline) setChipActive(timelineChipsGroup, timelineInput, targetTimeline);

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            const nameInput = document.getElementById('senderName');
            if (nameInput) {
                setTimeout(() => nameInput.focus(), 600);
            }
            showToast('Proposition loaded! Ready to tailor your brief ✨');
        });
    });

    // ==========================================================================
    // 11. CONTACT INQUIRY FORM VALIDATION & MULTI-ACTION DISPATCH
    // ==========================================================================
    const contactForm = document.getElementById('contactInquiryForm');
    const senderName = document.getElementById('senderName');
    const senderEmail = document.getElementById('senderEmail');
    const senderMessage = document.getElementById('senderMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const whatsappInquiryBtn = document.getElementById('whatsappInquiryBtn');
    const copyBriefBtn = document.getElementById('copyBriefBtn');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkFormValidity(showErrors = true) {
        let isValid = true;
        const nameVal = senderName ? senderName.value.trim() : '';
        const emailVal = senderEmail ? senderEmail.value.trim() : '';
        const messageVal = senderMessage ? senderMessage.value.trim() : '';

        if (!nameVal) {
            if (showErrors) {
                if (senderName) senderName.classList.add('is-invalid');
                if (nameError) nameError.classList.add('visible');
            }
            isValid = false;
        }

        if (!emailVal || !validateEmail(emailVal)) {
            if (showErrors) {
                if (senderEmail) senderEmail.classList.add('is-invalid');
                if (emailError) emailError.classList.add('visible');
            }
            isValid = false;
        }

        if (!messageVal) {
            if (showErrors) {
                if (senderMessage) senderMessage.classList.add('is-invalid');
                if (messageError) messageError.classList.add('visible');
            }
            isValid = false;
        }

        return {
            isValid,
            nameVal,
            emailVal,
            messageVal,
            serviceVal: serviceTypeInput ? serviceTypeInput.value : 'Custom Web Development',
            budgetVal: budgetRangeInput ? budgetRangeInput.value : '$500 - $1,500',
            timelineVal: timelineInput ? timelineInput.value : 'Standard (2-4 weeks)'
        };
    }

    if (senderName) {
        senderName.addEventListener('input', () => {
            senderName.classList.remove('is-invalid');
            if (nameError) nameError.classList.remove('visible');
        });
    }
    if (senderEmail) {
        senderEmail.addEventListener('input', () => {
            senderEmail.classList.remove('is-invalid');
            if (emailError) emailError.classList.remove('visible');
        });
    }
    if (senderMessage) {
        senderMessage.addEventListener('input', () => {
            senderMessage.classList.remove('is-invalid');
            if (messageError) messageError.classList.remove('visible');
        });
    }

    // Action 1: Email Dispatch (Form Submit)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = checkFormValidity(true);

            if (!data.isValid) {
                showToast('Please correct highlighted fields before submitting.');
                return;
            }

            const subject = encodeURIComponent(`Project Inquiry: ${data.serviceVal} (${data.nameVal})`);
            const body = encodeURIComponent(
                `Hi Mohamed,\n\n` +
                `I would like to discuss a project proposition with you:\n\n` +
                `Name: ${data.nameVal}\n` +
                `Email: ${data.emailVal}\n` +
                `Service Proposition: ${data.serviceVal}\n` +
                `Estimated Budget: ${data.budgetVal}\n` +
                `Estimated Timeline: ${data.timelineVal}\n\n` +
                `Project Details:\n${data.messageVal}\n\n` +
                `Best regards,\n${data.nameVal}`
            );

            showToast('Opening email client with your proposition... 🚀');
            window.location.href = `mailto:karouchmohamed21@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // Action 2: WhatsApp Chat Dispatch
    if (whatsappInquiryBtn) {
        whatsappInquiryBtn.addEventListener('click', () => {
            const data = checkFormValidity(false);
            const clientName = data.nameVal ? data.nameVal : 'a client';
            const emailPart = data.emailVal ? ` (${data.emailVal})` : '';

            let waText = `Hi Mohamed! I'm ${clientName}${emailPart}.\n\n`;
            waText += `I'd like to discuss a project proposition:\n`;
            waText += `📌 Service: ${data.serviceVal}\n`;
            waText += `💰 Budget: ${data.budgetVal}\n`;
            waText += `⏳ Timeline: ${data.timelineVal}\n`;

            if (data.messageVal) {
                waText += `\nBrief Notes:\n${data.messageVal}`;
            }

            const waUrl = `https://wa.me/212680165532?text=${encodeURIComponent(waText)}`;
            showToast('Launching WhatsApp chat with Mohamed... 💬');
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Action 3: Copy Formatted Brief to Clipboard
    if (copyBriefBtn) {
        copyBriefBtn.addEventListener('click', () => {
            const data = checkFormValidity(false);
            const briefContent =
                `📋 PROJECT PROPOSITION BRIEF\n` +
                `------------------------------------\n` +
                `• Service: ${data.serviceVal}\n` +
                `• Budget Range: ${data.budgetVal}\n` +
                `• Estimated Timeline: ${data.timelineVal}\n` +
                `• Client Name: ${data.nameVal || 'Not specified'}\n` +
                `• Contact Email: ${data.emailVal || 'Not specified'}\n` +
                `• Project Notes: ${data.messageVal || 'Consultation / Kick-off discussion'}\n` +
                `------------------------------------\n` +
                `Target Developer: Mohamed Karouch (karouchmohamed21@gmail.com | +212 680-165532)`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(briefContent).then(() => {
                    showToast('Proposition brief copied to clipboard! 📋✨');
                }).catch(() => {
                    showToast('Could not copy brief to clipboard.');
                });
            } else {
                showToast('Clipboard access unavailable.');
            }
        });
    }

    // ==========================================================================
    // 12. HIGH-PERFORMANCE PARTICLE CANVAS
    // ==========================================================================
    const canvas = document.getElementById('globalParticleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
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

        window.reInitParticleColors = function() {
            const isLight = document.body.classList.contains('light-theme');
            particleColor = isLight ? 'rgba(99, 102, 241, 0.35)' : 'rgba(139, 92, 246, 0.45)';
            lineColor = isLight ? 'rgba(99, 102, 241, 0.08)' : 'rgba(139, 92, 246, 0.08)';
        };
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
    // 12. HIGH-IMPACT METRICS COUNTER ANIMATION
    // ==========================================================================
    const metricCounts = document.querySelectorAll('.metric-count');
    const metricsStrip = document.querySelector('.metrics-strip');

    if (metricCounts.length > 0 && metricsStrip) {
        let hasAnimatedMetrics = false;

        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            const duration = 1800;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic curve
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                el.textContent = currentVal;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    el.textContent = target;
                }
            };

            requestAnimationFrame(updateCount);
        };

        const metricsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedMetrics) {
                    hasAnimatedMetrics = true;
                    metricCounts.forEach(el => animateCounter(el));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25
        });

        metricsObserver.observe(metricsStrip);
    }

    // ==========================================================================
    // 13. HERO CODE WINDOW 3D PERSPECTIVE TILT (DESKTOP / POINTER ONLY)
    // ==========================================================================
    const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
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
            '.project-card, .service-card, .skill-card, .metrics-strip, .hero-code-window, .metric-card, .testimonial-card'
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

    // ==========================================================================
    // 15. PROGRESSIVE WEB APP (PWA) SERVICE WORKER REGISTRATION
    // ==========================================================================
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('PWA ServiceWorker successfully registered with scope:', reg.scope);
                })
                .catch(err => {
                    console.warn('PWA ServiceWorker registration failed:', err);
                });
        });
    }
});

