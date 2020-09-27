var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var placeSchema = mongoose.Schema({
  city: String,
  admin: String,
  country: String,
  population_proper: String,
  iso2: String,
  capital: String,
  lat: String,
  lng: String,
  population: String,
});
var Place = mongoose.model("places", placeSchema);

function validateUser(data) {
  const schema = Joi.object({
    city: Joi.string(),
    admin: Joi.string(),
    country: Joi.string(),
    population_proper: Joi.string(),
    iso2: Joi.string(),
    capital: Joi.string(),
    lat: Joi.string(),
    lng: Joi.string(),
    population: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Place = Place;
module.exports.validate = validateUser;
