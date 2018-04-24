const yargs = require('yargs')
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

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')
geocode.geocodeAddress(argv.a, (errorMessage , results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else if (results) {
    console.log(JSON.stringify(results, undefined, 2))
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
      }
    });
  }
});
