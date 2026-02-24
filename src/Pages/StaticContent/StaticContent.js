import LocationForm from "./locationForm.js"

const StaticContent = () => {

    const pageContent = document.getElementById("page-content");

    pageContent.appendChild(LocationForm());

    const dynamicContent = document.createElement("div");
    dynamicContent.id = "dynamic-content";
    pageContent.appendChild(dynamicContent);

    return pageContent;

}

export default StaticContent;