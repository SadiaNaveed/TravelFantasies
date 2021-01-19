const express = require("express");
let router = express.Router();
let { User } = require("../../models/users");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const fs = require("fs");
const validateUser = require("../../middlewares/validateUser");
const validateUserLogin = require("../../middlewares/validateUserLogin");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/sidra/Desktop/Backend/travel/public/images/hotels");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});
//
router.post("/register", validateUser, async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  // if (req.file) {
  //   user.Image.data = fs.readFileSync(req.file.path);
  //   user.Image.contentType = req.file.mimetype;
  // } else {
  //   user.Image.data = null;
  //   user.Image.contentType = null;
  // }

  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role, email: user.email },
    config.get("jwtPrivateKey")
  );
  let dataToReturn = {
    name: user.name,
    email: user.email,
    token: user.token,
  };
  // return res.send(_.pick(user, ["name", "email"]));
  return res.send(dataToReturn);
});

/* Update Record */
router.put("/:id", upload.single("file"), async (req, res) => {
  let hotel = await User.findById(req.params.id);
  console.log(req.body);
  // hotel.HotelName = req.body.HotelName;
  // hotel.Category = req.body.Category;
  // hotel.Location = req.body.Location;
  // hotel.Image.data = hotel.Image.data;
  // hotel.Image.contentType = hotel.Image.contentType;
  // hotel.Address = req.body.Address;
  // hotel.Contactno = req.body.Contactno;
  // hotel.Website = req.body.Website;
  // hotel.Facilities = req.body.Facilities;
  // hotel.Status = req.body.Status;
  // hotel.Latitude = req.body.Latitude;
  // hotel.Longitude = req.body.Longitude;
  // hotel.AvgRatings = 0.0;
  // hotel.CountRatings = 0;
  // await hotel.save();
  return res.send("User Updated");
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await User.findByIdAndDelete(req.params.id);
  return res.send("Hotel has been Successfully Removed");
});
router.post("/login", validateUserLogin, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role, email: user.email },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});
router.get("/guides", async (req, res) => {
  let guides = await User.find({ role: "guide" });
  res.contentType("json");
  console.log(guides);
  return res.send(guides);
});
router.get("/admins", async (req, res) => {
  let admins = await User.find({ role: "admin" });
  res.contentType("json");
  console.log(admins);
  return res.send(admins);
});
/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let users = await User.find().skip(0).limit(20);
  res.contentType("json");
  console.log(users);
  return res.send(users);
});

/* GET single hotel . */

router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let user = await User.findById(req.params.id);
    if (!user)
      return res.status(400).send("User with given ID is not present ");
    return res.send(user);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
module.exports = router;
