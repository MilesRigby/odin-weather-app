// Describes which values we need from the API response, and what they are to be called locally
const values = {
    day: {
        rainfall: 'precip',
        minTemp: 'tempmin',
        maxTemp: 'tempmax',
        maxFeelsLike: 'feelslikemax',
        humidity: 'humdity',
        cloudCoverage: 'cloudcover',
        visibility: 'visibility',
        uvIndex: 'uvindex',
        windSpeed: 'windspeed',
    },
    hour: {
        rainfall: 'precip',
        temp: 'temp',
        feelsLike: 'feelslike',
        visibility: 'visibility',
        cloudCoverage: 'cloudcover',
        windSpeed: 'windspeed',
    }
}

// Construct local data object from API data
const ProcessAPIData = (data) => {

    // Clear data
    const weatherData = {}

    // Loop over all days, and extract relevant data
    for (const day of data.days) {
        // Reformat date from yyyy-mm-dd to dd/mm/yyyy
        const formattedDate = day.datetime.split("-").reverse().join("/");

        // Process data for a single day
        weatherData[formattedDate] = ProcessDay(day);
    }

    // Return complete weatherData object
    return weatherData;

}

// Process data for a single day, returning an object containing all data for that day, including hour-by-hour.
const ProcessDay = (dayInfo) => {
    const dayData = {}

    // Extract main data for the day as a whole
    for (const [localName, APIField] of Object.entries(values.day)) {
        dayData[localName] = dayInfo[APIField];
    }

    // Create object to store info on each hour in the day's data
    dayData.hours = {}

    // Loop hour every hour in the day
    for (const hour of dayInfo.hours) {

        // Convert time from "hh:mm:ss" to "hh"
        const formattedTime = hour.datetime.split(":").slice(0,1);

        // Process data for a single hour
        dayData.hours[formattedTime] = ProcessHour(hour);
    }

    return dayData;
}

const ProcessHour = (hourInfo) => {
    const hourData = {}

    // Extract data for hour
    for (const [localName, APIField] of Object.entries(values.hour)) {
        hourData[localName] = hourInfo[APIField];
    }

    return hourData;

}

export default ProcessAPIData;