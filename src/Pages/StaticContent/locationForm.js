/*

    <form id="location-form">
        <label id="location-field-label" for="location" class="sr-only-label"></label>
        <input id="location-field" type="text" placeholder="Location...">
    </form>

*/

import ConstructHTMLFromObject from "../ContentBuilder.js";


const LocationFormDef = {

    "form": { attributes: { "id": "location-form" }, children: [
        {"label": { attributes: { "id": "location-field-label", "for": "location", "class": "sr-only-label" }, children: []}},
        {"input": { attributes: { "id": "location-field", "type": "text", "placeholder": "Location..." }, children: []}}
    ]}

}

const LocationForm = () => {
    return ConstructHTMLFromObject(LocationFormDef);
}

export default LocationForm;