import LocationForm from "./locationForm.js"

// Constructs the static content of the webpage - consisting of the weather location search form, and a div for the page's dynamic content
const StaticContent = () => {

    const pageContent = document.getElementById("page-content");

    pageContent.appendChild(LocationForm());

    const dynamicContent = document.createElement("div");
    dynamicContent.id = "dynamic-content";
    pageContent.appendChild(dynamicContent);

    return pageContent;

}

export default StaticContent;