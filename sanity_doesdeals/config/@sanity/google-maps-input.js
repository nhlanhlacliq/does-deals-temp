require('dotenv').config();

//Trying this.. not working currently

export default JSON.parse(
    {
        "apiKey": process.env.GOOGLE_MAPS_API_KEY,
        "defaultZoom": 11,
        "defaultLocale": null,
        "defaultLocation": {
          "lat": 40.7058254,
          "lng": -74.1180863
        }
    }
)