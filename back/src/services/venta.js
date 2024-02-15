

        const { ventaProvider } = require('../providers');

        const listAllventa = async () => {
            return await ventaProvider.listAllventa();
        };

        const listOneventa = async (venta_id) => {
            return await ventaProvider.listOneventa(venta_id);
        };

        const createventa = async (ventaData) => {
            return await ventaProvider.createventa(ventaData);
        };


        const updateventa = async (venta_id, updateventa) => {
            return await ventaProvider.updateventa(venta_id, updateventa);
        };

        const deleteventa = async (venta_id) => {
            return await ventaProvider.deleteventa(venta_id);
        };


        module.exports = {
        listAllventa, listOneventa, createventa, updateventa, deleteventa, 
        };

