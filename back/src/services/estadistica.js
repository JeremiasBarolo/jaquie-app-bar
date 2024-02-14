

        const { estadisticaProvider } = require('../providers');

        const listAllestadistica = async () => {
            return await estadisticaProvider.listAllestadistica();
        };

        const listOneestadistica = async (estadistica_id) => {
            return await estadisticaProvider.listOneestadistica(estadistica_id);
        };

        const createestadistica = async (estadisticaData) => {
            return await estadisticaProvider.createestadistica(estadisticaData);
        };


        const updateestadistica = async (estadistica_id, updateestadistica) => {
            return await estadisticaProvider.updateestadistica(estadistica_id, updateestadistica);
        };

        const deleteestadistica = async (estadistica_id) => {
            return await estadisticaProvider.deleteestadistica(estadistica_id);
        };


        module.exports = {
        listAllestadistica, listOneestadistica, createestadistica, updateestadistica, deleteestadistica, 
        };

