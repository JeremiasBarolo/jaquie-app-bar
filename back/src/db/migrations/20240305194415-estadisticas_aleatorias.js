'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Crea un bucle que inserte datos para cada día durante un año
    for (let i = 0; i < 365; i++) {
      // Genera datos aleatorios para costo, recaudación y profit
      const costo = Math.floor(Math.random() * 100000);
      const recaudacion = Math.floor(Math.random() * 200000) + costo; // Asegura que la recaudación sea mayor que el costo
      const profit = recaudacion - costo;

      // Inserta los datos en la tabla de estadísticas
      await queryInterface.sequelize.query(`
        INSERT INTO estadisticas (costo_total, recaudacion, profit, createdAt, updatedAt) 
        VALUES (${costo}, ${recaudacion}, ${profit}, NOW() - INTERVAL ${i} DAY, NOW());
      `);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DELETE FROM estadisticas;');
  }
};
