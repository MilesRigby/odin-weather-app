# odin-weather-app
A simple webpack weather app, created to practice API calls and data handling as part of The Odin Project

Features:
- Search for a town or city, and the site will retrieve weather data for the area, displaying daily data for the next ~2 weeks.
- Left and right arrows on either side of the display allow scrolling through the days, as not all will fit on the screen at once.
- Click on the card for a particular day to show a similar display providing hourly weather data for the chosen day. Can also be scrolled left/right.

index.js - the entry point for webpack. Performs initial load of the page's location search bar.

template.html - a largely blank html file to witch page content is added through JavaScript.

styles.css - contains all styles for the page, including scrolling behaviour for daily and hourly weather data displays.

/API-Control - contains functions for retrieving data from the Visual Crossing weather API, and processing it into the desired format, before storing it in the program's data.

/Data - stores weather data and provides the public-facing data access functions. Any part of the code that requires retrieving API data must do so through here.

/Pages - contains all page content, including static content that is always present (mainly the location seachbar), and methods for constructing the dynamic daily and hourly weather data UI elements. Uses a function, ConstructHTMLFromObject(), to allow defining the layout as JavaScript objects with similar syntax to HTML, making defining content much quicker and more easily readable in-code.

Available at github pages, link: https://milesrigby.github.io/odin-weather-app/
