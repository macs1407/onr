const express               = require('express');
const associationService    = require('../services/associationService');
const router                = express.Router();

// Crear una asociación
router.post('/associations', associationService.createAssociationService);

// Obtener todas las asociaciones
router.get('/associations', associationService.getAssociationsService);

// Obtener una asociación por ID
router.get('/associations/:id', associationService.getAssociationByIdService);

// Actualizar una asociación
router.put('/associations/:id', associationService.updateAssociationService);

// Eliminar una asociación
router.delete('/associations/:id', associationService.deleteAssociationService);

module.exports = router;
