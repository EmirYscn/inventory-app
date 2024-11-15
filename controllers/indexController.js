const db = require("../db/queries");

exports.includeAsideProperties = async (req, res, next) => {
  const categories = await db.getCategories();
  const manufacturers = await db.getManufacturers();
  req.categories = categories;
  req.manufacturers = manufacturers;
  next();
};
exports.getDashboard = async (req, res, next) => {
  // LATER AUTHENTICATE ADMIN
  const items = await db.getItems();
  const categories = req.categories;
  const manufacturers = req.manufacturers;
  res.render("dashboard", {
    manufacturers,
    categories,
    items,
  });
};

exports.getCategoryItems = async (req, res, next) => {
  const { id } = req.params;
  const categories = req.categories;
  const manufacturers = req.manufacturers;

  try {
    const doc = await db.getCategoryItems(id);

    res.render("dashboard", {
      items: doc,
      categories,
      manufacturers,
    });
  } catch (error) {
    console.error("Error fetching category items:", error);
    res.status(500).json({
      status: "fail",
      data: {
        data: doc,
      },
    });
  }
};

exports.getManufacturerItems = async (req, res, next) => {
  const { id } = req.params;

  const categories = req.categories;
  const manufacturers = req.manufacturers;

  try {
    const doc = await db.getManufacturerItems(id);
    res.render("dashboard", {
      items: doc,
      categories,
      manufacturers,
    });
  } catch (error) {
    console.error("Error fetching manufacturer items:", error);
    res.status(500).json({
      status: "fail",
      data: {
        data: doc,
      },
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.deleteItem(id);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.getItemsByCategory = async (req, res, next) => {
  const { itemType } = req.params;

  try {
    const doc = await db.getItems(itemType);
    res.render("categoryItems", {
      items: doc,
      category: itemType,
      routes: [itemType],
    });
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     data: doc,
    //   },
    // });
  } catch (error) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.getItem = async (req, res, next) => {
  const { itemType, id } = req.params;
  console.log(itemType, id);
  try {
    let doc = await db.getItem(id);
    doc = doc[0];
    doc["options"] = [];
    optionChoices = [
      "plies",
      "concave",
      "width",
      "base",
      "hanger",
      "wheel_colors",
    ];

    optionChoices.forEach((element) => {
      if (doc[element] !== null) {
        doc["options"].push({ optionType: element, choices: doc[element] });
      }
    });

    console.log(doc);
    res.render("itemPage", {
      item: doc,
      routes: [itemType, doc.title],
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.createItem = async (req, res, next) => {
  try {
    await db.createItem(req.body);
    return res.redirect("/dashboard");
  } catch (error) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.createCategory = async (req, res, next) => {
  const categories = req.categories;
  const manufacturers = req.manufacturers;
  try {
    await db.createCategory(req.body);
    // Redirect on success
    return res.redirect("/dashboard");
  } catch (error) {
    // Render the dashboard with the error message
    res.render("dashboard", {
      categories,
      manufacturers,
      items: [],
      error: error.message,
    });
  }
};
