//? ******************************************** Script Caroussel *************************************************** 

const buttons = document.querySelectorAll(".btn");
const slides = document.querySelectorAll(".slide"); 

//Tableau d'image : [0, 1, 2]

//e.target.id === "next" ? 1 : -1
//Si e.target.id est égal à "next" alors tu renvoies '1' sinon tu renvoies '-1'


buttons.forEach((button) => {

    button.addEventListener('click',(e) => {
        const calcNextSlide = e.target.id === "next" ? 1 : -1; 
        const slideActive = document.querySelector(".active"); 


        newIndex = calcNextSlide + [...slides].indexOf(slideActive);
        if (newIndex < 0) newIndex =  [...slides].length-1; 
        if (newIndex >= [...slides].length) newIndex = 0;   

        slides[newIndex].classList.add('active');
        slideActive.classList.remove('active'); 
    })
})
//? ******************************************** Fin Script Caroussel *************************************************** 




//? ******************************************** TRANSITION Card Certifications *************************************************** 

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

