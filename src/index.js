import "./styles.css";
import StaticContent from "./Pages/StaticContent/StaticContent.js";

StaticContent();




const dailyDisp = document.getElementById("daily-weather-disp");
const items = dailyDisp.querySelector(".scrollview-items");

let scrollSpace = items.scrollWidth;
let maxDisplacement = scrollSpace - dailyDisp.offsetWidth;
let currentDisp = 0;

window.addEventListener("resize", () => { 
    let ratio = currentDisp/maxDisplacement;

    scrollSpace = items.scrollWidth;
    maxDisplacement = scrollSpace - dailyDisp.offsetWidth;
    currentDisp = ratio*maxDisplacement;
    items.style.transition = `none`;
    items.style.transform = `translateX(-${currentDisp}px)`;
    items.style.transition = `transform 0.5s ease`;
});

const UpdateDisp = (disp) => {
    currentDisp += disp;

    if ( currentDisp < 0 ) { currentDisp = 0; }
    if ( currentDisp > maxDisplacement ) { currentDisp = maxDisplacement; }
}

const leftButton = dailyDisp.querySelector(".scrollview-left");
const rightButton = dailyDisp.querySelector(".scrollview-right");

leftButton.addEventListener("click", (event) => {
    event.preventDefault();

    UpdateDisp(-2*scrollSpace/15);
    items.style.transform = `translateX(-${currentDisp}px)`;
});

rightButton.addEventListener("click", (event) => {
    event.preventDefault();

    UpdateDisp(2*scrollSpace/15);
    items.style.transform = `translateX(-${currentDisp}px)`;
});

