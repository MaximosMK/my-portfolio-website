// --- Scroll-to-Top Button Functionality ---
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {scrollFunction(); activateNavLink();}; // Combined scroll functions

function scrollFunction() {
  if (scrollToTopBtn) { // Check if the button exists
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  }
}

// When the user clicks on the button, scroll to the top of the document
if (scrollToTopBtn) { // Check if the button exists
  scrollToTopBtn.onclick = function() {
    topFunction();
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// --- Theme Toggle Functionality ---
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

// Function to set the theme
function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '☀️'; // Sun icon for light theme
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙'; // Moon icon for dark theme
        localStorage.setItem('theme', 'dark'); // Default to dark
    }
}

// Apply the saved theme on initial load
if (currentTheme) {
    setTheme(currentTheme);
} else {
    setTheme('dark'); // Default to dark theme if no preference is saved
}

// Event listener for the theme toggle button
if (themeToggleBtn) { // Check if the button exists
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

        // Optional: Prevent body scroll when mobile menu is open
        // if (!isVisible) {
        //     document.body.style.overflow = 'hidden';
        // } else {
        //     document.body.style.overflow = 'auto';
        // }
    });
}

// --- Scrollspy for Navigation ---
const sections = document.querySelectorAll('main section[id]'); 
const navLinks = document.querySelectorAll('header nav a');
const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0; // Get header height

function activateNavLink() {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Adjust offset if you have a sticky header
        if (pageYOffset >= sectionTop - headerHeight - (sectionHeight / 3) ) { // Consider header height and trigger point
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

window.addEventListener('load', activateNavLink); // Call on load too
// Note: activateNavLink is already called in window.onscroll

// --- GSAP Terminal Intro for Hero Tagline ---
document.addEventListener("DOMContentLoaded", function() {
    const heroTagline = document.getElementById('hero-tagline');

    if (heroTagline && typeof gsap !== 'undefined' && typeof gsap.plugins !== 'undefined' && gsap.plugins.TextPlugin) { // Check for GSAP and TextPlugin
        gsap.registerPlugin(gsap.plugins.TextPlugin); // Register TextPlugin

        const lines = [
            { text: "Initiating sequence...", speed: 0.06, delay: 0.5, size: "1em" },
            { text: "Loading core_modules/reality_engine.js", speed: 0.04, delay: 0.5, size: "1em" },
            { text: "> Accessing creative_matrix...", speed: 0.05, delay: 0.8, size: "1em" },
            { text: "Mohamed Karouch", speed: 0.08, delay: 0.5, clear: true, size: "1.5em", isName: true }, // Clears previous, types name
            { text: "\"Turning ideas into digital reality with code.\"", speed: 0.07, delay: 0.2, size: "2.2em", isTagline: true } // Types tagline
        ];

        let masterTimeline = gsap.timeline({ delay: 0.5 }); // Overall delay before starting animation

        lines.forEach((line) => {
            if (line.clear) {
                masterTimeline.to(heroTagline, { 
                    duration: 0.1, 
                    text: "", 
                    ease: "none",
                    onStart: () => heroTagline.style.fontSize = line.size // Set size before clearing for smoother transition
                });
            } else {
                 masterTimeline.call(() => heroTagline.style.fontSize = line.size, null, `+=${line.delay/1000}`); // GSAP delays are in seconds
            }
            
            masterTimeline.to(heroTagline, {
                duration: line.text.length * line.speed,
                text: {
                    value: line.text,
                    delimiter: "", 
                    newClass: "gsap-cursor" // Class for blinking cursor
                },
                ease: "none",
            }, line.clear ? undefined : `+=${line.delay/1000}`); // GSAP delays are in seconds
        });

    } else if (heroTagline) {
        // Fallback if GSAP or TextPlugin isn't loaded
        heroTagline.innerHTML = "\"Turning ideas into digital reality with code.\""; // Use innerHTML to allow quotes
        if (typeof gsap === 'undefined' || typeof gsap.plugins === 'undefined' || !gsap.plugins.TextPlugin) {
            console.warn("GSAP TextPlugin not loaded. Displaying static tagline. Ensure TextPlugin.min.js is included after gsap.min.js.");
        } else {
            console.warn("Hero tagline element not found for GSAP animation.");
        }
    }
});


// --- Particles.js Configuration for Hero Section ---
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80, // Number of particles
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff" // Particle color (works well on dark backgrounds)
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
                "value": 0.5, // Particle opacity
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3, // Particle size
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
                "distance": 150, // Distance for lines to connect
                "color": "#ffffff", // Line color
                "opacity": 0.4, // Line opacity
                "width": 1 // Line width
            },
            "move": {
                "enable": true,
                "speed": 2, // Particle movement speed
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
                    "mode": "grab" // "grab", "repulse", "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push" // "push", "remove"
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
                    "particles_nb": 4 // Number of particles to push on click
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}
