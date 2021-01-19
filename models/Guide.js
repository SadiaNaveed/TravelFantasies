var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError, string } = require("@hapi/joi");
const User = require("./users");
var bcrypt = require("bcryptjs");


var GuideSchema = mongoose.Schema({
  GuideName: String,
  ContactNo:Number,
  Location: String,
  Description: String,
  Email:String,
  Password: String,
  Images: {
    data: Buffer,
   contentType: String,
  },
  Details: String,
  Cost: Number,
  Experience: String,
  Visted_Places: String,
  Languages: String,
  
  Status: {
    type: Boolean,
    enum: ["true", "false"],
  },
  
});

GuideSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
};

var Guide = mongoose.model("Guide", GuideSchema);

function validateGuide(data) {
  const schema = Joi.object({
    GuideName: Joi.string(),
    ContactNo: Joi.required(),
    Location: Joi.string(),
    Email: Joi.string(),
    Description: Joi.string(),
    Images: Joi.string(),
    Guide_Id: Joi.string(),
    Status: Joi.required(),
    Details: Joi.string(),
    Cost: Joi.required(),
    Experience: Joi.string(),
    Visted_Places: Joi.string(),
    Languages: Joi.string(),
    Password: Joi.string().min(3).max(10).required()

  });
  return schema.validate(data, { abortEarly: false });
}


module.exports.Guide = Guide;
module.exports.validate = validateGuide;