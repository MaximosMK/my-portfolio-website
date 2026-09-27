// Mohamed Karouch Portfolio - Audio Engine & Theme System
(function() {
    function getSafeStorage(key, fallback = null) {
        try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
    }
    function setSafeStorage(key, val) {
        try { localStorage.setItem(key, val); } catch (e) {}
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
    // 3B. TACTILE SOUND EFFECTS (WEB AUDIO API SYNTHESIZER)
    // ==========================================================================
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    const SOUND_STORAGE_KEY = 'mk_portfolio_sound';

    const SoundFX = (() => {
        let ctx = null;
        let isMuted = getSafeStorage(SOUND_STORAGE_KEY) !== 'enabled';

        function getContext() {
            if (!ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    ctx = new AudioCtx();
                }
            }
            if (ctx && ctx.state === 'suspended') {
                ctx.resume();
            }
            return ctx;
        }

        function playTone(freq, type, duration, gainVal = 0.04) {
            if (isMuted) return;
            try {
                const c = getContext();
                if (!c) return;
                const osc = c.createOscillator();
                const gain = c.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, c.currentTime);
                gain.gain.setValueAtTime(gainVal, c.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
                osc.connect(gain);
                gain.connect(c.destination);
                osc.start();
                osc.stop(c.currentTime + duration);
            } catch (e) {}
        }

        return {
            isMuted: () => isMuted,
            toggle: () => {
                isMuted = !isMuted;
                setSafeStorage(SOUND_STORAGE_KEY, isMuted ? 'disabled' : 'enabled');
                if (!isMuted) {
                    getContext();
                    SoundFX.playPop();
                }
                return !isMuted;
            },
            playClick: () => playTone(600, 'sine', 0.04, 0.035),
            playToggle: () => playTone(850, 'triangle', 0.05, 0.03),
            playPop: () => playTone(520, 'sine', 0.08, 0.05),
            playSuccess: () => {
                if (isMuted) return;
                try {
                    const c = getContext();
                    if (!c) return;
                    [523.25, 659.25, 783.99].forEach((f, idx) => {
                        setTimeout(() => {
                            const osc = c.createOscillator();
                            const gain = c.createGain();
                            osc.type = 'sine';
                            osc.frequency.setValueAtTime(f, c.currentTime);
                            gain.gain.setValueAtTime(0.035, c.currentTime);
                            gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
                            osc.connect(gain);
                            gain.connect(c.destination);
                            osc.start();
                            osc.stop(c.currentTime + 0.12);
                        }, idx * 60);
                    });
                } catch (e) {}
            }
        };
    })();
    window.SoundFX = SoundFX;

    function updateSoundUI() {
        const enabled = !SoundFX.isMuted();
        if (soundIcon) soundIcon.textContent = enabled ? '🔊' : '🔇';
        const mobileSoundIcon = document.getElementById('mobileSoundIcon');
        if (mobileSoundIcon) mobileSoundIcon.textContent = enabled ? '🔊' : '🔇';
        if (soundToggleBtn) {
            if (enabled) {
                soundToggleBtn.classList.add('sound-active');
                soundToggleBtn.title = 'Sound FX: Enabled (Click to Mute)';
            } else {
                soundToggleBtn.classList.remove('sound-active');
                soundToggleBtn.title = 'Sound FX: Muted (Click to Enable)';
            }
        }
    }

    if (soundToggleBtn) {
        updateSoundUI();
        soundToggleBtn.addEventListener('click', () => {
            const enabled = SoundFX.toggle();
            updateSoundUI();
            showToast(enabled ? 'Tactile Sound Effects Enabled 🔊' : 'Sound Effects Muted 🔇');
        });
    }

    // Touch unlock for mobile browsers (iOS Safari / Android Chrome)
    const unlockAudioOnTouch = () => {
        if (!SoundFX.isMuted()) {
            SoundFX.playClick();
        }
        document.removeEventListener('touchstart', unlockAudioOnTouch);
        document.removeEventListener('click', unlockAudioOnTouch);
    };
    document.addEventListener('touchstart', unlockAudioOnTouch, { passive: true, once: true });
    document.addEventListener('click', unlockAudioOnTouch, { passive: true, once: true });


    // ==========================================================================
    // 1. THEME TOGGLE FUNCTIONALITY
    // ==========================================================================
    const STORAGE_KEY = 'mk_portfolio_theme';

    function applyTheme(theme) {
        const isLight = theme === 'light';
        document.documentElement.classList.toggle('light-theme', isLight);
        document.body.classList.toggle('light-theme', isLight);
        const tIcon = document.getElementById('themeIcon');
        if (tIcon) tIcon.textContent = isLight ? '☀️' : '🌙';
        setSafeStorage(STORAGE_KEY, isLight ? 'light' : 'dark');
        if (typeof window.reInitParticleColors === 'function') {
            window.reInitParticleColors();
        }
    }

    const savedTheme = getSafeStorage(STORAGE_KEY, 'dark');
    if (savedTheme === 'light') {
        applyTheme('light');
    } else {
        applyTheme('dark');
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#themeToggleBtn');
        if (btn) {
            const isLight = document.body.classList.contains('light-theme') || document.documentElement.classList.contains('light-theme');
            applyTheme(isLight ? 'dark' : 'light');
            if (typeof showToast === 'function') {
                showToast(`Switched to ${isLight ? 'Dark' : 'Light'} Mode`);
            }
            if (typeof SoundFX !== 'undefined' && SoundFX.playToggle) {
                SoundFX.playToggle();
            }
        }
    });


    // Scroll Reading Progress Bar
    const progressBar = document.getElementById('scrollProgressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }, { passive: true });
    }

    // Expose globals
    window.SoundFX = SoundFX;
    window.showToast = showToast;
    window.updateSoundUI = updateSoundUI;
})();
