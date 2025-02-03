const { Booking, Amenity, User, Association } = require('../config/mongoose');

// Crear una nueva reserva
const createBooking = async (req, res) => {
  const { date, timeStart, timeEnd, amenity, user, association } = req.body;
  try {

    // Verificar si el usuario existe
    const findUser = await User.findById(user);
    if (!findUser) {
      throw new Error('Usuario no encontrado');
    }
     
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

    const newBooking = new Booking({ date, timeStart, timeEnd, amenity, user, association });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear reserva', error: error.message });
  }
};

// Obtener todas las reservas
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user amenity association');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener reservas', error: error.message });
  }
};

// Obtener una reserva por ID
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id).populate('user amenity association');
    if (!booking) {
      throw new Error('Reserva no encontrada');
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener reserva', error: error.message });
  }
};

// Actualizar una reserva
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { date, timeStart, timeEnd, amenity, user, association } = req.body;
  try {

    // verificar el id
    //if(!isValidObjectId(id)) throw new Error('El id suministrado es invalido');
    // Verificar si la reserva existe
    const findBooking = await Booking.findById(id);
    if (!findBooking) {
      throw new Error('Reserva no encontrada');
    }

    // verificar el id
    //if(!isValidObjectId(user)) throw new Error('El id del usuario suministrado es invalido');
    // Verificar si el usuario existe
    if (user) {
      const findUser = await User.findById(user);
      if (!findUser) {
        throw new Error('Usuario no encontrado');
      }
    }

    // verificar el id
    //if(!isValidObjectId(amenity)) throw new Error('El id de amenity suministrado es invalido');
    // Verificar si la amenidad existe
    if (amenity) {
      const findAmenity = await Amenity.findById(amenity);
      if (!findAmenity) {
        throw new Error('Amenidad no encontrada');
      }
    }

    // Verificar si la asociación existe
    const findAssociation = await Association.findById(association);
    if (!findAssociation) {
       throw new Error('Asociación no encontrada');
    }

    const updatedBooking = await Booking.findByIdAndUpdate(id, { date, timeStart, timeEnd, amenity, user, association }, { new: true }).populate('user amenity association');
    res.status(200).json(updatedBooking);
  } catch (error) {
    console.log('error ->',error);
    res.status(400).json({ message: 'Error al actualizar reserva', error: error.message });
  }
};

// Eliminar una reserva
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      throw new Error('Reserva no encontrada');
    }
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar reserva', error: error.message });
  }
};

// Obtener una reserva por ID
const getBookingAssociation = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si la asociación existe
    const findAssociation = await Association.findById(id);
    if (!findAssociation) {
       throw new Error('Asociación no encontrada');
    }

    const booking = await Booking.find({association : id});
    if (!booking) {
      throw new Error('Reserva no encontrada');
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener reserva', error: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingAssociation
};
