const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { message: "hello world" });
});

router.get(
  "/dashboard",
  indexController.includeAsideProperties,
  indexController.getDashboard
);

router.delete("/dashboard/delete/:id", indexController.deleteItem);

router.get(
  "/dashboard/category/:id",
  indexController.includeAsideProperties,
  indexController.getCategoryItems
);

router.get(
  "/dashboard/manufacturer/:id",
  indexController.includeAsideProperties,
  indexController.getManufacturerItems
);

// router.get("/fingerboards", indexController.getFingerboards);

module.exports = router;
