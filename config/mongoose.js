const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },  // UUID como ID en MongoDB
  names: String,
  lastNames: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Relaciones
  associations: [{
    type: String
  }],
  units: [{
    type: String
  }]
}, { _id: false }); // Evita el ObjectId por defecto

const associationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },  // UUID como ID en MongoDB
  name: { type: String, required: true },
  address: String,
}, { _id: false }); // Evita el ObjectId por defecto

const unitSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },  // UUID como ID en MongoDB
  name: { type: String, required: true },
  //association: { type: mongoose.Schema.Types.ObjectId, ref: 'Association' },
  association: { type: String, required: true },
}, { _id: false }); // Evita el ObjectId por defecto

const amenitySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },  // UUID como ID en MongoDB
  name: { type: String, required: true },
  description: String,
  bookable: Boolean,
  openingTime: String,
  closingTime: String,
  //association: { type: mongoose.Schema.Types.ObjectId, ref: 'Association' },
  association: { type: String, required: true },
}, { _id: false }); // Evita el ObjectId por defecto

const bookingSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },  // UUID como ID en MongoDB
  date: Date,
  timeStart: String,
  timeEnd: String,
  user: { type: String, required: true },
  amenity: { type: String, required: true },
  association: { type: String, required: true },
  /*user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amenity: { type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' },
  association: { type: mongoose.Schema.Types.ObjectId, ref: 'Association' },*/
}, { _id: false }); // Evita el ObjectId por defecto

const User        = mongoose.model('User', userSchema);
const Association = mongoose.model('Association', associationSchema);
const Unit        = mongoose.model('Unit', unitSchema);
const Amenity     = mongoose.model('Amenity', amenitySchema);
const Booking     = mongoose.model('Booking', bookingSchema);

module.exports    = { User, Association, Unit, Amenity, Booking };
