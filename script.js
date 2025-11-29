// --- script.js ---

// Helper function to update the Dark Mode button text based on the theme state
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

    // Update button text and save preference to localStorage
    updateThemeButtonText(toggleButton, isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Function to load the saved theme and set the button text on page load
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

// --- INITIALIZATION AND EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // 1. DARK MODE LOGIC
    // ===================================
    loadTheme(); // Load the saved theme first
    
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }

    // ===================================
    // 2. PROJECT DETAIL TOGGLE LOGIC
    // ===================================
    // Note: Uses a more specific selector to avoid interfering with the main theme toggle
    const projectToggleButtons = document.querySelectorAll('#projects .toggle-btn');

    if (projectToggleButtons.length > 0) {
        projectToggleButtons.forEach(button => {
            // Check if the button is NOT the theme toggle (for safety, though selector is specific)
            if (button.id !== 'theme-toggle') { 
                button.addEventListener('click', () => {
                    // Assuming the details <p> is the immediate next sibling
                    const details = button.nextElementSibling; 
                    
                    details.classList.toggle('show');
                    
                    // Update the button text for the project details only
                    if (details.classList.contains('show')) {
                        button.textContent = 'Hide Details';
                    } else {
                        button.textContent = 'Show Details';
                    }
                });
            }
        });
    }

    // ===================================
    // 3. CONTACT FORM VALIDATION LOGIC
    // ===================================
    const form = document.getElementById('contact-form');

    if (form) { 
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMessage = document.getElementById('form-success');

        function showError(input, message) {
            let error = input.nextElementSibling;

            // Create error span if it doesn't exist
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
                // Optional: remove the error span element if preferred
                // error.remove(); 
            }
            input.classList.remove('input-error');
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let isValid = true;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

            // Name validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Email validation
            const emailValue = emailInput.value.trim();
            if (emailValue === '') {
                showError(emailInput, 'Please enter your email.');
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter a message.');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            if (isValid) {
                // Display success message and reset form
                if (successMessage) {
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        successMessage.textContent = '';
                    }, 5000); 
                } else {
                    alert('Thank you! Your message has been sent successfully.');
                }
                form.reset();
            }
        });
    }

    // ===================================
    // 4. MODAL/IMAGE POPUP LOGIC
    // ===================================
    const imgLink = document.getElementById('profile-link');
    
    // SAFETY CHECK: Only executes the modal logic if the profile image link exists (on about.html)
    if (imgLink) { 
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById("img01");
        // Get the close button element (based on class name from HTML)
        const closeBtn = document.querySelector(".modal .close-btn"); 

        // When the user clicks on the image link, open the modal
        imgLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior (navigating to the image file)
            
            modal.style.display = "block";
            modalImg.src = this.href; 
        });

        // When the user clicks on (x), close the modal
        if (closeBtn) {
            closeBtn.onclick = function() { 
                modal.style.display = "none";
            }
        }
        
        // When the user clicks anywhere outside of the modal content, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});