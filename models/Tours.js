var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");
const User = require("./users");

var TourSchema = mongoose.Schema({
  Title: String,
  Location: String,
  Description: String,
   Images: {
     data: Buffer,
    contentType: String,
   },
   Tour_Type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour_Category",
  },
  //Images: {
   // type: String,
  //  required: true,
 // },
  Start_Date: String,
  End_Date: String,
  Arrival_Time:String,
  Departure_Time:String,
  Status: {
    type: Boolean,
    enum: ["true", "false"],
  },

  Total_Seats: Number,
  Available_Seats: Number,
  Cost: Number,
  Ratings: Number,
  no_of_days: Number,
  Host_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

var Tour = mongoose.model("Tour", TourSchema);

function validateTour(data) {
  const schema = Joi.object({
    Title: Joi.string(),
    Location: Joi.string().required(),
    Description: Joi.string(),
    Host_Id: Joi.string(),
    Start_Date: Joi.required(),
    End_Date: Joi.required(),
    Arrival_Time: Joi.required(),
    Departure_Time: Joi.required(),
    Status: Joi.required(),
    Total_Seats: Joi.required(),
    Available_Seats: Joi.required(),
    Tour_Type: Joi.string(),
    Ratings: Joi.number(),
    Cost: Joi.required(),
    no_of_days: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Tour = Tour;
module.exports.validate = validateTour;
