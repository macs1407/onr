const associationController = require('../controllers/associationController');

const createAssociationService = async (req, res) => {
  return await associationController.createAssociation(req, res);
};

const getAssociationsService = async (req, res) => {
  return await associationController.getAssociations(req, res);
};

const getAssociationByIdService = async (req, res) => {
  return await associationController.getAssociationById(req, res);
};

const updateAssociationService = async (req, res) => {
  return await associationController.updateAssociation(req, res);
};

const deleteAssociationService = async (req, res) => {
  return await associationController.deleteAssociation(req, res);
};

module.exports = { createAssociationService, getAssociationsService, getAssociationByIdService, updateAssociationService, deleteAssociationService };
 