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
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = primaryNav.classList.contains('nav-visible');
            primaryNav.classList.toggle('nav-visible');
            mobileNavToggle.setAttribute('aria-expanded', !isOpen);
        });

        // Close nav when clicking on any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                primaryNav.classList.remove('nav-visible');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
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

    // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    function handleScrollEvents() {
        updateActiveNavLink();

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

    function openProjectModal(card) {
        if (!modal) return;

        modalTitle.textContent = card.dataset.modalTitle || 'Project Details';
        modalCategoryTag.textContent = card.dataset.modalTag || 'Featured Project';
        modalDescription.textContent = card.dataset.modalDescription || 'No description provided.';
        modalProblems.textContent = card.dataset.modalProblems || 'Comprehensive architecture engineered to solve key client requirements.';

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
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('visible');
        document.body.style.overflow = '';
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            openProjectModal(card);
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('visible')) {
            closeProjectModal();
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
                appendConsoleMessage("Phone:    +212-618238201");
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
    // 10. HIGH-PERFORMANCE PARTICLE CANVAS
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
});
