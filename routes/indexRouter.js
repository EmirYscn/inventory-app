const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { message: "hello world" });
});

module.exports = router;
