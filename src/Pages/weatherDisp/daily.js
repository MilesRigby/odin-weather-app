import ConstructHTMLFromObject from "../ContentBuilder.js";

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

    "div": { attributes: {"className": "daily-weather-data-cell"}, children: [
        { "p": { attributes: {"className": "daily-weather-data-name"}, children: []}},
        { "p": { attributes: {"className": "daily-weather-data-value"}, children: []}}
    ]}

}

// Object describing what pieces of data are to be displayed, and associated dummy data for initialisation
const weatherDataSchema = {
    "High": "-99&deg;",
    "Rainfall": "9.9mm",
    "Coverage": "9okt",
    "Feels Like": "-99&deg;",
    "Visibility": "99.9km",
    "UV Index": "99+",
    "Low": "-99&deg;",
    "Wind": "99mph",
    "Humidity": "99%"
}

// Constructs the HTML for display area of daily weather data
const ConstructHTML = () => {

    const dailyDisplay = ConstructHTMLFromObject(dailyDisplayDef);

    const itemsSection = dailyDisplay.querySelector(".scrollview-items");

    for (let i=0; i<15; i++) {
        const dayItem = ConstructHTMLFromObject(dayItemDef);
        itemsSection.appendChild(dayItem);

        const dataCells = dayItem.querySelector(".daily-weather-data");

        for ( const [name, placeholder] of Object.entries(weatherDataSchema) ) {

            const dataCell = ConstructHTMLFromObject(dataCellDef);
            dataCells.appendChild(dataCell);

            dataCell.querySelector(".daily-weather-data-name").innerText = name;
            dataCell.querySelector(".daily-weather-data-value").innerHTML = placeholder;

        }
    }

    return dailyDisplay;

}

// Adds javascript functionality to the HTML of the daily weather display
const ConstructDailyWeatherDataDisplay = () => {

    const dailyDisplay = ConstructHTML();

    const items = dailyDisplay.querySelector(".scrollview-items");

    // Determine how far the scrollview can scroll
    let scrollSpace = items.scrollWidth;
    let maxDisplacement = scrollSpace - dailyDisplay.offsetWidth;
    let currentDisp = 0;

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