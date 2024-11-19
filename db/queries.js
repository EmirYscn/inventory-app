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

exports.getCategoryItems = async function (categoryId = null) {
  // Validate categoryId (ensure it's either a number or null)
  if (categoryId !== null && isNaN(categoryId)) {
    // If the categoryId is not a valid number, set it to null or handle the error
    console.error("Invalid categoryId:", categoryId);
    categoryId = null;
  }

  const query = `
  SELECT items.*, categories.category
  FROM items
  LEFT JOIN categories ON categories.id = items.category_id
  WHERE ($1::INTEGER IS NULL AND items.category_id IS NULL)
     OR ($1::INTEGER IS NOT NULL AND items.category_id = $1)
`;
  const { rows } = await pool.query(query, [categoryId]);
  console.log(rows);
  return rows;
};

exports.getManufacturerItems = async function (manufacturerId) {
  let query = `SELECT items.*, manufacturers.name AS category FROM items INNER JOIN manufacturers ON manufacturers.id=items.manufacturer_id WHERE manufacturer_id=$1`;

  const { rows } = await pool.query(query, [manufacturerId]);
  return rows;
};

exports.deleteItem = async function (itemId) {
  let query = `DELETE FROM items WHERE id=$1`;
  await pool.query(query, [itemId]);
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

  const { rows } = await pool.query(query, queryParams);

  return rows;
};

exports.getItem = async function (itemId) {
  let query =
    "SELECT items.id AS item_id, items.*, manufacturers.id AS manufacturer_id, manufacturers.name FROM items INNER JOIN manufacturers ON manufacturers.id = items.manufacturer_id WHERE items.id = $1";

  const { rows } = await pool.query(query, [itemId]);
  return rows;
};

exports.createItem = async function (item) {
  // console.log(item);
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

exports.createCategory = async function (body) {
  let { name } = body;
  name = name.charAt(0).toUpperCase() + name.slice(1);
  let query = "INSERT INTO categories (category) VALUES ($1)";

  try {
    // check first if name is already in category db;
    const { rows } = await pool.query(
      "SELECT * FROM categories WHERE LOWER(category) = LOWER($1)",
      [name]
    );

    if (rows.length > 0) {
      throw new Error("There is already a category with that name");
    }

    await pool.query(query, [name]);
  } catch (error) {
    throw error;
  }
};

exports.updateItem = async function (itemId, body) {
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
    category_id,
    manufacturer_id,
  } = body;
  // // Ensure all options are properly split into arrays
  const optionGroups = [plies, concave, width, base, hanger, wheel_colors].map(
    (opt) => (opt ? opt.split(",") : null)
  );
  // // Destructure the transformed option groups

  [plies, concave, width, base, hanger, wheel_colors] = optionGroups;
  optionGroups.forEach((option) => {
    console.log(option);
  });

  const replacements = {
    plies,
    concave,
    width,
    base,
    hanger,
    wheel_colors,
  };

  Object.keys(replacements).forEach((key) => {
    if (body.hasOwnProperty(key)) {
      body[key] = replacements[key];
    }
  });

  try {
    const keys = Object.keys(body);
    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const query = `UPDATE items SET ${setClause} WHERE id = $${
      keys.length + 1
    };`;
    const params = [...Object.values(body), itemId * 1];
    await pool.query(query, params);
  } catch (error) {
    console.error("Database query failed: ", error);
  }
};

exports.deleteCategory = async function (id) {
  let query = `DELETE FROM categories WHERE id=$1`;
  await pool.query(query, [id]);
  // query = `UPDATE items SET category_id = null WHERE items.category_id=$1`;
  // await pool.query(query, [id]);
};
