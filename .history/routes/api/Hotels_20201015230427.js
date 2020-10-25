var express = require("express");
const validateHotel = require("../../middlewares/validateHotel");
let router = express.Router();
var { Hotel } = require("../../models/hotels");
const multer = require("multer");
const { request, response } = require("../../app");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/sidra/Desktop/Backend/travel/public/images/hotels");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
}).any('file');
const params = {
  '/single': 'file',
  '/multiple': 'files'
};

function validate(req, res, next) {
  let param = params[req.url];
  if (!req[param]) {
    return res.send({
      errors: {
        message: `${param} cant be empty`
      }
    });
  }
  next();
}
/* GET hotels listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let hotels = await Hotel.find().skip(skipRecords).limit(perPage);
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
  hotel.Hotel_Name = req.body.Hotel_Name;
  hotel.Location = req.body.Location;
  hotel.ImageName = req.body.ImageName;
  hotel.ImageData = req.body.ImageData;
  hotel.Address = req.body.Address;
  hotel.Contact_No = req.body.Contact_No;
  hotel.Check_in_time = req.body.Check_in_time;
  hotel.Check_out_time = req.body.Check_out_time;
  hotel.Website = req.body.Website;
  hotel.Facilities = req.body.Facilities;
  hotel.Availability_status = req.body.Availability_status;
  hotel.Overall_Rating = req.body.Overall_Rating;
  await hotel.save();
  return res.send(hotel);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let hotel = await Tour.findByIdAndDelete(req.params.id);
  return res.send(hotel);
});
// upload.single("Images"),
/* Insert Record */
// validateHotel;
router.post("/", upload.single('files', 10), async (req, res) => {
  try {
    const hotel = new Hotel();
    // if (req.files == null) {
    //   return res.status(400).send("No file is uploaded");
    // }
  
    console.log(req.body);
    console.log(req.body.File);
    hotel.Hotel_Name = req.body.HotelName;
    hotel.Location = req.body.Location;
    hotel.ImageName = req.body.ImageName;
    hotel.ImageData = "C:/Users/sidra/Desktop/Backend/travel/public/images/hotels/" +req.body.file.name;
    // hotel.Images = req.body.Image;
    hotel.Address = req.body.Address;
    hotel.Contact_No = req.body.Contactno;
    hotel.Check_in_time = req.body.CheckIn;
    hotel.Check_out_time = req.body.CheckOut;
    hotel.Website = req.body.Website;
    hotel.Facilities = req.body.Facilities;
    hotel.Availability_status = req.body.Availability;
    hotel.Overall_Rating = req.body.Ratings;
    await hotel.save();
    // return res.send(hotel);
    return res.send("data");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
  //res.json({ filename: file.name, filePath: `/uploads/${file.name}` });
});
module.exports = router;
