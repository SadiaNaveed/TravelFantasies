var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var Tour_CategorySchema = mongoose.Schema({
  Name: String,
});
var Tour_Category = mongoose.model(
  "Tour_Categories",
  Tour_CategorySchema,
  "Tour_Categories"
);

function validateTourCategory(data) {
  const schema = Joi.object({
    Name: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Tour_Category = Tour_Category;
module.exports.validate = validateTourCategory;
