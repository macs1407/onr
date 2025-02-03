const { Unit, Association }                                       = require('../config/mongoose');
const { Unit : PostgresUnit, Association : PostgresAssociation }  = require('../config/sequelize');


// Crear una unidad
const createUnit = async (req, res) => {
  const { name, associationId } = req.body;
  try {
    const findAssociationMongo    = await Association.findById(associationId);
    const findAssociationPostgres = await PostgresAssociation.findByPk(associationId);
    
    if(!findAssociationMongo && !findAssociationPostgres) throw new Error('El id suministrado no existe');
    
    if (findAssociationMongo) {
      console.log('1');

      const newUnit = new Unit({ name, association:associationId });
      await newUnit.save();
      res.status(201).json({message: 'Unidad creada exitosamente en ambas bases de datos mongo', newUnit});
    }
   
    if (findAssociationPostgres) {
      console.log('2');
      const postgresUnit = await PostgresUnit.create({ name, associationId});
      res.status(201).json({message: 'Unidad creada exitosamente en ambas bases de datos postgre', postgresUnit});
    }
   } catch (error) {
    res.status(400).json({ message: 'Error al crear unidad', error: error.message });
  }
};

// Obtener todas las unidades
const getUnits = async (req, res) => {
  try {
    const unitsMongo = await Unit.find().populate('association');
    const unitsPostgres = await PostgresUnit.findAll();
    res.status(200).json({unitsMongo,unitsPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener unidades', error: error.message });
  }
};

// Obtener unidad por ID
const getUnitById = async (req, res) => {
  const { id } = req.params;
  try {
    const unitMongo     = await Unit.findById(id).populate('association');
    const unitPostgres  = await PostgresUnit.findByPk(id);
    if (!unitMongo && !unitPostgres) {
      throw new Error('Unidad no encontrada');
    }
    res.status(200).json({unitMongo,unitPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener unidad', error: error.message });
  }
};

// Actualizar una unidad
const updateUnit = async (req, res) => {
  const { id } = req.params;
  const { name, association } = req.body;
  try {
    // verificar el id
    //if(!isValidObjectId(association)) throw new Error('El id suministrado es invalido');
    const unitMongo     = await Unit.findById(id);
    const unitPostgres  = await PostgresUnit.findByPk(id);
    if (!unitMongo && !unitPostgres) {
      throw new Error('Unidad no encontrada');
    }

    // Verificar si la asociación existe
    const findAssociationMongo = await Association.findById(association);
    const findAssociationPostgres = await PostgresAssociation.findByPk(association);
    
    if(!findAssociationMongo && !findAssociationPostgres) throw new Error('El id suministrado no existe');

    if(unitMongo){
      const updatedUnit = await Unit.findByIdAndUpdate(id, { name, association }, { new: true }).populate('association');
      res.status(200).json(updatedUnit);
    }

    if(unitPostgres){
      console.log('Intenta actualizar');
      const [updatedCount, updatedUnit] = await PostgresUnit.update({ name, associationId: association }, {
        where: {
            id: id
        },
        returning: true // Obtiene el objeto actualizado
      });
      if (updatedCount === 0) res.status(200).json({mensaje:"No se actualizo el objeto"});
      res.status(200).json(updatedUnit[0]);
    }
    
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar unidad', error: error.message });
  }
};

// Eliminar una unidad
const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const unitMongo     = await Unit.findById(id);
    const unitPostgres  = await PostgresUnit.findByPk(id);
    if (!unitMongo && !unitPostgres) {
      throw new Error('Unidad no encontrada');
    }

    if(unitMongo){
      await Unit.findByIdAndDelete(id);
    }
    
    if(unitPostgres){
      await PostgresUnit.destroy({
          where: {
              id: id
          }
      });
    }

    res.status(200).json({ message: 'Unidad eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar unidad', error: error.message });
  }
};

// Obtener unidad por ID
const getUnitByAssociation = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si la asociación existe
    const findAssociationMongo = await Association.findById(id);
    const findAssociationPostgres = await PostgresAssociation.findByPk(id);
    
    if(!findAssociationMongo && !findAssociationPostgres) throw new Error('El id suministrado no existe');

    const unitMongo     = await Unit.find({association : id});
    const unitPostgres  = await PostgresUnit.findAll({
        where: {
            associationId: id
        }
    });

    if (!unitMongo && !unitPostgres) {
      throw new Error('Unidad no encontrada');
    }
    res.status(200).json({unitMongo, unitPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener unidad', error: error.message });
  }
};

module.exports = {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
  getUnitByAssociation
};
