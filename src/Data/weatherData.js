let weatherData;

// Store provided weather data from API call
const SaveWeatherData = (data) => {
    weatherData = data;
}

// Retrieve data for display of all days
const getDailyData = () => {
    return weatherData;
}

// Retrieve data for hour display for a single day
const getHourlyData = (date) => {
    return weatherData[date].hours;
}

const DataAccess = {
    getDailyData: getDailyData,
    getHourlyData: getHourlyData,
}

export default SaveWeatherData;
export { DataAccess };