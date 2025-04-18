require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/database');
const restaurantRoutes = require('./src/routes/restaurantRoute');
const foodRoutes = require('./src/routes/foodRoute');
const userRoutes = require('./src/routes/userRoute');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/foods', foodRoutes);
app.use("/api/users",userRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
