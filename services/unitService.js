const  unitController  = require('../controllers/unitController');

// Crear una unidad
const createUnit = async (req, res) => {
  return await unitController.createUnit(req, res);
};

// Obtener todas las unidades
const getUnits = async (req, res) => {
  return await unitController.getUnits(req, res);
};

// Obtener una unidad por ID
const getUnitById = async (req, res) => {
  return await unitController.getUnitById(req, res);
};

// Actualizar una unidad
const updateUnit = async (req, res) => {
  return await unitController.updateUnit(req, res);
};

// Eliminar una unidad
const deleteUnit = async (req, res) => {
  return await unitController.deleteUnit(req, res);
};

// Obtener todas las unidades por Association
const getUnitByAssociation = async (req, res) => {
  return await unitController.getUnitByAssociation(req, res);
};



module.exports = {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  getUnitByAssociation
};
