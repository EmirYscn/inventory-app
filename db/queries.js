const pool = require("./pool");

exports.getCategories = async function () {
  let query = "SELECT * FROM categories";

  const { rows } = await pool.query(query);
  return rows;
};

exports.getManufacturers = async function () {
  let query = "SELECT * FROM manufacturers";

  const { rows } = await pool.query(query);
  return rows;
};

exports.getCategoryItems = async function (id) {
  let query = `SELECT * FROM items WHERE category_id=$1`;

  const { rows } = await pool.query(query, [id]);
  return rows;
};

exports.getManufacturerItems = async function (id) {
  let query = `SELECT * FROM items WHERE manufacturer_id=$1`;

  const { rows } = await pool.query(query, [id]);
  return rows;
};

exports.deleteItem = async function (id) {
  let query = `DELETE FROM items WHERE id=$1`;
  await pool.query(query, [id]);
};

exports.getItems = async function (categoryFilter = null) {
  let query =
    "SELECT items.id AS item_id, items.*, categories.id AS category_id, categories.category FROM items INNER JOIN categories ON categories.id = items.category_id";
  let queryParams = [];

  if (categoryFilter) {
    const categoryQuery = "SELECT * FROM categories WHERE category=$1";
    const categoryResult = await pool.query(categoryQuery, [categoryFilter]);

    query += ` WHERE category_id=$1`;
    queryParams.push(categoryResult.rows[0].id);
  }
  console.log(query);
  console.log(queryParams);
  const { rows } = await pool.query(query, queryParams);
  console.log(rows);
  return rows;
};

exports.getItem = async function (id) {
  let query =
    "SELECT * from items INNER JOIN manufacturers ON manufacturers.id = items.manufacturer_id WHERE items.id = $1";

  const { rows } = await pool.query(query, [id]);
  return rows;
};

exports.createItem = async function (item) {
  console.log(item);
  let {
    image,
    title,
    price,
    plies,
    concave,
    width,
    base,
    hanger,
    wheel_colors,
    product_number,
    description,
    category,
    manufacturer,
  } = item;

  // Ensure all options are properly split into arrays
  const optionGroups = [plies, concave, width, base, hanger, wheel_colors].map(
    (opt) => (opt ? opt.split(",") : null)
  );

  // Destructure the transformed option groups
  [plies, concave, width, base, hanger, wheel_colors] = optionGroups;

  optionGroups.forEach((option) => {
    console.log(option);
  });

  try {
    let query =
      "INSERT INTO items (image, title, price, plies, concave, width, base, hanger, wheel_colors, product_number, description, manufacturer_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";

    await pool.query(query, [
      image,
      title,
      price * 1,
      plies,
      concave,
      width,
      base,
      hanger,
      wheel_colors,
      product_number,
      description,
      manufacturer * 1,
      category * 1,
    ]);
  } catch (error) {
    console.error("Database query failed: ", error);
  }
};
