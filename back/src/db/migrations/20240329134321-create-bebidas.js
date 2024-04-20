'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bebidas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      primerComponenteCantidad: {
        type: Sequelize.INTEGER
      },
      segundoComponenteCantidad: {
        type: Sequelize.INTEGER
      },
      tercerComponenteCantidad: {
        type: Sequelize.INTEGER
      },
      cuartoComponenteCantidad: {
        type: Sequelize.INTEGER
      },
      quintoComponenteCantidad: {
        type: Sequelize.INTEGER
      },
      cantidadTotalRecipiente: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bebidas');
  }
};