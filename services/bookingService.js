const bookingController = require('../controllers/bookingController');

// Crear una nueva reserva
const createBooking = async (req, res) => {
  return await bookingController.createBooking(req, res);
};

// Obtener todas las reservas
const getBookings = async (req, res) => {
  return await bookingController.getBookings(req, res);
};

// Obtener una reserva por ID
const getBookingById = async (req, res) => {
  return await bookingController.getBookingById(req, res);
};

// Actualizar una reserva
const updateBooking = async (req, res) => {
  return await bookingController.updateBooking(req, res);
};

// Eliminar una reserva
const deleteBooking = async (req, res) => {
  return await bookingController.deleteBooking(req, res);
};

// Obtener una reserva por ID
const getBookingAssociation = async (req, res) => {
  return await bookingController.getBookingAssociation(req, res);
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingAssociation
};
