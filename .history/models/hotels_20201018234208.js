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
    Hotel_Name: Joi.string().required(),
    Location: Joi.string().required(),
    Address: Joi.required.string().required(),
    Contact_No: Joi.string().required(),
    Website: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
    Facilities: Joi.string().required(),
    Availability_status: Joi.string().required(),
    Cost: Joi.Number().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
