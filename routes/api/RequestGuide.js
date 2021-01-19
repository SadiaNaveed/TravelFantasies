var express = require("express");
const validateRequestGuide = require("../../middlewares/validateRequestGuide");
let router = express.Router();
var { RequestGuide } = require("../../models/RequestGuide");
var { Guide } = require("../../models/Guide");

const { request } = require("../../app");

router.post("/tour", async (req, res) => {
  let requestedguide = await RequestGuide.find({ Status: true });
  let guides = []
  requestedguide.map((rg) => {
    if (rg.Tour_Id == req.body.tourId.tour) 
    guides.push(rg);
  });
  let guideIds = [] 
  guides.map((rg) => {
    guideIds.push(rg.Guide_Id);
  });
  let guides2 = await Guide.find({ _id: { $in: guideIds } });
  return res.send(guides2);
});

router.get("/unapproved", async (req, res) => {
  
  let requestedguide = await RequestGuide.find({ Status: false });
  let guideIds = [] 
  requestedguide.map((rg) => {
    guideIds.push(rg.Guide_Id);
  });
  console.log(guideIds);
  let guides2 = await Guide.find({ _id: { $in: guideIds } });
  return res.send(guides2);

});

router.get("/approved", async (req, res) => {
  
  let requestedguide = await RequestGuide.find({ Status: true });
  let guideIds = [] 
  requestedguide.map((rg) => {
    guideIds.push(rg.Guide_Id);
  });
  console.log(guideIds);
  let guides2 = await Guide.find({ _id: { $in: guideIds } });
  return res.send(guides2);

});


router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let requestedguide = await RequestGuide.findById(req.params.id);
    if (!requestedguide)
      return res.status(400).send("Guide with given ID is not present ");
    return res.send(requestedguide);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.put("/:id", validateRequestGuide, async (req, res) => {
  let requestedguide = await RequestGuide.findById(req.params.id);

  tour.Tour_Id = req.body.Tour_Id;
  tour.Guide_Id = req.body.Guide_Id;
  tour.Status = req.body.Status;
  await requestedguide.save();
  return res.send(requestedguide);
});

router.put("/approved/:id", async (req, res) => {
  console.log(req.params.id)
  let requestedguide = await RequestGuide.findOne({Guide_Id: req.params.id});
  requestedguide.Status = req.body.Status;
  await requestedguide.save();
  return res.send(requestedguide);
});

router.delete("/unapproved/:id", async (req, res) => {
  let requestedguide = await RequestGuide.findByIdAndDelete(req.params.id);
  return res.send("Guide has been Successfully Removed");
});

router.delete("/:id", async (req, res) => {
  let requestedguide = await RequestGuide.findByIdAndDelete(req.params.id);
  return res.send("Guide has been Successfully Removed");
});

router.post("/", async (req, res) => {
  //console.log(req.file);
  try {
    const requestedguide = new RequestGuide();
    console.log(req.body);
    requestedguide.Tour_Id = req.body.Tour_Id;
    requestedguide.Guide_Id = req.body.Guide_Id;
    requestedguide.Status = req.body.Status;
    await requestedguide.save();
    return res.send(requestedguide);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
