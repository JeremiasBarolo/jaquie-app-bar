'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class personas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      personas.hasOne(models.users, {
        foreignKey: 'personaId',
        onUpdate: 'CASCADE',
      })
    }
  }
  personas.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'personas',
  });
  return personas;
};