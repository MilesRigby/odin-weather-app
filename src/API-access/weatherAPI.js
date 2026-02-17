async function getWeatherDataFromAPI(location) {
    
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + location + '?key=JVP5DSV9MFBR6GBNS8Q4SJU57');
    const data = await response.json();

    return data;
}

export default getWeatherDataFromAPI;