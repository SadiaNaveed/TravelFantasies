var express = require("express");
const validateBookGuides = require("../../middlewares/validateBookGuides");
let router = express.Router();
var { Bookpackage } = require("../../models/BookPackages");
const stripe = require("stripe")(
  "sk_test_51I7lIfBWL3moS0kPsQ3sgvLyFQ0J7WbVK3VpN6ASY6PoW5HYDDlBHhk4BCUwsCa76gwVhDKcJTPxdhuBIR5lSdjV00dVIm4MfF"
);
const { v4: uuidv4 } = require("uuid");

//checkout//
router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idempotencykey = uuidv4();
    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
    });
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

/* GET GuideBookings listing. */
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let bookings = await Bookguide.find().skip(skipRecords).limit(perPage);
  return res.send(bookings);
});

/* GET single TourBooking . */
router.get("/:id", async (req, res) => {
  //res.send(["Pen", "Pencil"]);
  try {
    let bookGuide = await Bookguide.findById(req.params.id);
    if (!bookGuide)
      return res.status(400).send("Tour Booking with given ID is not present ");
    return res.send(bookGuide);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});
/* Update Record */
router.put("/:id", validateBookGuides, async (req, res) => {
  let BookGuides = await Bookguide.findById(req.params.id);
  BookGuides.Booking_Date = req.body.Booking_Date;
  BookGuides.GuideName = req.body.GuideName;
  BookGuides.Email = req.body.Email;
  BookGuides.ContactNo = req.body.ContactNo;
  BookGuides.Experience = req.body.Experience;
  BookGuides.Cost = req.body.Cost;
  BookGuides.Location = req.body.Location;
  BookGuides.Host_id = req.body.Host_id;

  await BookGuides.save();
  return res.send(BookGuides);
});

/* Delete Record */
router.delete("/:id", async (req, res) => {
  let Guide = await Bookguide.findByIdAndDelete(req.params.id);
  return res.send(Guide);
});

/* Insert Record */
router.post("/", async (req, res) => {
  console.log("----Testing---", req.body);
  let BookGuides = new Bookguide();
  BookGuides.Booking_Date = req.body.Booking_Date;
  BookGuides.GuideName = req.body.GuideName;
  BookGuides.Email = req.body.Email;
  BookGuides.ContactNo = req.body.ContactNo;
  BookGuides.Experience = req.body.Experience;
  BookGuides.Cost = req.body.Cost;
  BookGuides.Location = req.body.Location;
  BookGuides.Host_id = req.body.Host_id;

  let result = await BookGuides.save();
  console.log("---resu---", result);
  if (result._id) {
    return res.status(200).json({ message: "Successfully Created" });
  } else {
    return res.status(423).json({ message: "Something went wrong!" });
  }
});
module.exports = router;
