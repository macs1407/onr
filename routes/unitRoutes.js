const express = require('express');
const router = express.Router();
const unitService = require('../services/unitService');

// Crear una unidad
router.post('/units', unitService.createUnit);

// Obtener todas las unidades
router.get('/units', unitService.getUnits);

// Obtener una unidad por ID
router.get('/units/:id', unitService.getUnitById);

// Actualizar una unidad
router.put('/units/:id', unitService.updateUnit);

// Eliminar una unidad
router.delete('/units/:id', unitService.deleteUnit);

// Obtener una unidad por association
router.get('/units/association/:id', unitService.getUnitByAssociation);

module.exports = router;
