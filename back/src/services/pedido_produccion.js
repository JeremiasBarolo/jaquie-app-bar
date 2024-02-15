

        const { pedido_produccionProvider } = require('../providers');

        const listAllpedido_produccion = async () => {
            return await pedido_produccionProvider.listAllpedido_produccion();
        };

        const listOnepedido_produccion = async (pedido_produccion_id) => {
            return await pedido_produccionProvider.listOnepedido_produccion(pedido_produccion_id);
        };

        const createpedido_produccion = async (pedido_produccionData) => {
            return await pedido_produccionProvider.createpedido_produccion(pedido_produccionData);
        };


        const updatepedido_produccion = async (pedido_produccion_id, updatepedido_produccion) => {
            return await pedido_produccionProvider.updatepedido_produccion(pedido_produccion_id, updatepedido_produccion);
        };

        const deletepedido_produccion = async (pedido_produccion_id) => {
            return await pedido_produccionProvider.deletepedido_produccion(pedido_produccion_id);
        };


        module.exports = {
        listAllpedido_produccion, listOnepedido_produccion, createpedido_produccion, updatepedido_produccion, deletepedido_produccion, 
        };

