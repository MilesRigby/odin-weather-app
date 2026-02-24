import ConstructDailyWeatherDataDisplay from "./daily.js";

const ConstructWeatherDispPageContent = () => {

    const pageContent = document.createElement("div");
    pageContent.id = "weather-disp";

    pageContent.append(ConstructDailyWeatherDataDisplay());

    return pageContent;

}

export default ConstructWeatherDispPageContent;