exports.protect = (req, res, next) => {
  // check if already has cookie to allow for dashboard access otherwise send to login page
  if (req.cookies && req.cookies.status !== "logged") {
    res.redirect("/login");
  } else {
    next();
  }
};

exports.login = (req, res, next) => {
  const password = req.body.password;
  if (password === process.env.DASHBOARD_PASSWORD) {
    res.cookie("status", "logged");
    res.redirect("/dashboard");
  } else {
    res.render("loginPage", {
      error: "Incorrect password",
    });
  }
};
