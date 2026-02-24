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
    items.style.transform = `translateX(-${currentDisp}px)`;
});

const leftButton = dailyDisp.querySelector(".scrollview-left");
leftButton.style.display = `none`;

const rightButton = dailyDisp.querySelector(".scrollview-right");

const UpdateDisp = (disp) => {

    let hitEnd = false;

    currentDisp += disp;

    if ( currentDisp < 0 ) { currentDisp = 0; hitEnd = true; }
    if ( currentDisp > maxDisplacement ) { currentDisp = maxDisplacement; hitEnd = true; }

    items.style.transform = `translateX(-${currentDisp}px)`;

    return hitEnd;
}

leftButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (UpdateDisp(-2*scrollSpace/15)) {
        leftButton.style.display = `none`;
    }
    rightButton.style.display = `flex`;
});

rightButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (UpdateDisp(2*scrollSpace/15)) {
        rightButton.style.display = `none`;
    }
    leftButton.style.display = `flex`;
});

