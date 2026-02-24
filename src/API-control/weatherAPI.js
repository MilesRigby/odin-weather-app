const APICallDesc = {
    urlBase: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/',
    options: {
        key: ['JVP5DSV9MFBR6GBNS8Q4SJU57'],
        unitGroup: ['uk'],
        include: ['days', 'hours'],
        elements: ['datetime', 'precip', 'tempmax', 'tempmin', 'feelslikemax', 'humidity', 'uvindex', 'temp', 'feelslike', 'windspeed', 'cloudcover', 'visibility']
    }
}

// Constructs an API call to Visual Crossing's weather API
const ConstructAPICall = (location) => {
    
    // API base url for all calls
    let call = APICallDesc.urlBase;

    // Make user's location query
    call = call.concat(location, '?');

    // Construct optional fields of API call
    for (const [option, fields] of Object.entries(APICallDesc.options)) {

        // Each option needs an ampersand, and an equals sign before the options list
        call = call.concat('&', option, '=');

        // Create the list of option parameters, separated by commas
        let optionList = '';
        for (const item of fields) {
            optionList = optionList.concat(item, ',');
        }
        optionList = optionList.slice(0, -1);

        // Add option parameters to 
        call = call.concat(optionList);
    }

    return call;
}

const getWeatherDataFromAPI = async (location) => {

    const apiCall = ConstructAPICall(location);

    console.log("Calling weather API at: " + apiCall);
    
    const response = await fetch(apiCall);
    const data = await response.json();

    return data;
}

export default getWeatherDataFromAPI;