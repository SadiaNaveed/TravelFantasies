var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelSchema = mongoose.Schema({
  Hotel_Name: String,
  Location: String,
  ImageName: {
    type: String,
    default: "none",
    required: true,
  },
  ImageData: {
    type: String,
    required: true,
  },
  //Images: String,
  Address: String,
  Contact_No: String,
  Check_in_time: String,
  Check_out_time: String,
  Website: String,
  Facilities: String,
  Availability_status: String,
  Overall_Rating: String,
});
var Hotel = mongoose.model("Hotel", HotelSchema);

function validateHotel(data) {
  const schema = Joi.object({
    Hotel_Name: Joi.string(),
    Location: Joi.string(),
    ImageName: Joi.string(),
    ImageData: Joi.string(),
    Address: Joi.string(),
    Contact_No: Joi.string(),
    Check_in_time: Joi.string(),
    Check_out_time: Joi.string(),
    Website: Joi.string(),
    Facilities: Joi.string(),
    Availability_status: Joi.string(),
    Overall_Rating: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
