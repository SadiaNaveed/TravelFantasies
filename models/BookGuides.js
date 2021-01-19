var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var BookGuideSchema = mongoose.Schema({
  Booking_Date: String,
  GuideName: String,
  ContactNo: String,
  Cost: Number,
  Email: String,
  Location: String,
  Host_id: String,
});
var Bookguide = mongoose.model("Bookguide", BookGuideSchema);

function validateBookGuides(data) {
  const schema = Joi.object({
    Booking_Date: Joi.string(),
    GuideName: Joi.string(),
    ContactNo: Joi.string(),
    Host_id: Joi.string(),
    Email: Joi.string(),
    Cost: Joi.number(),

    Location: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Bookguide = Bookguide;
module.exports.validate = validateBookGuides;
