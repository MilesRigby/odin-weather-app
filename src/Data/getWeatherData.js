import getWeatherDataFromAPI from "../API-control/weatherAPI.js";
import ProcessAPIData from "../API-control/APIResponseProcessor.js";
import SaveWeatherData from "./weatherData.js";

let currentLocationData = "";

// Retrieves the weather data for a specified location and processes/stores it locally
const getWeatherDataFor = async (location) => {

    // Stop if already have location's data - no need to call API if we already have the data
    if (location === currentLocationData) { return; }

    // Retrieve, process, and store weather data for location
    const response = await getWeatherDataFromAPI(location);
    const cleaned = ProcessAPIData(response);
    SaveWeatherData(cleaned);

    // Update location
    currentLocationData = location;

}

export default getWeatherDataFor;