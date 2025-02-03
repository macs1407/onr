const express = require('express');
const router = express.Router();
const amenityService = require('../services/amenityService');

// Crear una nueva amenidad
router.post('/amenities', amenityService.createAmenity);

// Obtener todas las amenidades
router.get('/amenities', amenityService.getAmenities);

// Obtener una amenidad por ID
router.get('/amenities/:id', amenityService.getAmenityById);

// Actualizar una amenidad
router.put('/amenities/:id', amenityService.updateAmenity);

// Eliminar una amenidad
router.delete('/amenities/:id', amenityService.deleteAmenity);

// Obtener una amenidad por association
router.get('/amenities/association/:id', amenityService.getAmenityAssociation);

module.exports = router;
