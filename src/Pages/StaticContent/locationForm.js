import ConstructHTMLFromObject from "../ContentBuilder.js";
import DisplayWeatherDataFor from "../weatherDisp/displayWeatherData.js";

const LocationFormDef = {

    "form": { attributes: { "id": "location-form" }, children: [
        {"label": { attributes: { "id": "location-field-label", "htmlFor": "location-field", "className": "sr-only-label" }, children: []}},
        {"input": { attributes: { "id": "location-field", "name": "location", "type": "text", "placeholder": "Location..." }, children: []}}
    ]}

}

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