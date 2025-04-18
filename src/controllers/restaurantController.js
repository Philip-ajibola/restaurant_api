
const Restaurant = require('../models/Restaurant');

exports.addRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.createRestaurant(req.body);
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating restaurant' });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.updateUser(req.params.id, req.body);
    res.json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching restaurants' });
  }
};

exports.getNearby = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // Validate that lat and lng are provided and are valid numbers
    if (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) {
      return res.status(400).json({ message: 'Latitude and longitude are required and must be valid numbers' });
    }

    const results = await Restaurant.findNearbyRestaurants(Number(lat), Number(lng));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching nearby restaurants' });
  }
};

exports.deleteRestaurent = async (req, res) => {
  try {
    const restaurant = await Restaurant.deleteRestaurant(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted', restaurant });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filterRestaurants = async (req, res) => {
  try {
    const {cuisine} = req.query;

    const filtered = await Restaurant.filterRestaurants(cuisine);

    res.status(200).json(filtered);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};