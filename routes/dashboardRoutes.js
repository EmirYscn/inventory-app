const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get(
  "/",
  indexController.includeAsideProperties,
  indexController.getDashboard
);

router.post("/createItem", indexController.createItem);
router.post(
  "/createCategory",
  indexController.includeAsideProperties,
  indexController.createCategory
);

router.delete("/delete/:id", indexController.deleteItem);
router.delete("/delete/category/:id", indexController.deleteCategory);

router.get(
  "/edit/:id",
  indexController.includeAsideProperties,
  indexController.getUpdateItem
);
router.patch("/edit/:id", indexController.updateItem);

router.get(
  "/category/:id",
  indexController.includeAsideProperties,
  indexController.getCategoryItems
);

router.get(
  "/manufacturer/:id",
  indexController.includeAsideProperties,
  indexController.getManufacturerItems
);

module.exports = router;
