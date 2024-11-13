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

exports.getItems = async function () {
  let query = "SELECT * FROM items";

  const { rows } = await pool.query(query);
  return rows;
};
