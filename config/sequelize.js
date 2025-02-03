require("dotenv").config();
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
  },
  names: {
      type: DataTypes.STRING,
      allowNull: false
  },
  lastNames: {
      type: DataTypes.STRING
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

const Association = sequelize.define('Association', {
  id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  address: {
      type: DataTypes.STRING
  }
}, {
  tableName: 'associations',
  timestamps: false
});

const Unit = sequelize.define('Unit', {
  id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  associationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
          model: Association,
          key: 'id'
      },
      onDelete: 'CASCADE'
  }
}, {
  tableName: 'units',
  timestamps: false
});

const UserAssociation = sequelize.define('UserAssociation', {
  userId: {
      type: DataTypes.UUID,
      allowNull: false
  },
  associationId: {
      type: DataTypes.UUID,
      allowNull: false
  }
}, {
  tableName: 'user_associations',
  timestamps: false
});

// Relación muchos a muchos entre User y Association
User.belongsToMany(Association, { through: 'UserAssociations', foreignKey: 'userId' });
Association.belongsToMany(User, { through: 'UserAssociations', foreignKey: 'associationId' });

// Definir las relaciones (muchos a muchos)
//User.belongsToMany(Association, { through: 'UserAssociations' });
User.belongsToMany(Unit, { through: 'UserUnits' });

// Definir relación entre Unit y Association
Unit.belongsTo(Association, { foreignKey: 'associationId' });
Association.hasMany(Unit, { foreignKey: 'associationId' });

module.exports = { User, Association, UserAssociation, Unit, sequelize };
