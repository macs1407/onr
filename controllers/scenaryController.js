const { Association, Booking, Amenity } = require('../config/mongoose');
const { User: PostgresUser} = require('../config/sequelize');

// Obtener usuario por ID
const createReservationPosgrest = async (req, res) => {
  const { id } = req.params;
  const { date, timeStart, timeEnd, amenity, association } = req.body;
  try {
    const userPostgres = await PostgresUser.findOne({
        where: { id: id }
    });
    if (!userPostgres) 
      return res.status(404).json({ message: 'Usuario no encontrado, recuerde que debe ser un usuario de Postgres' });
    
    // Verificar si la amenidad existe
    const findAmenity = await Amenity.findById(amenity);
    if (!findAmenity) {
      throw new Error('Amenidad no encontrada');
    }
     
    // Verificar si la asociación existe
    const findAssociation = await Association.findById(association);
    if (!findAssociation) {
       throw new Error('Asociación no encontrada');
    }

    const newBooking = new Booking({ date, timeStart, timeEnd, amenity, user: id, association });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.log('Error ->',error);
    res.status(400).json({ message: 'Error al obtener usuario', error });
  }
};

module.exports = { createReservationPosgrest };
