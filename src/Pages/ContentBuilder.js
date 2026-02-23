/*

ConstructHTMLFromObject is a recursive function which takes as input a nest javascript objects
The nesting of the passed object must reflect the nesting of the desired HTML.
Each HTML element can be provided any number of attributes similar to in standard HTML.
Object syntax provided below.

*/

/*

Syntax:

const blueprint = {

    "element": {
        attributes: {
            "attribute1": "attribute1Value",
            "attribute2": "attribute2Value",
            "attribute3": "attribute3Value",
        },
        children: [
            {...},
            {...},
            {...}
        ]
    }

}


Suggestion for more HTML-like format (identical to above, except for whitespace):

const blueprint = {

    "element": { attributes: { "attribute1": "attribute1Value", "attribute2": "attribute2Value", "attribute3": "attribute3Value" }, children: [
            {...},
            {...},
            {...} 
    ]}

}

Where children {...} share the same syntax, until an element with no children is reached

Recursive function to construct content from objects (UNTESTED):

*/

// Constructs DOM objects from javascript objects of the above format
const ConstructHTMLFromObject = (object) => {

    // Retrieve element name ("p", "div", "input", etc)
    const elementName = Object.keys(object)[0];

    // Create element requested
    const element = document.createElement(elementName);

    // Retrieve list of attributes to assign
    const attributes = object[elementName].attributes;

    // Assign all provided attributes and their values, e.g. element.id, element.className, element.innerText, etc
    for (const [attribute, assignment] of Object.entries(attributes)) {
        element[attribute] = assignment;
    }

    // Retrieve child elements
    const children = object[elementName].children;

    // Create all required child elements using recursive calls and append them to the element
    for (let i=0; i<children.length; i++) {
        const child = ConstructHTMLFromObject(children[i]);
        element.appendChild(child);
    }

    // Return constructed element tree for use in the DOM
    return element;

}

export default ConstructHTMLFromObject;