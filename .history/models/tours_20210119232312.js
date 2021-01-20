var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { ValidationError } = require("@hapi/joi");
const User = require("./users");

var TourSchema = mongoose.Schema({
  TourName: String,
  Location: String,
  Description: String,
  Images: {
    data: Buffer,
    contentType: String,
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourCategory",
  },

  Status: {
    type: Boolean,
    enum: ["true", "false"],
  },

  Host_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  Guide_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guide",
  },

  Start_Date: String,
  End_Date: String,
  Arrival_Time: String,
  Departure_Time: String,
  no_of_days: Number,
  Total_Seats: Number,
  Available_Seats: Number,
  Cost: Number,
  Facilities: String,
  AvgRatings: Number,
  CountRatings: Number,
});

var Tours = mongoose.model("Tour", TourSchema, "Tour");

function validateTour(data) {
  const schema = Joi.object({
    TourName: Joi.string(),
    Location: Joi.string().required(),
    Description: Joi.string(),
    Host_Id: Joi.string(),
    Guide_Id: Joi.string(),
    Start_Date: Joi.required(),
    End_Date: Joi.required(),
    Arrival_Time: Joi.required(),
    Departure_Time: Joi.required(),
    Status: Joi.required(),
    Total_Seats: Joi.required(),
    Available_Seats: Joi.required(),
    Tour_Type: Joi.string(),
    Facilities: Joi.string().required(),
    Cost: Joi.required(),
    no_of_days: Joi.required(),
    Ratings: Joi.number(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Tour = Tours;
module.exports.validate = validateTour;
