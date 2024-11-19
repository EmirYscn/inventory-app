const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/category/:itemType", indexController.getItemsByCategory);
router.get("/category/:itemType/:id", indexController.getItem);

module.exports = router;
