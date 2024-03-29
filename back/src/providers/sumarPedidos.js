

var models = require('../models');

    const sumarPedidoStock = async (dataPedido) => {
        try {
            const existingPedidoStock = await models.disponibilidad_articulos.findOne({ where: { articuloId: dataPedido.articuloId } });
            if (existingPedidoStock) {
                const suma = existingPedidoStock.cant_fisica += dataPedido.cant_requerida;
                await existingPedidoStock.update({ cant_fisica: suma });
            } else {
                
                const newPedidoStock = await models.disponibilidad_articulos.create({
                    articuloId: dataPedido.articuloId,
                    cant_fisica: dataPedido.cant_requerida,
                    cant_comprometida: 0,
                    cant_disponible:dataPedido.cant_requerida,
                    conversionId: dataPedido.maestro_articulo.conversionId,
                });

                
                return newPedidoStock;
            }
            
            const antiguoPedido = await models.pedido_stock.destroy({ where: { id: dataPedido.id } });
            return antiguoPedido;
        } catch (err) {
            console.error('🛑 Error when fetching pedido_stock', err);
            throw err;
        }
    };

   


    module.exports = {
        sumarPedidoStock, 
    };

