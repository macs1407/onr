const { User, Association : AssociationMongose, Unit : UnitMongose } = require('../config/mongoose');
const { User: PostgresUser, Association : AssociationPostgre, Unit : UnitPostgre } = require('../config/sequelize');
const { Op } = require('sequelize');

// Crear un usuario
const createUser = async (req, res) => {
  console.log('Crear un usuario nuevo');
  try {
      const { names, lastNames, email, password, associations, units } = req.body;
      let compruebaInsertarAssociationMongo = false;
      let compruebaInsertarAssociationPostgre = false;
      let compruebaInsertarUnitsMongo = false;
      let compruebaInsertarUnitsPostgre = false;
      
      if(associations != null){
        for (const association of associations) {
          console.log('association->', association);
          let compruebaMongo = await AssociationMongose.findById(association);
          console.log('compruebaMongo->', compruebaMongo);
          if(compruebaMongo){
            compruebaInsertarAssociationMongo = true;
          }
          let associationPostgres = await AssociationPostgre.findByPk(association);
          if(associationPostgres){
            compruebaInsertarAssociationPostgre = true;
          }
        }
      }

      if(units != null){
        for (const unit of units) {
          console.log('unit->', unit);
          let compruebaMongoUnit = await UnitMongose.findById(unit);
          if(compruebaMongoUnit){
            compruebaInsertarUnitsMongo = true;
          }
          let associationPostgresUnit = await UnitPostgre.findByPk(unit);
          if(associationPostgresUnit){
            compruebaInsertarUnitsPostgre = true;
          }
        }
      }

      let newUserMongo;
      if(compruebaInsertarAssociationMongo && compruebaInsertarUnitsMongo){
        newUserMongo = new User({ names, lastNames, email, password, associations, units });
        await newUserMongo.save();
      } else if(compruebaInsertarAssociationMongo && !compruebaInsertarUnitsMongo){
        newUserMongo = new User({ names, lastNames, email, password, associations });
        await newUserMongo.save();
      }else if(!compruebaInsertarAssociationMongo && compruebaInsertarUnitsMongo){
        newUserMongo = new User({ names, lastNames, email, password, units });
        await newUserMongo.save();
      }else if(!compruebaInsertarAssociationMongo && !compruebaInsertarUnitsMongo){
        newUserMongo = new User({ names, lastNames, email, password });
        await newUserMongo.save();
      }

      let newUserPostgresUser;
      if(compruebaInsertarAssociationPostgre && !compruebaInsertarUnitsPostgre){
        console.log('entra 3');
        newUserPostgresUser = await PostgresUser.create({ names, lastNames, email, password });
        await newUserPostgresUser.setAssociations(associations);
      } else if(!compruebaInsertarAssociationPostgre && compruebaInsertarUnitsPostgre){
        console.log('entra 4');
        newUserPostgresUser = await PostgresUser.create({ names, lastNames, email, password });
        await newUserPostgresUser.setUnits(units);
      }else if(compruebaInsertarAssociationPostgre && compruebaInsertarUnitsPostgre){
        console.log('entra 5');
        newUserPostgresUser = await PostgresUser.create({ names, lastNames, email, password });
        await newUserPostgresUser.setAssociations(associations);
        await newUserPostgresUser.setUnits(units);
      } else if(associations == null && !compruebaInsertarAssociationPostgre){
        console.log('entra 6');
        const newUserPostgresUser = new PostgresUser({ names, lastNames, email, password });     
        newUserPostgresUser.save();
      }

      res.status(201).json({ message: 'Usuario creado con éxito', newUserMongo, newUserPostgresUser });
      //res.status(201).json({ message: 'Usuario creado con éxito' });
  } catch (error) {
      console.log('error->', error);
      res.status(500).json({ message: 'Error al crear usuario', error });
  }
};


// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    console.log('Obtener todos los usuarios');
    const mongoUsers = await User.find();
    const postgresUsers = await PostgresUser.findAll({
        include: [
          {
            model: AssociationPostgre,   // Incluir las asociaciones del usuario
            through: { attributes: [] }  // No incluir los atributos de la tabla intermedia
          },
          {
            model: UnitPostgre,   // Incluir las asociaciones del usuario
            through: { attributes: [] }  // No incluir los atributos de la tabla intermedia
          }
        ]
    });
    res.status(200).json({ mongoUsers, postgresUsers });
  } catch (error) {
    console.log('Error ->',error)
    res.status(400).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userMongo = await User.findById(id);
    const userPostgres = await PostgresUser.findOne({
        where: { id: id },  // Filtrar por el ID del usuario
        include: [{
            model: AssociationPostgre,   // Incluir las asociaciones del usuario
            through: { attributes: [] }  // No incluir los atributos de la tabla intermedia
        }]
    });
    if (!userMongo && !userPostgres) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({userMongo, userPostgres});
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener usuario', error });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { names, lastNames, email, password, associations } = req.body;
  let compruebaInsertarAssociationMongo = false;
  let compruebaInsertarAssociationPostgre = false;
  try {
    const userMongo = await User.findById(id);
    const userPostgres = await PostgresUser.findByPk(id);
    if (!userMongo && !userPostgres) return res.status(404).json({ message: 'Usuario no encontrado' });

    if(associations != null){
      for (const association of associations) {
        console.log('association->', association);
        let compruebaMongo = await AssociationMongose.findById(association);
        console.log('compruebaMongo->', compruebaMongo);
        if(compruebaMongo){
          compruebaInsertarAssociationMongo = true;
        }
        let associationPostgres = await AssociationPostgre.findByPk(association);
        if(associationPostgres){
          compruebaInsertarAssociationPostgre = true;
        }
      }
    }
    
    if(userMongo){
      let updatedUser;
      if(!compruebaInsertarAssociationMongo){
        updatedUser = await User.findByIdAndUpdate(id, { names, lastNames, email, password }, { new: true });
      } else if(compruebaInsertarAssociationMongo){
        updatedUser = await User.findByIdAndUpdate(id, { names, lastNames, email, password, associations}, { new: true });
      }
      
      res.status(200).json(updatedUser);
    }

    if(userPostgres){
      const [updatedCount, updatedUser] = await PostgresUser.update({ names, lastNames, email, password }, {
        where: {
            id: id
        },
        returning: true // Obtiene el objeto actualizado
      });
      if(compruebaInsertarAssociationPostgre){
         await PostgresUser.setAssociations(associations);
      }
      if (updatedCount === 0) res.status(200).json({mensaje:"No se actualizo el objeto"});
      res.status(200).json(updatedUser[0]);
    }    
  } catch (error) {
    console.log('error ->',error);
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userMongo = await User.findById(id);
    const userPostgres = await PostgresUser.findByPk(id);
    if (!userMongo && !userPostgres) return res.status(404).json({ message: 'Usuario no encontrado' });

    if(userMongo){
      await User.findByIdAndDelete(id);
    }
    if(userPostgres){
      await PostgresUser.destroy({
        where: {
            id: id
        }
    });
    }
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar usuario', error });
  }
};

const getUsersAssociation = async (req, res) => {
  const { id } = req.params;
  try {
    let compruebaMongo = await AssociationMongose.findById(id);
    if (!compruebaMongo) return res.status(404).json({ message: 'Asociasion no encontrada' });

    const usersMongo = await User.find({ associations: { $in: [id] } });
    const usersPostgres = await PostgresUser.findAll({
      where: {
          associations: {
              [Op.contains]: [id] // Busca dentro del array
          }
      }
    }); 

    if(usersMongo.length === 0 || usersPostgres === 0) return res.status(404).json({ message: 'No se encontraron datos' });

    res.status(200).json({usersMongo, usersPostgres});
  } catch (error) {
    console.log('error -> ',error);
    res.status(400).json({ message: 'Error al eliminar usuario', error });
  }
};

const getUsersUnitsService = async (req, res) => {
  try {
    console.log('Obtener todos los usuarios y sus unidades');
    const mongoUsers = await User.find().select('-associations');
    const postgresUsers = await PostgresUser.findAll({
        include: [
          {
            model: UnitPostgre,   // Incluir las asociaciones del usuario
            through: { attributes: [] }  // No incluir los atributos de la tabla intermedia
          }
        ]
    });
    res.status(200).json({ mongoUsers, postgresUsers });
  } catch (error) {
    console.log('Error ->',error)
    res.status(400).json({ message: 'Error al obtener usuarios', error });
  }
};

module.exports = { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getUsersAssociation,
  getUsersUnitsService
};
