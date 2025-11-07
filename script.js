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
