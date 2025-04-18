const db = require('../config/database');

// Create a new food item for a restaurant
exports.createFood = async (restaurant_id, data) => {
  const { name, price,picture_url } = data;
  const res = await db.query(
    'INSERT INTO foods (restaurant_id, name, price,picture_url) VALUES ($1, $2, $3,$4) RETURNING *',
    [restaurant_id, name, price,picture_url]
  );
  return res.rows[0];
};

// Get all foods for a specific restaurant
exports.getFoodsByRestaurant = async (restaurant_id) => {
  const res = await db.query(
    'SELECT * FROM foods WHERE restaurant_id = $1',
    [restaurant_id]
  );
  return res.rows;
};

// Get a single food item by ID
exports.getFoodById = async (id) => {
  const res = await db.query(
    'SELECT * FROM foods WHERE id = $1',
    [id]
  );
  return res.rows[0];
};

// Update food item
exports.updateFood = async (id, data) => {
  const { name, price } = data;
  const res = await db.query(
    'UPDATE foods SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  return res.rows[0];
};

// Delete food item
exports.deleteFood = async (id) => {
  await db.query('DELETE FROM foods WHERE id = $1', [id]);
  return { message: 'Food deleted successfully' };
};
