const request = require ('request');
const forecast = (lat, lon, calback) => {
    const url = 'https://api.darksky.net/forecast/c97a79ef706ba5569079e30f8326314a/' + lat + ',' + lon + '?units=si';
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            calback('Error occoured', undefined);
        }else if(body.error){
            calback('Unable to find location',undefined);
        }else{
            calback(undefined,{
                temprature:body.currently.temperature,
                chancesOfRain: body.currently.precipProbability
            })
        }
    });
}
module.exports = forecast;