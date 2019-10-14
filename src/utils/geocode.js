const request = require('request');

const geoCode = (address, callback) => {
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWJkdWxiYXNpdG5hd2FiIiwiYSI6ImNrMGt4a3hmazBvNWMzbXBuajBiMnprM2QifQ.n5onSHFdZoW8FVyXmaZAnA&limit=1";
    request({ url: geoURL, json: true }, (error, response) => {
        // console.log(response.body.features);
        if (error) {
            callback("Error found please try again later", undefined);
        } else if (response.body.features.length === 0) {
            callback("No search result try different address", undefined);
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            });
        }
    })
}

module.exports = geoCode;