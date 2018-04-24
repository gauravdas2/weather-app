const request = require('request');
var getWeather = (lat, lng, callback) => {
  request({
    url : `https://api.darksky.net/forecast/a52b408adc87077c98e1bc15ed3d6ae9/${lat},${lng}`,
    json : true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the forecast.io server.');
    } else if (response.statusCode === 400){
      callback('Unable to unable the address.');
    } else if (response.statusCode === 200){
      callback(undefined, {
        temperature : (body.currently.temperature-32)*0.5556,
        apparentTemperature : (body.currently.apparentTemperature-32)*0.5556,
        dew_point : body.currently.dewPoint,
        humidity : body.currently.humidity,
        pressure : body.currently.pressure
      })
    } else {
      callback('Unable to fetch weather.')
    }
  })
};
module.exports.getWeather = getWeather;
