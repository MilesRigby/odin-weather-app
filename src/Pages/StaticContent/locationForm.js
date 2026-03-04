import ConstructHTMLFromObject from "../ContentBuilder.js";
import DisplayWeatherDataFor from "../weatherDisp/displayWeatherData.js";

// Defines HTML of the form filled by the user to search a location's weather
const LocationFormDef = {

    "form": { attributes: { "id": "location-form" }, children: [
        {"label": { attributes: { "id": "location-field-label", "htmlFor": "location-field", "className": "sr-only-label" }, children: []}},
        {"input": { attributes: { "id": "location-field", "name": "location", "type": "text", "placeholder": "Get weather by location..." }, children: []}}
    ]}

}

// Constructs the location form and adds its behaviour - a submit button which displays the weather data for the specified location
const LocationForm = () => {
    const locationForm = ConstructHTMLFromObject(LocationFormDef);

    locationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const location = new FormData(event.target).get('location');
        await DisplayWeatherDataFor(location);        
    })

    return locationForm;
}

export default LocationForm;