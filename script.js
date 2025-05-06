// --- Scroll-to-Top Button Functionality ---
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

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
