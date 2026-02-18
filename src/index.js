import getWeatherDataFromAPI from "./API-control/weatherAPI.js";
import ProcessAPIData from "./API-control/APIResponseProcessor.js";

const response = await getWeatherDataFromAPI("london");

console.log(response);

const cleaned = ProcessAPIData(response);

console.log(cleaned);