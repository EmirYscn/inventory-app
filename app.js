const express = require("express");
const dotenv = require("dotenv");
const path = require("node:path");
const methodOverride = require("method-override");

const indexRouter = require("./routes/indexRouter");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(methodOverride("_method"));

// setting up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app middleware to use form body in post router
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set router
app.use(indexRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    data: {
      message: "this route is not defined",
    },
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
