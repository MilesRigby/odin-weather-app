import getWeatherDataFromAPI from "./API-access/weatherAPI.js";

console.log(await getWeatherDataFromAPI("london"));