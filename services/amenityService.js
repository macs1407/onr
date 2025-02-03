const amenityController = require('../controllers/amenityController');

// Crear una nueva amenidad
const createAmenity = async (req, res) => {
  return await amenityController.createAmenity(req, res);
};

// Obtener todas las amenidades
const getAmenities = async (req, res) => {
  return await amenityController.getAmenities(req, res);
};

// Obtener una amenidad por ID
const getAmenityById = async (req, res) => {
  return await amenityController.getAmenityById(req, res);
};

// Actualizar una amenidad
const updateAmenity = async (req, res) => {
  return await amenityController.updateAmenity(req, res);
};

// Eliminar una amenidad
const deleteAmenity = async (req, res) => {
  return await amenityController.deleteAmenity(req, res);
};

// Obtener una amenidad por association
const getAmenityAssociation = async (req, res) => {
  return await amenityController.getAmenityAssociation(req, res);
};

module.exports = {
  createAmenity,
  getAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
  getAmenityAssociation
};
