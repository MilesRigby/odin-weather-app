/*

    <form id="location-form">
        <label id="location-field-label" for="location" class="sr-only-label"></label>
        <input id="location-field" type="text" placeholder="Location...">
    </form>

*/

import ConstructHTMLFromObject from "../ContentBuilder.js";
import displayWeatherDataFor from "../weatherDisp/displayWeatherData.js";

const LocationFormDef = {

    "form": { attributes: { "id": "location-form" }, children: [
        {"label": { attributes: { "id": "location-field-label", "for": "location-field", "class": "sr-only-label" }, children: []}},
        {"input": { attributes: { "id": "location-field", "name": "location", "type": "text", "placeholder": "Location..." }, children: []}}
    ]}

}

const LocationForm = () => {
    const locationForm = ConstructHTMLFromObject(LocationFormDef);

    locationForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const location = new FormData(event.target).get('location');
        await displayWeatherDataFor(location);        
    })

    return locationForm;
}

export default LocationForm;