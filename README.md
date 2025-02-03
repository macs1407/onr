# Proyecto ONR App Backend

>  #node #sequelize #express

## Tabla de Contenido

- [Descripción](#descripción)
- [Estructura](#estructura)
- [Instalación](#instalación)
- [Pruebas](#pruebas)

# Descripción
Este proyecto gestiona comunidades residenciales. Contiene las rutas, modelos y servicios para la gestión de usuarios, asociaciones, unidades y reservas de amenities.

# Estructura
onr-app/

├── config/

│   ├── database.js         # Configuración de las bases de datos (MongoDB y PostgreSQL)

│   ├── mongoose.js         # Configuración de Mongoose para MongoDB

│   └── sequelize.js        # Configuración de Sequelize para PostgreSQL

├── controllers/

│   ├── associationController.js

│   ├── bookingController.js

│   ├── amenityController.js

│   ├── unitController.js

│   └── userController.js

├── routes/

│   ├── associationRoutes.js

│   ├── bookingRoutes.js

│   ├── amenityRoutes.js

│   ├── unitRoutes.js

│   └── userRoutes.js

├── services/

│   ├── associationService.js

│   ├── bookingService.js

│   ├── amenityService.js

│   ├── unitService.js

│   └── userService.js

├── app.js                  # Archivo principal de la aplicación Express.js

├── package.json            # Dependencias y scripts

└── .env                    # Variables de entorno

# Instalación
1. realizar un git clone https://github.com/macs1407/onr.git
2. abrir el proyecto con su IDE de preferencia
3. desde la terminal integrada de su IDE ejecutar el comando de instalacion de dependencia npm i
4. para subir el proyecto ejecutar npm run dev
5. dentro del fuente encontrara el archivo Booking API.postman_collection.json importarlo desde Postman

# Pruebas
1. Se deben crear el CRUD de las anteriores colecciones = cada coleccion tiene su crud dentro de la coleccion de postman
2. Se debe agregar un servicio a cada CRUD para obtener los datos filtrados por asociación = dentro de cada folder encontrar un endPoint terminado con "by association"
3. Se requiere un servicio que obtenga los datos de los usuarios y sus unidades de ambas
bases de datos = el endPoint a ejecutar es http://localhost:4090/api/users/units
4. El usuario A de la asociación X, almacenado en la base de datos postgresql, desea
acceder a la plataforma para realizar la reserva (booking) de un amenity Y en la
asociación X. Cree los servicios para dicho flujo = el endPoint a ejecutar es http://localhost:4090/api/scenary/:id