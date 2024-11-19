exports.protect = (req, res, next) => {
  // check if already has cookie to allow for dashboard access otherwise send to login page
  if (
    req.cookies &&
    (req.cookies.status === "admin" || req.cookies.status === "guest")
  ) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.login = (req, res, next) => {
  const password = req.body.password;
  if (password === process.env.DASHBOARD_PASSWORD) {
    res.cookie("status", "admin");
    res.redirect("/dashboard");
  } else if (password === process.env.DASHBOARD_GUEST_PASSWORD) {
    res.cookie("status", "guest");
    res.redirect("/dashboard");
  } else {
    res.render("loginPage", {
      error: "Incorrect password",
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.cookies.status)) {
      return;
    }
    next();
  };
};
