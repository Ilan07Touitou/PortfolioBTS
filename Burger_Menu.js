

const burgerButton = document.getElementById('burger-button');
const navLinks = document.getElementById('nav-links');

burgerButton.addEventListener('click', () => {
navLinks.classList.toggle('show');
});
