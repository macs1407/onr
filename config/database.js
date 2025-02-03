require("dotenv").config();
const mongoose = require("mongoose");
const { Sequelize } = require('sequelize');

console.log('ingresa');
console.log('PG_URI = ',process.env.PG_URI);
console.log('MONGO_URI = ',process.env.MONGO_URI);
//const mongooseConnection = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

const sequelize = new Sequelize(process.env.PG_URI, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,   
});

module.exports = { mongooseConnection, sequelize };
