var express = require("express");
// const validatePackageReview = require("../../middlewares/validatePackageReview");
let router = express.Router();
var { PackageReview } = require("../../models/package_review");

router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let Reviews = await PackageReview.find().skip(skipRecords).limit(perPage);
  res.contentType("json");
  console.log(Reviews);
  return res.send(Reviews);
});

router.get("/:id", async (req, res) => {
  console.log("---[aram");
  try {
    let package = await PackageReview.find({ PackageId: req.params.id });
    if (!package)
      return res.status(400).send("package with given ID is not present ");
    return res.send(package);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const packageReview = new PackageReview();
    packageReview.Username = req.body.Username;
    packageReview.Comment = req.body.Comment;
    packageReview.Email = req.body.Email;
    packageReview.PackageId = req.body.packageID;
    packageReview.UserId = req.body.userID;

    await packageReview.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

module.exports = router;
