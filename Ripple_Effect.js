
document.querySelectorAll('.ripple-link').forEach(link => {
    link.addEventListener('click', function (e) {
    e.preventDefault(); // Bloque la redirection immédiate

    const ripple = this;

    ripple.classList.remove('ripple-effect'); // reset si besoin

    // Force reflow pour relancer l’animation si nécessaire
    void ripple.offsetWidth;

    ripple.classList.add('ripple-effect');

    setTimeout(() => {
        window.location.href = ripple.getAttribute('href');
    }, 400); // même durée que l’animation
    });
});
