

        const { recetaProvider } = require('../providers');

        const listAllreceta = async () => {
            return await recetaProvider.listAllreceta();
        };

        const listOnereceta = async (receta_id) => {
            return await recetaProvider.listOnereceta(receta_id);
        };

        const createreceta = async (recetaData) => {
            return await recetaProvider.createreceta(recetaData);
        };


        const updatereceta = async (receta_id, updatereceta) => {
            return await recetaProvider.updatereceta(receta_id, updatereceta);
        };

        const deletereceta = async (receta_id) => {
            return await recetaProvider.deletereceta(receta_id);
        };


        module.exports = {
        listAllreceta, listOnereceta, createreceta, updatereceta, deletereceta, 
        };

