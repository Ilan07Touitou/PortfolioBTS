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