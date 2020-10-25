var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelSchema = mongoose.Schema({
  Hotel_Name: String,
  Location: String,
  Image: {
    data: Buffer,
    contentType: String
  },
  Address: String,
  Contact_No: String,
  Website: String,
  Facilities: String,
  Availability_status: String,
  Cost: Number,
});
var Hotel = mongoose.model("Hotel", HotelSchema);

function validateHotel(data) {
  const schema = Joi.object({
    Hotel_Name: Joi.required.string(),
    Location: Joi.required.string(),
    Address: Joi.required.string(),
    Contact_No: Joi.required.string(),
    Website: Joi.required.string(),
    Facilities: Joi.required.string(),
    Availability_status: Joi.required.string(),
    Overall_Rating: Joi.required.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
