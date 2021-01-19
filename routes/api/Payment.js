var express = require("express");
const validateHotel = require("../../middlewares/validateHotel");
const fs = require("fs");
let router = express.Router();
var { Hotel } = require("../../models/hotels");
const multer = require("multer");
const { request, response } = require("../../app");
const validateHotelCategory = require("../../middlewares/validateHotelCategory");
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
const { runInNewContext } = require("vm");
const { result } = require("lodash");

const stripe = require("stripe")(
  "sk_test_51HxugVIBUwNWeIqC9uarcpGZa5fx8c7dNWJKi8WkU0nMBT1wt60HiNBAXi4rMF2Qh3sl09Pqa1LqPeSkBXlWNfPq00hld8TzbH"
);

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

//const upload = multer({ dest: "uploads/" });
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});
//.any('file')

// const params = {
//   '/single': 'file',
//   '/multiple': 'files'
// };

// function validate(req, res, next) {
//   let param = params[req.url];
//   if (!req[param]) {
//     return res.send({
//       errors: {
//         message: `${param} cant be empty`
//       }
//     });
//   }
//   next();
// }
/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 2);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let hotels = await Hotel.find().skip(0).limit(20);
  res.contentType("json");
  console.log(hotels);
  return res.send(hotels);
});
router.get("/firstthree", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  // let page = Number(req.query.page ? req.query.page : 2);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  //.skip(skipRecords).limit(perPage)
  let hotels = await Hotel.find().limit(3);
  res.contentType("json");
  console.log(hotels);
  return res.send(hotels);
});

/* GET single hotel . */

router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let hotel = await Hotel.findById(req.params.id);
    if (!hotel)
      return res.status(400).send("Hotel with given ID is not present ");
    return res.send(hotel);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateHotel, async (req, res) => {
  let hotel = await Hotel.findById(req.params.id);
  hotel.HotelName = req.body.HotelName;
  hotel.Category = req.body.Category;
  hotel.Location = req.body.Location;
  hotel.Image.data = fs.readFileSync(req.file.path);
  hotel.Image.contentType = req.file.mimetype;
  hotel.Address = req.body.Address;
  hotel.Contactno = req.body.Contactno;
  hotel.Website = req.body.Website;
  hotel.Facilities = req.body.Facilities;
  hotel.Status = req.body.Status;
  hotel.Cost = req.body.Cost;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await Hotel.findByIdAndDelete(req.params.id);
  return res.send("Hotel has been Successfully Removed");
});
// upload.single("Images"),
/* Insert Record */
// validateHotel;

router.post("/", async (req, res) => {
  const totalAmount = req.body.totalAmount;
  const token = req.body.token;
  console.log(req.body);
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      });
    })
    .then((result) => res.status(200).send(result))
    .catch((error) => console.error(error));
});
module.exports = router;
