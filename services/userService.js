const userController = require('../controllers/userController');

const createUserService = async (req, res) => {
  return await userController.createUser(req, res);
};

const getUsersService = async (req, res) => {
  return await userController.getUsers(req, res);
};

const getUserByIdService = async (id, res) => {
  return await userController.getUserById(id, res);
};

const updateUserService = async (req, res) => {
  return await userController.updateUser(req, res);
};

const deleteUserService = async (req, res) => {
  return await userController.deleteUser(req, res);
};

const getUsersAssociation = async (req, res) => {
  return await userController.getUsersAssociation(req, res);
};

const getUsersUnitsService = async (req, res) => {
  return await userController.getUsersUnitsService(req, res);
};

module.exports = { 
  createUserService, 
  getUsersService, 
  getUserByIdService, 
  updateUserService, 
  deleteUserService, 
  getUsersAssociation,
  getUsersUnitsService 
};
