import { DataAccess } from "../../Data/weatherData.js";
import getWeatherDataFor from "../../Data/getWeatherData.js";

const displayWeatherDataFor = async (location) => {
    
    await getWeatherDataFor(location);
    displayWeatherData();

}

const displayWeatherData = () => {

    const dailyData = DataAccess.getDailyData();
    console.log(dailyData);

    const hourlyData = DataAccess.getHourlyData("23/02/2026");
    console.log(hourlyData);

}

export default displayWeatherDataFor;