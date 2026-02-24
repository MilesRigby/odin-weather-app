// Import static content builder
import StaticContent from "./StaticContent/StaticContent.js";

// Import page content constructors
import ConstructWeatherDispPageContent from "./weatherDisp/page.js";

// Construct static content
StaticContent();

// Retrieve dynamic content div for display
const dynamicDiv = document.getElementById("dynamic-content");

// Object containing all constructable pages' content
const pages = {
    "weatherDisp": ConstructWeatherDispPageContent
}

// Callable function to load different pages on the site
const PageLoader = (page) => {
    dynamicDiv.innerHTML = '';
    dynamicDiv.appendChild(pages[page]());
}

export default PageLoader;