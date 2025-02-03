const { Association } = require('../config/mongoose');
const { Association : PostgresAssociation } = require('../config/sequelize');

// Crear una asociación
const createAssociation = async (req, res) => {
  const { name, address } = req.body;
  try {
    const newAssociation = new Association({ name, address });
    await newAssociation.save();
    const newAssociationPostgres = new PostgresAssociation({ name, address });
    await newAssociationPostgres.save();
    res.status(201).json({ message: 'Asociacion creada con éxito', newAssociation: newAssociation,  newAssociationPostgres : newAssociationPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al crear asociación', error });
  }
};

// Obtener todas las asociaciones
const getAssociations = async (req, res) => {
  try {
    const associationsMongo     = await Association.find();
    const associationsPostgres  = await PostgresAssociation.findAll();
    res.status(200).json({associationsMongo,associationsPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener asociaciones', error });
  }
};

// Obtener asociación por ID
const getAssociationById = async (req, res) => {
  const { id } = req.params;
  try {
    const associationMongo = await Association.findById(id);
    const associationPostgres = await PostgresAssociation.findByPk(id);
    if (!associationMongo && !associationPostgres) return res.status(404).json({ message: 'Asociación no encontrada' });
    res.status(200).json({associationMongo,associationPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener asociación', error });
  }
};

// Actualizar una asociación
const updateAssociation = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const associationMongo = await Association.findById(id);
    const associationPostgres = await PostgresAssociation.findByPk(id);
    if (!associationMongo && !associationPostgres) return res.status(404).json({ message: 'Asociación no encontrada' });

    if(associationMongo){
      const updatedAssociation = await Association.findByIdAndUpdate(id, { name, address }, { new: true });
      res.status(200).json(updatedAssociation);
    }
    if(associationPostgres){
      const [updatedCount, updatedAssociation] = await PostgresAssociation.update({ name, address }, {
        where: {
            id: id
        },
        returning: true // Obtiene el objeto actualizado
      });
      if (updatedCount === 0) res.status(200).json({mensaje:"No se actualizo el objeto"});
      res.status(200).json(updatedAssociation[0]);
    }    
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar asociación', error });
  }
};

// Eliminar una asociación
const deleteAssociation = async (req, res) => {
  const { id } = req.params;
  try {
    const associationMongo = await Association.findById(id);
    const associationPostgres = await PostgresAssociation.findByPk(id);
    if (!associationMongo && !associationPostgres) return res.status(404).json({ message: 'Asociación no encontrada' });

    if(associationMongo){
      await Association.findByIdAndDelete(id);
    }
    if(associationPostgres){
      await PostgresAssociation.destroy({
          where: {
              id: id
          }
      });
    }

    res.status(200).json({ message: 'Asociación eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar asociación', error });
  }
};

module.exports = { createAssociation, getAssociations, getAssociationById, updateAssociation, deleteAssociation };
