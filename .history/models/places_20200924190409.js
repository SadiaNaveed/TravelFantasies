var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var placeSchema = mongoose.Schema({
  city: String,
  admin: Number,
  country: String,
  population_proper: String,
  iso2: String,
  capital: String,
  lat: String,
  lng: String,
  population: String,
});
var User = mongoose.model("User", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    Name: Joi.string().min(4).max(10).required(),
    Age: Joi.number().min(0).max(99).required(),
    CNIC: Joi.string().min(15).max(15).required(),
    Gender: Joi.string().required(),
    Email: Joi.string(),
    Contact_no: Joi.string(),
    Password: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.User = User;
module.exports.validate = validateUser;
