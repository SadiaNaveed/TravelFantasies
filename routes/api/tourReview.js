var express = require("express");
const validateTourBooking = require("../../middlewares/validateTourBooking");
let router = express.Router();
var { TourReview } = require("../../models/tour_reviews");
const fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "E:/semester 8/Software Testing/TravelFantasies-master/public/images/tours");
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

//const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});
//.any('file')

/* GET HotelReviews listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let Reviews = await TourReview.find().skip(skipRecords).limit(perPage);
  res.contentType("json");
  console.log(Reviews);
  return res.send(Reviews);
});

/* GET single HotelBooking . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tourBooking = await TourReview.findById(req.params.id);
    if (!tourBooking)
      return res.status(400).send("Tour with given ID is not present ");
    return res.send(tourBooking);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
router.get("/Review/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let tourReview = await TourReview.find({ TourId: req.params.id });
    if (!tourReview)
      return res.status(400).send("Tour with given ID is not present ");
    return res.send(hotelReview);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateTourBooking, async (req, res) => {
  let TourReviews = await TourReview.findById(req.params.id);
  TourReviews.Ratings = req.body.Ratings;
  TourReviews.Comment = req.body.Comment;
  TourReviews.TourId = req.body.Tour_id;
  // HotelReviews.Image.data = fs.readFileSync(req.file.path);
  // HotelReviews.Image.contentType = req.file.mimetype;
  TourReviews.file = req.files;
  TourReviews.Date = req.body.Date;

  //  HotelBooking. UserId= req.body.User_id;
  await TourReviews.save();
  return res.send(TourReviews);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let TourReviews = await TourReview.findByIdAndDelete(req.params.id);
  return res.send(TourReviews);
});

/* Insert Record */
//;
router.post("/", upload.single("file"), async (req, res) => {
  let TourReviews = new TourReview();
  TourReviews.Ratings = req.body.Ratings;
  TourReviews.Comment = req.body.Comment;
  TourReviews.TourId = req.body.Tour_id;
  TourReviews.UserId = req.body.User_Id;
  TourReviews.Name = req.body.Name;
  TourReviews.Date = req.body.Date;
  // HotelReviews.Image.data = fs.readFileSync(req.file.path);
  // HotelReviews.Image.contentType = req.file.mimetype;
  await TourReviews.save();
  return res.send(TourReviews);
});
module.exports = router;