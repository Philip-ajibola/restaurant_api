const Food = require('../models/food');

// Create food
exports.createFood = async (req, res) => {
  try {
    const restaurant_id = req.params.restaurantId;
    const food = await Food.createFood(restaurant_id, req.body);
    res.status(201).json({ message: 'Food created', food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all foods by restaurant
exports.getFoodsByRestaurant = async (req, res) => {
  try {
    const restaurant_id = req.params.restaurantId;
    const foods = await Food.getFoodsByRestaurant(restaurant_id);
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single food by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.getFoodById(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update food
exports.updateFood = async (req, res) => {
  try {
    const updated = await Food.updateFood(req.params.id, req.body);
    res.status(200).json({ message: 'Food updated', food: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete food
exports.deleteFood = async (req, res) => {
  try {
    const result = await Food.deleteFood(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
