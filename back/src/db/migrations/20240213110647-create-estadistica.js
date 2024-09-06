'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estadisticas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      costo_total: {
        type: Sequelize.BIGINT(100)
      },
      recaudacion: {
        type: Sequelize.BIGINT(100)
      },
      profit: {
        type: Sequelize.BIGINT(100)
      },
      totalArticulo: {
        type: Sequelize.BIGINT(100)
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
    await queryInterface.dropTable('estadisticas');
  }
};