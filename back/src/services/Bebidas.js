

        const { BebidasProvider } = require('../providers');

        const listAllBebidas = async () => {
            return await BebidasProvider.listAllBebidas();
        };

        const listOneBebidas = async (Bebidas_id) => {
            return await BebidasProvider.listOneBebidas(Bebidas_id);
        };

        const createBebidas = async (BebidasData) => {
            return await BebidasProvider.createBebidas(BebidasData);
        };


        const updateBebidas = async (Bebidas_id, updateBebidas) => {
            return await BebidasProvider.updateBebidas(Bebidas_id, updateBebidas);
        };

        const deleteBebidas = async (Bebidas_id) => {
            return await BebidasProvider.deleteBebidas(Bebidas_id);
        };


        module.exports = {
        listAllBebidas, listOneBebidas, createBebidas, updateBebidas, deleteBebidas, 
        };

