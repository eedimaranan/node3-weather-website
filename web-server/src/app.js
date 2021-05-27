const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { request } = require("express");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Gani Dimaranan",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Gani",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Example message",
    name: "Gani",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide adress",
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, foredata) => {
        if (error) {
          return res.send({ error });
        }
        res.send([
          {
            forecast: foredata,
            location,
            address: req.query.address,
          },
        ]);
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    header: "Help article not found",
    name: "Gani",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    header: "Error 404 not found",
    name: "Gani",
  });
});
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
