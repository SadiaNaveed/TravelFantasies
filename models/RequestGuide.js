var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");
const User = require("./users");

var RequestGuideSchema = mongoose.Schema({

    Status: {
        type: Boolean,
        enum: ["true", "false"],
      },

      Guide_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guide",
      },

      Tour_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tours",
      },
    });

 var RequestGuide = mongoose.model("RequestGuide", RequestGuideSchema);   
 
 
 function validateRequestGuide(data) {
    const schema = Joi.object({
        Tour_Id: Joi.string(),
        Guide_Id: Joi.string(),
        Status: Joi.required(),
    });
    return schema.validate(data, { abortEarly: false });
  }
  module.exports.RequestGuide = RequestGuide;
  module.exports.validate = validateRequestGuide;