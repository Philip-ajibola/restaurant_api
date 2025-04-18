// models/Restaurant.js
const db = require('../config/database');

// Create
exports.createRestaurant = async (data) => {
  const { name,description,location, lat, lng, cuisine,picture_url } = data;
  const res = await db.query(
    'INSERT INTO restaurants (name, description, location, lat, lng, cuisine,picture_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, description,location, lat, lng, cuisine,picture_url]
  );
  return res.rows[0];
};

// Read All
exports.getAllRestaurants = async () => {
  const res = await db.query('SELECT * FROM restaurants');
  return res.rows;
};

// Read One by ID
exports.getRestaurantById = async (id) => {
  const res = await db.query('SELECT * FROM restaurants WHERE id = $1', [id]);
  return res.rows[0];
};

// Update
exports.updateRestaurant = async (id, data) => {
  const { name, lat, lng, cuisine, price_range } = data;
  const res = await db.query(
    `UPDATE restaurants 
     SET name = $1, lat = $2, lng = $3, cuisine = $4, price_range = $5 
     WHERE id = $6 
     RETURNING *`,
    [name, lat, lng, cuisine, price_range, id]
  );
  return res.rows[0];
};

// Delete
exports.deleteRestaurant = async (id) => {
  const res = await db.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
  return res.rows[0];
};

// Find Nearby Restaurants
exports.findNearbyRestaurants = async (lat, lng, radius = 10) => {
  const res = await db.query(
    `
    WITH calculated_distances AS (
      SELECT *, (
        6371 * acos (
          cos ( radians($1) )
          * cos( radians( lat ) )
          * cos( radians( lng ) - radians($2) )
          + sin ( radians($1) )
          * sin( radians( lat ) )
        )
      ) AS distance
      FROM restaurants
    )
    SELECT *
    FROM calculated_distances
    WHERE distance < $3
    ORDER BY distance
    LIMIT 20;
    `,
    [lat, lng, radius]
  );
  return res.rows;
};

exports.filterRestaurants = async (cuisine) => {
 
  if (!cuisine) {
    throw new Error('Cuisine is required for filtering');
  }

  const query = `
    SELECT *
    FROM restaurants
    WHERE cuisine = $1
  `;

  const res = await db.query(query, [cuisine]);
  return res.rows;
};