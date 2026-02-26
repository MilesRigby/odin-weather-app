import ConstructDailyWeatherDataDisplay from "./daily.js";
import ConstructHourlyWeatherDataDisplay from "./hourly.js";

const ConstructWeatherDispPageContent = () => {

    const pageContent = document.createElement("div");
    pageContent.id = "weather-disp";

    pageContent.appendChild(ConstructDailyWeatherDataDisplay());
    pageContent.appendChild(ConstructHourlyWeatherDataDisplay());

    return pageContent;

}

export default ConstructWeatherDispPageContent;