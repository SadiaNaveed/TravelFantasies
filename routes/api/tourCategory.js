var express = require("express");
let router = express.Router();
const validateTourCategory = require("../../middlewares/validateTourCategories");
var { Tour_Category } = require("../../models/tour_categories");

/* GET categories listing. */
router.get("/", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let category = await Tour_Category.find().skip(skipRecords).limit(perPage);
  return res.send(category);
});

// /* GET single tour . */
// router.get("/:id", async (req, res) => {
//   //res.send(["Pen", "Pencil"]);
//   try {
//     let tour = await Tour.findById(req.params.id);
//     if (!tour)
//       return res.status(400).send("Tour with given ID is not present ");
//     return res.send(tour);
//   } catch (err) {
//     return res.status(400).send("Invalid ID");
//   }
// });
// /* Update Record */
// router.put("/:id", validateTour, async (req, res) => {
//   let tour = await Tour.findById(req.params.id);
//   tour.Title = req.body.Title;
//   tour.Description = req.body.Description;
//   tour.Images = req.body.Images;
//   tour.Host_Id = req.body.Host_Id;
//   tour.Start_Date = req.body.Start_Date;
//   tour.End_Date = req.body.End_Date;
//   tour.Status = req.body.Status;
//   tour.Total_Seats = req.body.Total_Seats;
//   tour.Available_Seats = req.body.Available_Seats;
//   tour.Tour_Type = req.body.Tour_Type;
//   tour.Details = req.body.Details;
//   tour.Cost = req.body.Cost;
//   tour.no_of_days = req.body.no_of_days;
//   await tour.save();
//   return res.send(tour);
// });

// /* Delete Record */
// router.delete("/:id", async (req, res) => {
//   let tour = await Tour.findByIdAndDelete(req.params.id);
//   return res.send(tour);
// });

// /* Insert Record */
// router.post("/", validateTour, async (req, res) => {
//   let tour = new Tour();
//   tour.Title = req.body.Title;
//   tour.Description = req.body.Description;
//   tour.Images = req.body.Images;
//   tour.Host_Id = req.body.Host_Id;
//   tour.Start_Date = req.body.Start_Date;
//   tour.End_Date = req.body.End_Date;
//   tour.Status = req.body.Status;
//   tour.Total_Seats = req.body.Total_Seats;
//   tour.Available_Seats = req.body.Available_Seats;
//   tour.Tour_Type = req.body.Tour_Type;
//   tour.Details = req.body.Details;
//   tour.Cost = req.body.Cost;
//   tour.no_of_days = req.body.no_of_days;
//   await tour.save();
//   return res.send(tour);
// });
module.exports = router;
