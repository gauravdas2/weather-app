const yargs = require('yargs')
const axios = require('axios')
const argv = yargs
  .options({
      a : {
        demand : true,
        string : true,
        alias : 'address',
        describe : 'Address to fetch the weather info for'
      }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodeAddress = encodeURIComponent(argv.a)
var geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAtF0AVI5vwZSV68OLn4nlfa0laslr0gM8&address=${encodeAddress}`;

axios.get(geocodeurl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address.')
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/a52b408adc87077c98e1bc15ed3d6ae9/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
    var weatherInfo = {
      temperature : (response.data.currently.temperature - 32)*0.5556,
      apparentTemperature : (response.data.currently.apparentTemperature - 32)*0.5556,
      dew_point : response.data.currently.dewPoint,
      humidity : response.data.currently.humidity,
      pressure : response.data.currently.pressure
    };
    console.log(JSON.stringify(weatherInfo, undefined, 2))
}
).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to the server.')
  } else {
    console.log(e.message)
  }
});
