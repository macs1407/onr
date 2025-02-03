const express     = require('express');
const scenaryService = require('../services/scenaryService');
const router      = express.Router();

router.post('/scenary/:id', scenaryService.createReservationPosgrest);

module.exports = router;
