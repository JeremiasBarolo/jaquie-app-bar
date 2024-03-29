

        const { pedido_stockProvider, sumarPedidos } = require('../providers');

        const listAllpedido_stock = async () => {
            return await pedido_stockProvider.listAllpedido_stock();
        };

        const listOnepedido_stock = async (pedido_stock_id) => {
            return await pedido_stockProvider.listOnepedido_stock(pedido_stock_id);
        };

        const createpedido_stock = async (pedido_stockData) => {
            if(pedido_stockData.sumarCantidades){
                return await sumarPedidos.sumarPedidoStock(pedido_stockData);
            }else{
                return await pedido_stockProvider.createpedido_stock(pedido_stockData);
            }
            
        };


        const updatepedido_stock = async (pedido_stock_id, updatepedido_stock) => {
            return await pedido_stockProvider.updatepedido_stock(pedido_stock_id, updatepedido_stock);
        };

        const deletepedido_stock = async (pedido_stock_id) => {
            return await pedido_stockProvider.deletepedido_stock(pedido_stock_id);
        };


        module.exports = {
        listAllpedido_stock, listOnepedido_stock, createpedido_stock, updatepedido_stock, deletepedido_stock, 
        };

