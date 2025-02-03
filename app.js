require("dotenv").config();
const express                           = require('express');
const app                               = express();
//const dotenv = require('dotenv');
//const mongoose = require('mongoose');
const { sequelize, mongooseConnection } = require('./config/database');
const userRoutes                        = require('./routes/userRoutes');
const associationRoutes                 = require('./routes/associationRoutes');
const unitRoutes                        = require('./routes/unitRoutes');
const amenityRoutes                     = require('./routes/amenityRoutes');
const bookingRoutes                     = require('./routes/bookingRoutes');
const scenaryRoutes                     = require('./routes/scenaryRoutes');

app.use(express.json()); // permite que cuando se envien peticiones en el json llegue el body
app.use('/api', userRoutes);
app.use('/api', associationRoutes);
app.use('/api', unitRoutes);
app.use('/api', amenityRoutes);
app.use('/api', bookingRoutes);
app.use('/api', scenaryRoutes); 

const PORT = process.env.PORT || 3000;

mongooseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  sequelize.sync().then(() => console.log('PostgreSQL connected'));
});

