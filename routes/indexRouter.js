const express = require("express");
const authController = require("./../controllers/authController");
const dashboardRouter = require("./dashboardRoutes");
const shopRouter = require("./shopRoutes");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("loginPage");
});

router.post("/login", authController.login);

router.use("/dashboard", authController.protect, dashboardRouter);
router.use("/shop", shopRouter);

module.exports = router;
