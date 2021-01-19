var express = require("express");
let router = express.Router();
const validateGuide = require("../../middlewares/validateGuide");
var { Guide } = require("../../models/Guide");
const multer = require("multer");
const { request } = require("../../app");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
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


router.get("/", async (req, res) => {
  let guides = await Guide.find().skip(0).limit(20);
  res.contentType("json");
  console.log(guides);
  return res.send(guides);
});


/* GET tours listing. 
router.get("/", async (req, res) => {
  let guides = await Guide.findAll()
    console.log(guides)
  return res.send(guides);
});
*/

router.get("/unapproved", async (req, res) => {
  console.log("adssd")
  let guides = await Guide.find({Status:false})
    
  return res.send(guides);
});


router.get("/approved", async (req, res) => {
  console.log("adssd")
  let guides = await Guide.find({Status:true})
    
  return res.send(guides);
});

/* GET single guide . */
router.get("/:id", async (req, res) => {
  try {
    let guides = await Guide.findById(req.params.id);
    if (!guides)
      return res.status(400).send("Guide with given ID is not present ");
    return res.send(guides);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

/* Update Record */
router.put("/:id", validateGuide, async (req, res) => {
  let guide = await Guide.findById(req.params.id);
  guide.GuideName = req.body.GuideName;
  guide.ContactNo = req.body.ContactNo;
  guide.Description = req.body.Description;
  guide.Location = req.body.Location;
  guide.Images = req.file.path;
  guide.Guide_Id = req.body.Guide_Id;
  guide.Status = req.body.Status;
  guide.Details = req.body.Details;
  guide.Cost = req.body.Cost;
  guide.Experience = req.body.Experience;
  guide.Visted_Places = req.body.Visted_Places;
  guide.Languages = req.body.Languages;
  guide.Email = req.body.Email;
  guide.Password = req.body.Password;
  
  await guide.save();
  return res.send(guide);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let guide = await Guide.findByIdAndDelete(req.params.id);
  return res.send(guide);
});



router.post("/", async (req, res) => {
  //console.log(req.file);
  console.log(req.body, "helo working or not");

  let guide = new Guide();
  guide.GuideName = req.body.GuideName;
  guide.ContactNo = req.body.ContactNo;
  guide.Location = req.body.Location;
  guide.Description = req.body.Description;
  //guide.Images = req.file.path;
  guide.Guide_Id = req.body.Guide_Id;
  guide.Status = req.body.Status;
  guide.Details = req.body.Details;
  guide.Cost = req.body.Cost;
  guide.Experience = req.body.Experience;
  guide.Visted_Places = req.body.Visted_Places;
  guide.Languages = req.body.Languages;
  guide.Email = req.body.Email;
  guide.Password = req.body.Password;
  
  await guide.save();
  return res.send(guide);
});

router.post("/login", async (req, res) => {
  console.log(req.body)
  let guide = await Guide.findOne({ Email: req.body.email });


  if (!guide) return res.status(400).send("Guide Not Registered");
  // let isValid = await bcrypt.compare(req.body.password, guide.Password);
  console.log(guide)
  let isValid = (guide.Password == req.body.password)
  if (!isValid) return res.status(401).send("Invalid Password");
  let token = jwt.sign(
    { _id: guide._id, GuideName: guide.GuideName, Email: guide.Email },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});

router.put("/approved/:id", async (req, res) => {
  
  console.log(req.params.id)
  let guide = await Guide.findById(req.params.id);
  guide.Status = req.body.Status;
  await guide.save();
  return res.send(guide);
});

router.delete("/unapproved/:id", async (req, res) => {
  
  let guide = await Guide.findByIdAndDelete(req.params.id);
  return res.send("Tour has been Successfully Removed");
});

module.exports = router;