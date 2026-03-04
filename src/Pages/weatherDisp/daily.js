import ConstructHTMLFromObject from "../ContentBuilder.js";
import schema from "./schema.js";

// Defines the top-level object for the display of daily weather data
const dailyDisplayDef = {

    "div": { attributes: {"id": "daily-weather-disp", "className": "horizontal-scroll-window"}, children: [
        { "div": { attributes: {"className": "scrollview-left scrollview-button"}, children: [
            { "p": { attributes: {"innerText": "<"}, children: []}}
        ]}},
        { "div": { attributes: {"className": "scrollview-right scrollview-button"}, children: [
            { "p": { attributes: {"innerText": ">"}, children: []}}
        ]}},

        { "div": { attributes: {"className": "scrollview-items"}, children: []}}
    ]}

};

// Defines the one-day items' layout
const dayItemDef = {

    "div": { attributes: {"className": "daily-weather-item"}, children: [
        { "p": {attributes: {"className": "daily-weather-date", "innerText": "99/99/9999"}, children: []}},
        { "div": { attributes: {"className": "daily-weather-data"}, children: []}}
    ]}

}

// Defines layout of a data-cell - nine are used to display distinct pieces of weather data
const dataCellDef = {

    "div": { attributes: {"className": "weather-data-cell"}, children: [
        { "p": { attributes: {"className": "weather-data-name"}, children: []}},
        { "p": { attributes: {"className": "weather-data-value"}, children: []}}
    ]}

}

// Constructs the HTML for display area of daily weather data
const ConstructHTML = () => {

    // Construct main display
    const dailyDisplay = ConstructHTMLFromObject(dailyDisplayDef);

    // Construct each day's individual display
    const itemsSection = dailyDisplay.querySelector(".scrollview-items");
    for (let i=0; i<15; i++) {
        const dayItem = ConstructHTMLFromObject(dayItemDef);
        itemsSection.appendChild(dayItem);

        // Construct each piece of weather data's display cell, using the schema to label each cell
        const dataCells = dayItem.querySelector(".daily-weather-data");
        for ( const name of Object.keys(schema.daily) ) {

            const dataCell = ConstructHTMLFromObject(dataCellDef);
            dataCells.appendChild(dataCell);

            dataCell.querySelector(".weather-data-name").innerText = name;

        }
    }

    return dailyDisplay;

}

// Adds javascript functionality to the HTML of the daily weather display
const ConstructDailyWeatherDataDisplay = () => {

    const dailyDisplay = ConstructHTML();

    const items = dailyDisplay.querySelector(".scrollview-items");

    // Determine how far the scrollview can scroll
    let scrollSpace;
    let maxDisplacement;
    let currentDisp;

    // Initialises scrollview measurements on adding element to DOM, and 
    // maintains current ratio between scroll distance and scrollview width on window resize
    const observer = new ResizeObserver(() => { 
        let ratio = maxDisplacement > 0 ? currentDisp/maxDisplacement : 0;

        scrollSpace = items.scrollWidth;
        maxDisplacement = scrollSpace - dailyDisplay.offsetWidth;
        currentDisp = ratio*maxDisplacement;
        items.style.transform = `translateX(-${currentDisp}px)`;
    });

    observer.observe(dailyDisplay);

    // Scrollview navigation buttons; left button starts invisible
    const leftButton = dailyDisplay.querySelector(".scrollview-left");
    leftButton.style.display = `none`;

    const rightButton = dailyDisplay.querySelector(".scrollview-right");

    // Helper function to move the viewport, clamping scrolling and returning whether an end is reached
    const UpdateDisp = (disp) => {

        let hitEnd = false;

        currentDisp += disp;

        if ( currentDisp < 0 ) { currentDisp = 0; hitEnd = true; }
        if ( currentDisp > maxDisplacement ) { currentDisp = maxDisplacement; hitEnd = true; }

        items.style.transform = `translateX(-${currentDisp}px)`;

        return hitEnd;
    }

    // Add behaviour to left and right nav buttons, allowing user to scroll through the weather data
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

    return dailyDisplay;

}

export default ConstructDailyWeatherDataDisplay;