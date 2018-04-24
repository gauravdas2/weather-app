const request = require('request')

var geocodeAddress = (address, callback) => {
  request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAtF0AVI5vwZSV68OLn4nlfa0laslr0gM8&address='+encodeURIComponent(address),
    json : true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to the Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        Address : body.results[0].formatted_address,
        Latitude : body.results[0].geometry.location.lat,
        Longitude : body.results[0].geometry.location.lng
      })
    }
  })
};

module.exports.geocodeAddress = geocodeAddress;
