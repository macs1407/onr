const { Amenity, Association }     = require('../config/mongoose');

// Crear una nueva amenidad
const createAmenity = async (req, res) => {
  const { name, description, bookable, openingTime, closingTime, association } = req.body;
  try {
    // Verificar si la asociación existe
    const findAssociationMongo    = await Association.findById(association);
    if(!findAssociationMongo) throw new Error('El id suministrado no existe');
    const newAmenity = new Amenity({ name, description, bookable, openingTime, closingTime, association });
    await newAmenity.save();

    res.status(201).json(newAmenity);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear amenity', error: error.message });
  }
}; 

// Obtener todas las amenidades
const getAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find().populate('association');
    res.status(200).json(amenities);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener amenidades', error: error.message });
  }
};

// Obtener una amenidad por ID
const getAmenityById = async (req, res) => {
  const { id } = req.params;
  try {
    // verificar el id
    //if(!isValidObjectId(id)) throw new Error('El id suministrado es invalido');

    const amenity = await Amenity.findById(id).populate('association');
    if (!amenity) {
      throw new Error('Amenidad no encontrada');
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener amenidad', error: error.message });
  }
};

// Actualizar una amenidad
const updateAmenity = async (req, res) => {
  const { id } = req.params;
  const { name, description, bookable, openingTime, closingTime, association } = req.body;
  try {

   // Verificar si la asociación existe
   const findAssociationMongo    = await Association.findById(association);
   if(!findAssociationMongo) throw new Error('El id suministrado no existe');

    // Verificar si la amenidad existe
    const amenity = await Amenity.findById(id);
    if (!amenity) {
      throw new Error('Amenidad no encontrada');
    }
    
    const updatedAmenity = await Amenity.findByIdAndUpdate(id, { name, description, bookable, openingTime, closingTime, association }, { new: true }).populate('association');
    res.status(200).json(updatedAmenity);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar amenidad', error: error.message });
  }
};

// Eliminar una amenidad
const deleteAmenity = async (req, res) => {
  const { id } = req.params;
  try {
     // Verificar si la asociación existe
     const findAmenity = await Amenity.findById(id);
     if (!findAmenity) {
       throw new Error('La entidad no existe');
     }

    await Amenity.findByIdAndDelete(id);
    res.status(200).json({ message: 'Amenidad eliminada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar amenidad', error: error.message });
  }
};

// Obtener una amenidad por association
const getAmenityAssociation = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificar si la asociación existe
    const findAssociationMongo    = await Association.findById(id);
    if(!findAssociationMongo) throw new Error('El id suministrado no existe');

    const amenities  = await Amenity.find({association : id});
    if(!amenities) return res.status(200).json({ message: 'Amenidad eliminada' });

    res.status(200).json(amenities);

  } catch(error){
    res.status(400).json({ message: 'Error al eliminar amenidad', error: error.message });
  }
};

module.exports = {
  createAmenity,
  getAmenities,
  getAmenityById,
  updateAmenity,
  deleteAmenity,
  getAmenityAssociation
};
