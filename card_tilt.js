const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    const content = card.querySelector(".content-card");
    const image = content.querySelector("img");
    const glow = card.querySelector(".glow");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = - (x - centerX) / 10;
        const rotateX = (y - centerY) / 10;

        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        glow.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        glow.style.backgroundPosition = `${glowX}% ${glowY}%`;

        image.style.filter = "grayscale(0%)";
        glow.style.visibility = "visible";
        glow.style.opacity = "0.87";
    });

    card.addEventListener("mouseleave", () => {
        content.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        glow.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;

        image.style.filter = "grayscale(80%)";
        glow.style.opacity = "0";
        glow.style.visibility = "hidden";
    });
});




if (window.innerWidth <= 768) {
    const cards = document.querySelectorAll('.card');
    const delayBetweenCards = 300; // Délai entre chaque groupe de 2 cartes
    const waveDuration = 1000; // Durée de l'effet
    const pauseBetweenWaves = 5000; // Pause entre chaque vague
    let currentIndex = 0;

    function resetCard(card) {
        const content = card.querySelector(".content-card");
        const glow = card.querySelector(".glow");
        const image = content.querySelector("img");

        content.style.transform = "scale(1)";
        glow.style.opacity = "0";
        glow.style.visibility = "hidden";
        image.style.filter = "grayscale(80%)";
    }

    function applyEffect(card) {
        const content = card.querySelector(".content-card");
        const glow = card.querySelector(".glow");
        const image = content.querySelector("img");

        content.style.transition = "transform 0.6s ease";
        glow.style.transition = "opacity 0.6s ease";
        image.style.transition = "filter 0.6s ease";

        content.style.transform = "scale(1.05)";
        glow.style.opacity = "0.85";
        glow.style.visibility = "visible";
        image.style.filter = "grayscale(0%)";

        // Retour à la normale après l'effet
        setTimeout(() => {
            resetCard(card);
        }, waveDuration);
    }

    function runWaveFromStart() {
        let i = 0;

        function waveStep() {
            if (i >= cards.length) {
                setTimeout(() => {
                    currentIndex = 0;
                    runWaveFromStart(); // Redémarre la vague
                }, pauseBetweenWaves);
                return;
            }

            // Applique l’effet sur 2 cartes maximum à la fois
            applyEffect(cards[i]);
            if (i + 1 < cards.length) {
                applyEffect(cards[i + 1]);
            }

            i += 1; // Décale d'une carte à la fois pour un effet fluide
            setTimeout(waveStep, delayBetweenCards);
        }

        waveStep();
    }

    runWaveFromStart();
}
