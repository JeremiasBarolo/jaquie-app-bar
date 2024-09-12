'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('venta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mesa: {
        type: Sequelize.STRING(200)
      },
      precio: {
        type: Sequelize.BIGINT(100)
      },
      total: {
        type: Sequelize.BIGINT(100)
      },
      estado: {
        type: Sequelize.STRING(200)
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
    await queryInterface.dropTable('venta');
  }
};