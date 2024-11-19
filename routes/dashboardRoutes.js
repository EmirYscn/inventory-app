const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.use(indexController.includeAsideProperties);

router.get("/", indexController.getDashboard);

router.post("/createItem", indexController.createItem);
router.post("/createCategory", indexController.createCategory);

router.delete("/delete/:id", indexController.deleteItem);
router.delete("/delete/category/:id", indexController.deleteCategory);

router.get("/edit/:id", indexController.getUpdateItem);
router.patch("/edit/:id", indexController.updateItem);

router.get("/category/uncategorized", indexController.getUncategorizedItems);
router.get("/category/:id", indexController.getCategoryItems);

router.get("/manufacturer/:id", indexController.getManufacturerItems);

module.exports = router;
