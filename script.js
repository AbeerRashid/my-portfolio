// index.html
const buttons = document.querySelectorAll('.toggle-btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.classList.toggle('show');
    if (details.classList.contains('show')) {
      button.textContent = 'Hide Details';
    } else {
      button.textContent = 'Show Details';
    }
  });
});

// CONTACT FORM VALIDATION

const form = document.getElementById('contact-form');
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
  if (emailValue === '') {
    showError(emailInput, 'Please enter your email.');
    isValid = false;
  } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
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
    form.reset();
  }
});

// Function to handle the dark mode toggle
function toggleTheme() {
    // 1. Target the <body> tag
    const body = document.body;
    
    // 2. Toggle the 'dark-theme' class on the body
    body.classList.toggle('dark-theme');

    // Optional: Save the user's preference using local storage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Check for stored preference when the page loads
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Add event listener to the button once the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load the saved theme first
    loadTheme();
    
    // 2. Find the button by its ID ('theme-toggle')
    const toggleButton = document.getElementById('theme-toggle');

    // 3. Attach the toggle function to the button click event
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
});
