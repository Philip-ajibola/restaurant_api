// routes/restaurants.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');


router.post('/add_restaurant', restaurantController.addRestaurant);
router.get('/filter', restaurantController.filterRestaurants);
router.get('/nearby', restaurantController.getNearby);

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurent);


module.exports = router;
