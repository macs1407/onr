const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');

// Crear una nueva reserva
router.post('/bookings', bookingService.createBooking);

// Obtener todas las reservas
router.get('/bookings', bookingService.getBookings);

// Obtener una reserva por ID
router.get('/bookings/:id', bookingService.getBookingById);

// Actualizar una reserva
router.put('/bookings/:id', bookingService.updateBooking);

// Eliminar una reserva
router.delete('/bookings/:id', bookingService.deleteBooking);

// Obtener reservas por association
router.get('/bookings/association/:id', bookingService.getBookingAssociation);

module.exports = router;
