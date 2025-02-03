const scenaryController = require('../controllers/scenaryController');

const createReservationPosgrest = async (req, res) => {
  return await scenaryController.createReservationPosgrest(req, res);
};

module.exports = { createReservationPosgrest };
