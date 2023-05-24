document.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('name');
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Welcome, ${name}!`;
  });
  