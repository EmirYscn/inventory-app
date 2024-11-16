const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get(
  "/dashboard",
  indexController.includeAsideProperties,
  indexController.getDashboard
);

router.post("/dashboard/createItem", indexController.createItem);
router.post(
  "/dashboard/createCategory",
  indexController.includeAsideProperties,
  indexController.createCategory
);

router.delete("/dashboard/delete/:id", indexController.deleteItem);

router.get(
  "/dashboard/edit/:id",
  indexController.includeAsideProperties,
  indexController.getUpdateItem
);
router.patch("/dashboard/edit/:id", indexController.updateItem);

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

router.get("/category/:itemType", indexController.getItemsByCategory);
router.get("/category/:itemType/:id", indexController.getItem);

module.exports = router;
