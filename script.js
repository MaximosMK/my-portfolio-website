// --- Scroll-to-Top Button Functionality ---
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

function handleScroll() {
  scrollFunction();
  activateNavLink();
}
window.addEventListener('scroll', handleScroll);

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
  scrollToTopBtn.addEventListener('click', topFunction);
}

function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

// --- Dev Console Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const devConsole = document.getElementById('devConsole');
    const consoleOutput = document.getElementById('consoleOutput');
    const consoleInput = document.getElementById('consoleInput');
    const closeConsoleBtn = document.getElementById('closeConsoleBtn');

    let consoleVisible = false;

    function toggleConsole() {
        consoleVisible = !consoleVisible;
        if (consoleVisible) {
            devConsole.classList.add('visible');
            consoleInput.focus(); // Focus on input when console opens
        } else {
            devConsole.classList.remove('visible');
        }
    }

    function appendToConsole(text, type = 'info') {
        const p = document.createElement('p');
        if (type === 'command') {
            p.textContent = `> ${text}`;
        } else if (type === 'error') {
            p.style.color = '#ff4757'; // A reddish color for errors
            p.textContent = `Error: ${text}`;
        } else if (type === 'success') {
            p.style.color = '#2ed573'; // A greenish color for success
            p.textContent = text;
        }
        else {
            p.textContent = text;
        }
        consoleOutput.appendChild(p);
        consoleOutput.scrollTop = consoleOutput.scrollHeight; // Auto-scroll to bottom
    }

    function processCommand(command) {
        appendToConsole(command, 'command');
        const parts = command.toLowerCase().trim().split(' ');
        const cmd = parts[0];
        // const args = parts.slice(1); // For commands with arguments

        switch (cmd) {
            case 'help':
                appendToConsole("Available commands:");
                appendToConsole("- help: Show this help message.");
                appendToConsole("- clear: Clear the console output.");
                appendToConsole("- date: Show current date and time.");
                appendToConsole("- about_me: Display a short bio.");
                appendToConsole("- contact_info: Show contact details.");
                // Add more commands here
                break;
            case 'clear':
                consoleOutput.innerHTML = '';
                break;
            case 'date':
                appendToConsole(new Date().toLocaleString());
                break;
            case 'about_me':
                appendToConsole("Mohamed Karouch: A passionate Web Developer turning ideas into digital reality with code. Specializing in creating performant, beautiful, and user-first web experiences.");
                break;
            case 'contact_info':
                appendToConsole("Email: karouchmohamed21@gmail.com | LinkedIn: linkedin.com/in/mohamed-karouch");
                break;
            // Easter eggs or fun commands
            case 'whoami':
                appendToConsole("You are an explorer of this digital realm!");
                break;
            case 'matrix':
                appendToConsole("Wake up, Neo... The Matrix has you.");
                break;
            default:
                appendToConsole(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    if (devConsole && consoleOutput && consoleInput && closeConsoleBtn) {
        // Toggle console with Ctrl + \ (Backslash) or Cmd + \
        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === '\\') {
                event.preventDefault(); // Prevent default browser action for this combo
                toggleConsole();
            }
        });

        // Handle input submission
        consoleInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && consoleInput.value.trim() !== '') {
                processCommand(consoleInput.value.trim());
                consoleInput.value = ''; // Clear input field
            }
        });

        // Close button
        closeConsoleBtn.addEventListener('click', toggleConsole);

    } else {
        console.warn('Dev Console elements not found. Console functionality will be disabled.');
    }
});

// --- Design Lab: Cursor-Reactive Background ---
document.addEventListener('DOMContentLoaded', () => {
    const reactiveContainers = document.querySelectorAll('.reactive-bg-container');

    reactiveContainers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;

            container.style.setProperty('--mouse-x', `${xPercent}%`);
            container.style.setProperty('--mouse-y', `${yPercent}%`);
        });
    });
});

// --- Design Lab: 3D Interactive Cube ---
document.addEventListener('DOMContentLoaded', () => {
    const fieldContainer = document.getElementById('geometricFieldContainer');
    const promptText = fieldContainer ? fieldContainer.querySelector('.geometric-field-prompt') : null;

    if (!fieldContainer) {
        console.warn("Geometric field container not found for 3D cube.");
        return;
    }

    const cubeSize = 150; // pixels
    const halfSize = cubeSize / 2;

    const INITIAL_ROTATE_X = -25; // degrees
    const INITIAL_ROTATE_Y = -35; // degrees
    const ROTATE_SENSITIVITY_DIVISOR = 2; // Smaller = more sensitive

    const cubeWrapper = document.createElement('div');
    cubeWrapper.classList.add('cube-wrapper');
    cubeWrapper.style.width = `${cubeSize}px`;
    cubeWrapper.style.height = `${cubeSize}px`;

    const facesData = [
        { name: 'F', transform: `rotateY(0deg) translateZ(${halfSize}px)`, color: 'rgba(187, 134, 252, 0.4)' }, // Front
        { name: 'Bk', transform: `rotateY(180deg) translateZ(${halfSize}px)`, color: 'rgba(134, 252, 187, 0.4)' }, // Back
        { name: 'R', transform: `rotateY(90deg) translateZ(${halfSize}px)`, color: 'rgba(252, 134, 187, 0.4)' },  // Right
        { name: 'L', transform: `rotateY(-90deg) translateZ(${halfSize}px)`, color: 'rgba(134, 187, 252, 0.4)' }, // Left
        { name: 'T', transform: `rotateX(90deg) translateZ(${halfSize}px)`, color: 'rgba(252, 187, 134, 0.4)' },  // Top
        { name: 'Bt', transform: `rotateX(-90deg) translateZ(${halfSize}px)`, color: 'rgba(187, 252, 134, 0.4)' }  // Bottom
    ];

    facesData.forEach(data => {
        const face = document.createElement('div');
        face.classList.add('cube-face');
        face.textContent = data.name;
        face.style.transform = data.transform;
        face.style.backgroundColor = data.color;
        cubeWrapper.appendChild(face);
    });

    fieldContainer.innerHTML = ''; // Clear previous content (like the prompt)
    fieldContainer.appendChild(cubeWrapper);

    let currentRotateX = INITIAL_ROTATE_X;
    let currentRotateY = INITIAL_ROTATE_Y;
    cubeWrapper.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`; // Apply initial rotation

    fieldContainer.addEventListener('mousemove', (e) => {
        const rect = fieldContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        // Calculate rotation based on mouse position relative to center, adjusted by sensitivity
        // The 90 is a factor to determine the maximum rotation influence from mouse movement
        currentRotateY = INITIAL_ROTATE_Y - (mouseX / (rect.width / 2)) * (90 / ROTATE_SENSITIVITY_DIVISOR);
        currentRotateX = INITIAL_ROTATE_X + (mouseY / (rect.height / 2)) * (90 / ROTATE_SENSITIVITY_DIVISOR);

        cubeWrapper.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    });

    fieldContainer.addEventListener('mouseleave', () => {
        currentRotateX = INITIAL_ROTATE_X;
        currentRotateY = INITIAL_ROTATE_Y;
        cubeWrapper.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    });

    if (promptText) {
        // promptText.style.display = 'none'; // Or remove it if you prefer
    }
});


// --- Global Canvas Particle System ---
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('globalParticleCanvas');
    if (!canvas) {
        console.warn('Global particle canvas not found.');
        return;
    }
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Configuration constants for the particle system
    const PARTICLE_DENSITY_FACTOR = 9000; // Lower = more dense, Higher = less dense
    const MAX_PARTICLES = 150;
    const MIN_PARTICLES = 30;
    const MIN_PARTICLE_SIZE = 0.5;
    const MAX_PARTICLE_SIZE = 2.0;
    const MIN_PARTICLE_SPEED = -0.15;
    const MAX_PARTICLE_SPEED = 0.15;
    const MIN_PARTICLE_ALPHA = 0.2;
    const MAX_PARTICLE_ALPHA = 0.6;

    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles(); // Re-initialize particles on resize for new density/positions
    });

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            // Check collision with canvas edges
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.directionY = -this.directionY;
            }
            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Create particle array
    function initParticles() {
        particlesArray = [];
        // Adjust number of particles based on screen size for performance
        let numberOfParticles = (canvas.height * canvas.width) / PARTICLE_DENSITY_FACTOR;
        if (numberOfParticles > MAX_PARTICLES) numberOfParticles = MAX_PARTICLES;
        if (numberOfParticles < MIN_PARTICLES) numberOfParticles = MIN_PARTICLES;

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * (MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE)) + MIN_PARTICLE_SIZE;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let speedRange = MAX_PARTICLE_SPEED - MIN_PARTICLE_SPEED;
            let directionX = (Math.random() * speedRange) + MIN_PARTICLE_SPEED;
            let directionY = (Math.random() * speedRange) + MIN_PARTICLE_SPEED;
            
            let colorValue = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() || '#e0e0e0';
            let alpha = (Math.random() * (MAX_PARTICLE_ALPHA - MIN_PARTICLE_ALPHA)) + MIN_PARTICLE_ALPHA;
            
            let finalColor;
            if (colorValue.startsWith('#')) { 
                let r = parseInt(colorValue.slice(1, 3), 16);
                let g = parseInt(colorValue.slice(3, 5), 16);
                let b = parseInt(colorValue.slice(5, 7), 16);
                finalColor = `rgba(${r},${g},${b},${alpha})`;
            } else if (colorValue.startsWith('rgb(')) { 
                 finalColor = colorValue.replace('rgb(', 'rgba(').replace(')', `,${alpha})`);
            } else { 
                finalColor = `rgba(224, 224, 224, ${alpha})`; 
            }

            particlesArray.push(new Particle(x, y, directionX, directionY, size, finalColor));
        }
    }

    // Animation loop
    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        // connectParticles(); // Optional: function to draw lines between particles
    }

    // Optional: Function to connect particles with lines
    /*
    function connectParticles(){
        let opacityValue = 1;
        const CONNECT_DISTANCE_FACTOR_W = 10; // Lower = larger connection area
        const CONNECT_DISTANCE_FACTOR_H = 10;
        const OPACITY_DISTANCE_DIVISOR = 15000; // Higher = lines fade slower
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width/CONNECT_DISTANCE_FACTOR_W) * (canvas.height/CONNECT_DISTANCE_FACTOR_H)) {
                    opacityValue = 1 - (distance/OPACITY_DISTANCE_DIVISOR);
                    let lineColorValue = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent-color').trim() || '#bb86fc';
                    let finalLineColor;
                     if (lineColorValue.startsWith('#')) { 
                        let r = parseInt(lineColorValue.slice(1, 3), 16);
                        let g = parseInt(lineColorValue.slice(3, 5), 16);
                        let b = parseInt(lineColorValue.slice(5, 7), 16);
                        finalLineColor = `rgba(${r},${g},${b},${opacityValue})`;
                    } else { // Fallback for rgb or other formats, less precise for this example
                        finalLineColor = `rgba(187,134,252,${opacityValue})`;
                    }
                    ctx.strokeStyle = finalLineColor;
                    ctx.lineWidth = 0.3; // Thinner lines
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    */

    initParticles();
    animateParticles();
});
