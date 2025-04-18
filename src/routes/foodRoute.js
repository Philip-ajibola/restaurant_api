const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
router.post('/:restaurantId', foodController.createFood);
router.get('/restaurant/:restaurantId', foodController.getFoodsByRestaurant);
router.get('/:id', foodController.getFoodById);
router.put('/:id', foodController.updateFood);
router.delete('/:id', foodController.deleteFood);

module.exports = router;
