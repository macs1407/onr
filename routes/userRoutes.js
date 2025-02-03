const express     = require('express');
const userService = require('../services/userService');
const router      = express.Router();

router.post('/users', userService.createUserService);

// Obtener todos los usuarios
router.get('/users', userService.getUsersService);

// Obtener todos los usuarios
router.get('/users/units', userService.getUsersUnitsService);

// Obtener usuario por ID
router.get('/users/:id', userService.getUserByIdService);

// Actualizar usuario
router.put('/users/:id', userService.updateUserService);

// Eliminar usuario
router.delete('/users/:id', userService.deleteUserService);

// Obtener todos los usuarios por asociacion
router.get('/users/association/:id', userService.getUsersAssociation);

module.exports = router;
