const { json } = require("body-parser");
const { validate } = require("../models/hotels");
function validateHotel(req, res, next) {
  req.body.contentType("json");
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateHotel;
