import ConstructDailyWeatherDataDisplay from "./daily.js";
import ConstructHourlyWeatherDataDisplay from "./hourly.js";

// Constructs the weather display page, using the daily and hourly data scroll windows as the content
const ConstructWeatherDispPageContent = () => {

    const pageContent = document.createElement("div");
    pageContent.id = "weather-disp";

    pageContent.appendChild(ConstructDailyWeatherDataDisplay());
    pageContent.appendChild(ConstructHourlyWeatherDataDisplay());

    return pageContent;

}

export default ConstructWeatherDispPageContent;