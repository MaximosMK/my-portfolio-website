// --- Scroll-to-Top Button Functionality ---
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {scrollFunction(); activateNavLink();};

function scrollFunction() {
  if (scrollToTopBtn) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }
}

if (scrollToTopBtn) {
  scrollToTopBtn.onclick = function() {
    topFunction();
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// --- Theme Toggle Functionality ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

if (currentTheme) {
    setTheme(currentTheme);
} else {
    setTheme('dark');
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });
}

// --- Initialize AOS (Animate On Scroll) ---
AOS.init();

// --- Mobile Navigation Toggle ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('header nav'); 

if (mobileNavToggle && primaryNav) {
    mobileNavToggle.addEventListener('click', () => {
        const isVisible = primaryNav.classList.contains('nav-visible');
        primaryNav.classList.toggle('nav-visible');
        mobileNavToggle.setAttribute('aria-expanded', !isVisible);
    });
}

// --- Scrollspy for Navigation ---
const sections = document.querySelectorAll('main section[id]'); 
const navLinks = document.querySelectorAll('header nav a');
const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;

function activateNavLink() {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - headerHeight - (sectionHeight / 3) ) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('load', activateNavLink);

// --- GSAP Terminal Intro for Hero Tagline ---
document.addEventListener("DOMContentLoaded", function() {
    const heroTagline = document.getElementById('hero-tagline');

    if (heroTagline && typeof gsap !== 'undefined' && typeof gsap.plugins !== 'undefined' && gsap.plugins.TextPlugin) {
        gsap.registerPlugin(gsap.plugins.TextPlugin);

        const lines = [
            { text: "Initiating sequence...", speed: 0.06, delay: 0.5, size: "1em" },
            { text: "Loading core_modules/reality_engine.js", speed: 0.04, delay: 0.5, size: "1em" },
            { text: "> Accessing creative_matrix...", speed: 0.05, delay: 0.8, size: "1em" },
            { text: "Mohamed Karouch", speed: 0.08, delay: 0.5, clear: true, size: "1.5em", isName: true },
            { text: "\"Turning ideas into digital reality with code.\"", speed: 0.07, delay: 0.2, size: "2.2em", isTagline: true }
        ];

        let masterTimeline = gsap.timeline({ delay: 0.5 });

        lines.forEach((line) => {
            if (line.clear) {
                masterTimeline.to(heroTagline, { 
                    duration: 0.1, 
                    text: "", 
                    ease: "none",
                    onStart: () => heroTagline.style.fontSize = line.size
                });
            } else {
                 masterTimeline.call(() => heroTagline.style.fontSize = line.size, null, `+=${line.delay/1000}`);
            }
            
            masterTimeline.to(heroTagline, {
                duration: line.text.length * line.speed,
                text: {
                    value: line.text,
                    delimiter: "", 
                    newClass: "gsap-cursor"
                },
                ease: "none",
            }, line.clear ? undefined : `+=${line.delay/1000}`);
        });

    } else if (heroTagline) {
        heroTagline.innerHTML = "\"Turning ideas into digital reality with code.\"";
        if (typeof gsap === 'undefined' || typeof gsap.plugins === 'undefined' || !gsap.plugins.TextPlugin) {
            console.warn("GSAP TextPlugin not loaded. Displaying static tagline. Ensure TextPlugin.min.js is included after gsap.min.js.");
        } else {
            console.warn("Hero tagline element not found for GSAP animation.");
        }
    }
});

// --- Skills Filter Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.skills-filter-controls .filter-btn');
    const skillItems = document.querySelectorAll('#skills .skill-item');

    if (filterButtons.length > 0 && skillItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                skillItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});

// --- Project Modal Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    const modalScreenshot = document.getElementById('modalScreenshot');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalProblems = document.getElementById('modalProblems');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalDemoLink = document.getElementById('modalDemoLink');

    if (projectCards.length > 0 && modal && closeModalBtn) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                modalTitle.textContent = card.dataset.modalTitle || 'Project Details';
                modalDescription.textContent = card.dataset.modalDescription || 'No description available.';
                modalProblems.textContent = card.dataset.modalProblems || 'No specific problems detailed.';
                
                if (card.dataset.modalScreenshot) {
                    modalScreenshot.src = card.dataset.modalScreenshot;
                    modalScreenshot.style.display = 'block';
                } else {
                    modalScreenshot.style.display = 'none';
                }

                if (card.dataset.modalGithub && card.dataset.modalGithub !== '#') {
                    modalGithubLink.href = card.dataset.modalGithub;
                    modalGithubLink.style.display = 'inline-block';
                } else {
                    modalGithubLink.style.display = 'none';
                }

                if (card.dataset.modalDemo && card.dataset.modalDemo !== '#') {
                    modalDemoLink.href = card.dataset.modalDemo;
                    modalDemoLink.style.display = 'inline-block';
                } else {
                    modalDemoLink.style.display = 'none';
                }
                
                modal.classList.add('visible');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('visible');
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('visible')) {
                modal.classList.remove('visible');
                document.body.style.overflow = 'auto';
            }
        });

    } else {
        if (projectCards.length === 0) console.warn('No project cards found for modal functionality.');
        if (!modal) console.warn('Project modal element not found.');
        if (!closeModalBtn) console.warn('Modal close button not found.');
    }
});

// --- Particles.js Configuration for Hero Section ---
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
