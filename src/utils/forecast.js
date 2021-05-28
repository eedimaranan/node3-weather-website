const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const foreURL =
    "http://api.weatherstack.com/current?access_key=f165e643cf76706ce988dcf359cb7753&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url: foreURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.success === false) {
      callback("Unable to find", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees, it feels like " +
          body.current.feelslike +
          " degrees and the local time is " +
          body.location.localtime
      );
    }
  });
};

module.exports = forecast;
