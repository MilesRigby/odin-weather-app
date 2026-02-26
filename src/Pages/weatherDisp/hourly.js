import ConstructHTMLFromObject from "../ContentBuilder.js";

// Defines the top-level object for the display of hourly weather data
const hourlyDisplayDef = {

    "div": { attributes: {"id": "hourly-weather-disp", "className": "horizontal-scroll-window"}, children: [
        { "div": { attributes: {"className": "scrollview-left scrollview-button"}, children: [
            { "p": { attributes: {"innerText": "<"}, children: []}}
        ]}},
        { "div": { attributes: {"className": "scrollview-right scrollview-button"}, children: [
            { "p": { attributes: {"innerText": ">"}, children: []}}
        ]}},

        { "div": { attributes: {"className": "scrollview-items"}, children: []}}
    ]}

};

// Defines the one-hour items' layout
const hourItemDef = {

    "div": { attributes: {"className": "hourly-weather-item"}, children: [
        { "p": {attributes: {"className": "hourly-weather-time", "innerText": "99AM"}, children: []}},
        { "div": { attributes: {"className": "hourly-weather-data"}, children: []}}
    ]}

}

// Defines layout of a data-cell - nine are used to display distinct pieces of weather data
const dataCellDef = {

    "div": { attributes: {"className": "weather-data-cell"}, children: [
        { "p": { attributes: {"className": "weather-data-name"}, children: []}},
        { "p": { attributes: {"className": "weather-data-value"}, children: []}}
    ]}

}

// Object describing what pieces of data are to be displayed, and associated dummy data for initialisation
const weatherDataSchema = {
    "Temp": "-99&deg;",
    "Rainfall": "9.9mm",
    "Feels Like": "-99&deg;",
    "Coverage": "9okt",
    "Wind": "99mph",
    "Visibility": "99.9km"
}

// Constructs the HTML for display area of hourly weather data
const ConstructHTML = () => {

    const hourlyDisplay = ConstructHTMLFromObject(hourlyDisplayDef);

    const itemsSection = hourlyDisplay.querySelector(".scrollview-items");

    for (let i=0; i<24; i++) {
        const hourItem = ConstructHTMLFromObject(hourItemDef);
        itemsSection.appendChild(hourItem);

        const dataCells = hourItem.querySelector(".hourly-weather-data");

        for ( const [name, placeholder] of Object.entries(weatherDataSchema) ) {

            const dataCell = ConstructHTMLFromObject(dataCellDef);
            dataCells.appendChild(dataCell);

            dataCell.querySelector(".weather-data-name").innerText = name;
            dataCell.querySelector(".weather-data-value").innerHTML = placeholder;

        }
    }

    return hourlyDisplay;

}

// Adds javascript functionality to the HTML of the hourly weather display
const ConstructHourlyWeatherDataDisplay = () => {

    const hourlyDisplay = ConstructHTML();

    const items = hourlyDisplay.querySelector(".scrollview-items");

    // Determine how far the scrollview can scroll
    let scrollSpace;
    let maxDisplacement;
    let currentDisp;

    // Initialises scrollview measurements on adding element to DOM, and 
    // maintains current ratio between scroll distance and scrollview width on window resize
    const observer = new ResizeObserver(() => { 
        let ratio = maxDisplacement > 0 ? currentDisp/maxDisplacement : 0;

        scrollSpace = items.scrollWidth;
        maxDisplacement = scrollSpace - hourlyDisplay.offsetWidth;
        currentDisp = ratio*maxDisplacement;
        items.style.transform = `translateX(-${currentDisp}px)`;
    });

    observer.observe(hourlyDisplay);

    // Scrollview navigation buttons; left button starts invisible
    const leftButton = hourlyDisplay.querySelector(".scrollview-left");
    leftButton.style.display = `none`;

    const rightButton = hourlyDisplay.querySelector(".scrollview-right");

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
        if (UpdateDisp(-3*scrollSpace/24)) {
            leftButton.style.display = `none`;
        }
        rightButton.style.display = `flex`;
    });

    rightButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (UpdateDisp(3*scrollSpace/24)) {
            rightButton.style.display = `none`;
        }
        leftButton.style.display = `flex`;
    });

    return hourlyDisplay;

}

export default ConstructHourlyWeatherDataDisplay;