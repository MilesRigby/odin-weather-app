// Object describing what pieces of data are to be displayed, ad their units, for daily and hourly displays
const schema = {
    daily: {
        "High": "&deg;C",
        "Rainfall": "mm",
        "Coverage": "%",
        "Feels Like": "&deg;C",
        "Visibility": "km",
        "UV Index": "",
        "Low": "&deg;C",
        "Wind": "mph",
        "Humidity": "%"
    },
    hourly: {
        "Temp": "&deg;C",
        "Rainfall": "mm",
        "Feels Like": "&deg;C",
        "Coverage": "%",
        "Wind": "mph",
        "Visibility": "km"
    }
}

export default schema;
