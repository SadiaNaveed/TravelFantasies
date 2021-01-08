var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var HotelSchema = mongoose.Schema({
  HotelName: String,
  Location: String,
  Image: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HotelCategory",
  },
  Address: String,
  Contactno: String,
  Website: String,
  Facilities: String,
  Status: String,
  Cost: Number,
  Latitude: Number,
  Longitude: Number,
  AvgRatings: Number,
  CountRatings: Number,
});
var Hotel = mongoose.model("Hotel", HotelSchema);

function validateHotel(data) {
  const schema = Joi.object({
    HotelName: Joi.string().required(),
    Location: Joi.string().required(),
    Address: Joi.string().required(),
    Contactno: Joi.string().required(),
    Website: Joi.string().required(),
    Facilities: Joi.string().required(),
    Status: Joi.string().required(),
    Category: Joi.required(),
    Latitude: Joi.required(),
    Longitude: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Hotel = Hotel;
module.exports.validate = validateHotel;
