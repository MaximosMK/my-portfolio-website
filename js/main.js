// Mohamed Karouch Portfolio - Main Controller & Navigation
document.addEventListener('DOMContentLoaded', () => {
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

        // Mobile Nav Drawer Quick Actions
        const mobileQuickPaletteBtn = document.getElementById('mobileQuickPaletteBtn');
        const mobileQuickScopeBtn = document.getElementById('mobileQuickScopeBtn');
        const mobileQuickResumeBtn = document.getElementById('mobileQuickResumeBtn');

        if (mobileQuickPaletteBtn) {
            mobileQuickPaletteBtn.addEventListener('click', () => {
                closeMobileNav();
                if (typeof openCommandPalette === 'function') openCommandPalette();
            });
        }
        if (mobileQuickScopeBtn) {
            mobileQuickScopeBtn.addEventListener('click', () => {
                closeMobileNav();
                document.getElementById('scopeCalculator')?.scrollIntoView({ behavior: 'smooth' });
            });
        }
        if (mobileQuickResumeBtn) {
            mobileQuickResumeBtn.addEventListener('click', () => {
                closeMobileNav();
                if (typeof openResumeModal === 'function') openResumeModal();
            });
        }
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

            const subject = encodeURIComponent(`[Project Order] ${data.serviceVal} - ${data.nameVal}`);
            const body = encodeURIComponent(
                `Hi Mohamed,\n\n` +
                `I would like to place a new freelance project order / proposition:\n\n` +
                `• Client Name: ${data.nameVal}\n` +
                `• Contact Email: ${data.emailVal}\n` +
                `• Service: ${data.serviceVal}\n` +
                `• Estimated Budget: ${data.budgetVal}\n` +
                `• Estimated Timeline: ${data.timelineVal}\n\n` +
                `Project Deliverables & Requirements:\n${data.messageVal}\n\n` +
                `Best regards,\n${data.nameVal}`
            );

            showToast('Opening email client with your project order... 🚀');
            window.location.href = `mailto:karouchmohamed21@gmail.com?subject=${subject}&body=${body}`;
        });
    }

    // Action 2: WhatsApp Chat & Order Dispatch
    if (whatsappInquiryBtn) {
        whatsappInquiryBtn.addEventListener('click', () => {
            const data = checkFormValidity(false);
            const clientName = data.nameVal ? data.nameVal : 'a client';

            let waText = `*🚀 NEW PROJECT PROPOSITION / ORDER*\n\n`;
            waText += `*Client Name:* ${clientName}\n`;
            if (data.emailVal) waText += `*Contact Email:* ${data.emailVal}\n`;
            waText += `*Selected Service:* ${data.serviceVal}\n`;
            waText += `*Estimated Budget:* ${data.budgetVal}\n`;
            waText += `*Target Timeline:* ${data.timelineVal}\n`;

            if (data.messageVal) {
                waText += `\n*Project Deliverables & Details:*\n${data.messageVal}\n`;
            }
            waText += `\n_Dispatched via Mohamed Karouch Portfolio Order Suite_`;

            const waUrl = `https://wa.me/212680165532?text=${encodeURIComponent(waText)}`;
            showToast('Launching WhatsApp with your structured order... 💬');
            SoundFX.playSuccess();
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // Action 3: Copy Formatted Brief to Clipboard
    if (copyBriefBtn) {
        copyBriefBtn.addEventListener('click', () => {
            const data = checkFormValidity(false);
            const briefContent =
                `📋 PROJECT PROPOSITION & ORDER BRIEF\n` +
                `------------------------------------\n` +
                `• Service: ${data.serviceVal}\n` +
                `• Budget Range: ${data.budgetVal}\n` +
                `• Estimated Timeline: ${data.timelineVal}\n` +
                `• Client Name: ${data.nameVal || 'Not specified'}\n` +
                `• Contact Email: ${data.emailVal || 'Not specified'}\n` +
                `• Project Deliverables: ${data.messageVal || 'Consultation / Kick-off discussion'}\n` +
                `------------------------------------\n` +
                `Target Developer: Mohamed Karouch (karouchmohamed21@gmail.com | +212 680-165532)`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(briefContent).then(() => {
                    showToast('Proposition order brief copied to clipboard! 📋✨');
                    SoundFX.playPop();
                }).catch(() => {
                    showToast('Could not copy brief to clipboard.');
                });
            } else {
                showToast('Clipboard access unavailable.');
            }
        });
    }

    // Floating Quick Dock Interaction & Sound FX
    const floatingQuickDock = document.getElementById('floatingQuickDock');
    if (floatingQuickDock) {
        const dockBtns = floatingQuickDock.querySelectorAll('.dock-btn');
        dockBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                SoundFX.playClick();
            });
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
    // 16.5. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach((item, index) => {
            const trigger = item.querySelector('.faq-trigger');
            const panel = item.querySelector('.faq-answer-panel');
            if (!trigger || !panel) return;

            // Automatically open the first question for immediate engagement
            if (index === 0) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                panel.removeAttribute('hidden');
            }

            trigger.addEventListener('click', () => {
                const isCurrentlyActive = item.classList.contains('active');

                // Collapse all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherTrigger = otherItem.querySelector('.faq-trigger');
                        const otherPanel = otherItem.querySelector('.faq-answer-panel');
                        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                        if (otherPanel) otherPanel.setAttribute('hidden', '');
                    }
                });

                // Toggle current item
                if (isCurrentlyActive) {
                    item.classList.remove('active');
                    trigger.setAttribute('aria-expanded', 'false');
                    panel.setAttribute('hidden', '');
                    SoundFX.playClick();
                } else {
                    item.classList.add('active');
                    trigger.setAttribute('aria-expanded', 'true');
                    panel.removeAttribute('hidden');
                    SoundFX.playPop();
                }
            });
        });
    }

    // ==========================================================================
    // 17. PROGRESSIVE WEB APP (PWA) SERVICE WORKER REGISTRATION
    // ==========================================================================
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => {
                    console.log('PWA ServiceWorker registered with scope:', reg.scope);
                })
                .catch(err => {
                    console.warn('PWA ServiceWorker registration failed:', err);
                });
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }
});

