var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");

var BlogCategorySchema = mongoose.Schema({
  CategoryName: String,
  Description: String,
});
var BlogCategory = mongoose.model(
  "BlogCategory",
  BlogCategorySchema,
  "BlogCategory"
);

function validateBlogCategory(data) {
  const schema = Joi.object({
    CategoryName: Joi.string(),
    Description: Joi.string(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.BlogCategory = BlogCategory;
module.exports.validate = validateBlogCategory;
