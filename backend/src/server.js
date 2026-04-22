require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.mongodb+srv://dheerajpandita22:Dheeraj@23456@restaurantcluster.mvhuzfi.mongodb.net/restaurant_booking=RestaurantCluster, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error('Mongo connection error', err));
