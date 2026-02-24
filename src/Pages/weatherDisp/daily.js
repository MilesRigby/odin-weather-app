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

// Constructs the display area for daily weather data
const ConstructDailyWeatherDataDisplay = () => {

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

export default ConstructDailyWeatherDataDisplay;