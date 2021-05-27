const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaXNhZ2FuaTg4NzciLCJhIjoiY2twM3owdHFyMDdldjJ2bXUxd3UweTUybSJ9.sTl5ZHsPewkg3zfi6hdOqQ&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features[0] === undefined) {
      callback("Unable URL", undefined);
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
