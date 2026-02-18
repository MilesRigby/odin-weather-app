import getWeatherDataFromAPI from "./API-control/weatherAPI.js";
import ProcessAPIData from "./API-control/APIResponseProcessor.js";
import SaveWeatherData from "./Data/weatherData.js";
import { DataAccess } from "./Data/weatherData.js";

const response = await getWeatherDataFromAPI("london");

console.log(response);

const cleaned = ProcessAPIData(response);

console.log(cleaned);

SaveWeatherData(cleaned);
const dailyData = DataAccess.getDailyData();

console.log(dailyData);

const hourlyData = DataAccess.getHourlyData("20/02/2026");

console.log(hourlyData);