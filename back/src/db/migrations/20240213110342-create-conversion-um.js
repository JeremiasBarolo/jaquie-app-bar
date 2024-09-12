'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('conversion_UMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uni_medida: {
        type: Sequelize.STRING(200)
      },
      seg_umedida: {
        type: Sequelize.STRING(200)
      },
      cant_principal: {
        type: Sequelize.BIGINT(100)
      },
      cant_secundaria: {
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
    await queryInterface.dropTable('conversion_UMs');
  }
};