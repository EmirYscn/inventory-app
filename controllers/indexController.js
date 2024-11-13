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
