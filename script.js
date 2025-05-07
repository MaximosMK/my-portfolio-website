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

// --- Typing Animation for Hero Tagline ---
const typedTextSpan = document.querySelector("#hero-tagline .typed-text");
const cursorSpan = document.querySelector("#hero-tagline .cursor");

const textArray = ["\"Turning ideas into digital reality with code.\""]; // Your tagline
const typingDelay = 100; // Milliseconds
const erasingDelay = 50; // Milliseconds (not used in current version)
const newTextDelay = 1500; // Delay before starting to type
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(cursorSpan && !cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        if (typedTextSpan) typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        if(cursorSpan) cursorSpan.classList.remove("typing");
        // To make it loop and erase, you'd add an erase function call here
        // For now, it just types once.
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    if (textArray.length && typedTextSpan && textArray[textArrayIndex].length > 0) {
        setTimeout(type, newTextDelay);
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
