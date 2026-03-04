import { DataAccess } from "../../Data/weatherData.js";
import getWeatherDataFor from "../../Data/getWeatherData.js";
import schema from "./schema.js";

// Uses the API to retrieve weather data for a specified location to be displayed on the page
const DisplayWeatherDataFor = async (location) => {
    
    await getWeatherDataFor(location);
    DisplayDailyWeatherData(DataAccess.getDailyData());

    // Hide the hourly data view window, as it will not update to reflect new data until a day is clicked
    document.getElementById("hourly-weather-disp").style.display = "none";

}

// Displays provided data on the daily weather data scroll window
const DisplayDailyWeatherData = (dailyData) => {

    // Gets the daily data view window from the DOM
    const dailyWeatherView = document.getElementById("daily-weather-disp")
    
    // Retrieves the display items for each day's data
    const dailyItems = dailyWeatherView.querySelectorAll(".daily-weather-item");

    // Loop over display items and each day's data
    for ( const [itemNum, [date, dayData]] of Object.entries(dailyData).entries() ) {

        // Get the individual display item and display the date
        const dayItem = dailyItems[itemNum];
        const dateDisplay = dayItem.querySelector(".daily-weather-date")
        dateDisplay.innerText = date;

        // Add click event to daily weather item to load that day's hourly data
        dayItem.addEventListener("click", () => {
            const date = dateDisplay.textContent;
            const hourlyData = DataAccess.getHourlyData(date);
            DisplayHourlyWeatherData(hourlyData);
        })

        // Retrieve the data cell for each piece of weather data for the single day
        const dataCells = dayItem.querySelectorAll(".weather-data-cell");

        // Loop over individual data cells to display each piece of data, using the daily weather data schema
        for ( const [cellNum, [name, units]] of Object.entries(schema.daily).entries() ) {

            const valueDisplay = dataCells[cellNum].querySelector(".weather-data-value");

            valueDisplay.innerHTML = dayData[name] + units;

        }

    }

    // Displays the data view window, showing the loaded data to the user
    dailyWeatherView.style.display = "flex";

}

// Displays provided data on the hourly weather data scroll window
const DisplayHourlyWeatherData = (hourlyData) => {

    // Gets the hourly data view window from the DOM
    const hourlyWeatherView = document.getElementById("hourly-weather-disp");
    
    // Retrieves the display items for each day's data from the DOM
    const hourlyItems = hourlyWeatherView.querySelectorAll(".hourly-weather-item");

    // Loop over display items and each day's data, sorting hourly entries by time
    const orderedHourlyData = Object.entries(hourlyData).sort(([a], [b]) => a-b);
    for ( const [itemNum, [time, hourData]] of orderedHourlyData.entries() ) {

        // Get the individual display item and display the time
        const hourItem = hourlyItems[itemNum];
        const timeDisplay = hourItem.querySelector(".hourly-weather-time")
        timeDisplay.innerText = time + ":00";

        // Retrieve the data cell for each piece of weather data for the single day
        const dataCells = hourItem.querySelectorAll(".weather-data-cell");

        // Loop over individual data cells to display each piece of data, using the hourly weather data schema
        for ( const [cellNum, [name, units]] of Object.entries(schema.hourly).entries() ) {

            const valueDisplay = dataCells[cellNum].querySelector(".weather-data-value");

            valueDisplay.innerHTML = hourData[name] + units;

        }

    }

    // Displays the data view window, showing the loaded data to the user
    hourlyWeatherView.style.display = "flex";

}

export default DisplayWeatherDataFor;