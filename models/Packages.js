var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");
const User = require("./users");

var PackagesSchema = mongoose.Schema({
  PackageName: String,
  PlaceName: String,
  Cost: Number,
  Discount: Number,
  Description: String,
  Detail: String,
  Meal: String,
  Hotel: String,
  no_of_days: String,
  AllowedPersons: Number,
  Location: String,
  Status: {
    type: Boolean,
    enum: ["true", "false"],
  },
  Images: [String],
  //  Images: {
  //    data: Buffer,
  //   contentType: String,
  //  },
  Facilities: String,
  Ratings: Number,
});

var Packages = mongoose.model("Packages", PackagesSchema);

function validatePackages(data) {
  const schema = Joi.object({
    PackageName: Joi.string(),
    PlaceName: Joi.string(),
    Cost: Joi.required(),
    Discount: Joi.number(),
    Description: Joi.string(),
    Detail: Joi.string(),
    Meal: Joi.string(),
    Hotel: Joi.string(),
    no_of_days: Joi.string(),
    AllowedPersons: Joi.required(),
    Location: Joi.string().required(),
    Status: Joi.required(),
    Ratings: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Packages = Packages;
module.exports.validate = validatePackages;
