const { validate } = require("../models/users");
function validateUserLogin(req, res, next) {
  let { error } = validateUserLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
module.exports = validateUserLogin;
