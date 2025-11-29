// // index.html, projects.html
// This block handles the Project Detail Toggle buttons
const projectToggleButtons = document.querySelectorAll('#projects .toggle-btn');

// SAFETY CHECK: Only runs if there are project toggle buttons on the page.
if (projectToggleButtons.length > 0) {
    projectToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            
            // 1. Toggle the visibility class
            details.classList.toggle('show');
            
            // 2. ONLY Update the button text for the Project Detail (NOT Dark Mode)
            if (details.classList.contains('show')) {
                button.textContent = 'Hide Details'; // Updated text for projects
            } else {
                button.textContent = 'Show Details'; // Updated text for projects
            }
        });
    });
}


// CONTACT FORM VALIDATION (No changes needed, logic is sound)
const form = document.getElementById('contact-form');

// SAFETY CHECK: Only executes the validation logic if the contact form is present
if (form) { 
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function showError(input, message) {
        let error = input.nextElementSibling;

        if (!error || !error.classList.contains('error-message')) {
            error = document.createElement('span');
            error.classList.add('error-message');
            input.after(error);
        }

        error.textContent = message;
        input.classList.add('input-error');
    }

    function clearError(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.textContent = '';
        }
        input.classList.remove('input-error');
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Please enter your name.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        const emailValue = emailInput.value.trim();
        // Added a slightly more robust regex check for email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (emailValue === '') {
            showError(emailInput, 'Please enter your email.');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Please enter a message.');
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            alert('Thank you! Your message has been sent successfully.');
            // Optionally clear the success message after a delay if you were using the DOM element
            // const successMsg = document.getElementById('form-success');
            // if(successMsg) successMsg.textContent = "Thank you! Your message has been sent successfully.";
            form.reset();
        }
    });
}


// DARK MODE THEME TOGGLE LOGIC

// Helper function to set the button text based on the current theme
function updateThemeButtonText(button, isDark) {
    if (button) {
        button.textContent = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    }
}

// Function to handle the dark mode toggle
function toggleTheme() {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');
    
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');

    // Update button text and save preference
    updateThemeButtonText(toggleButton, isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check for stored preference when the page loads
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const toggleButton = document.getElementById('theme-toggle');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeButtonText(toggleButton, true);
    } else {
         // Default to light and set button text if no preference or 'light' is saved
        updateThemeButtonText(toggleButton, false);
    }
}

// Add event listener to the button once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load the saved theme first (and sets button text)
    loadTheme();
    // 2. Set up the event listener for the toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
});
