

    var models = require('../models');
    const {calcularCosto} = require('./cerrarCaja');

    const listAllventa= async () => {
        try {
            const ventas = await models.venta.findAll({
                include: [
                    {
                        model: models.maestro_articulos,
                        include: [
                            {
                                model: models.pedido_produccion,
                                include: [
                                    {
                                        model: models.maestro_articulos,
                                        attributes: ['descripcion', 'costo_unitario' ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            console.log('✅ Ventas were found', ventas);
            return ventas;
        } catch (err) {
            console.error('🛑 Error when fetching ventas', err);
            throw err;
        }
    };

    const listOneventa= async (venta_id) => {
    try {
        const oneventa= await models.venta.findByPk(venta_id,{ 
            include: [
                {   
                    model: models.maestro_articulos,
                    include: [
                        {
                            model: models.pedido_produccion,
                            include: [
                                {
                                    model: models.maestro_articulos,
                                    attributes: ['descripcion', 'costo_unitario' ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
        );
        if (!oneventa) {
        
        return null;
        }
        return oneventa;
    } catch (err) {
        
        throw err;
    }
    };

    const createventa= async (Dataventa) => {
    

    try {
        
        const newventa= await models.venta.create(Dataventa);
        
        return newventa;

        
        
    } catch (err) {
        console.error('🛑 Error when creating venta', err);
        throw err;
    }
    };

    const updateventa= async (venta_id, dataUpdated) => {
    

    try {

        const oldventa= await listOneventa(venta_id);
        
        if(dataUpdated.estado === 'FINALIZADO'){
            let costo = await calcularCosto(oldventa.maestro_articulos)
            let newventa = await oldventa.update({...dataUpdated, total:dataUpdated.subtotal, precio: costo});
            await oldventa.maestro_articulos.forEach(element => {
            element.pedido_produccion.update({
                estado: dataUpdated.estado
            })
            return true
        });
        }else{
            let costo = await calcularCosto(oldventa.maestro_articulos)
            let newventa = await oldventa.update({...dataUpdated, total:dataUpdated.subtotal, precio:costo});
            return true
        }
        

    } catch (err) {
        console.error('🛑 Error when updating venta', err);
        throw err;
    }
    
    };


    const deleteventa = async (venta_id) => {
    try {
        const deletedventa = await models.venta.findByPk(venta_id, 
        );

        if (!deletedventa) {
        return null;
        }
        
        await models.venta.destroy({ where: { id: venta_id } });


        return deletedventa;
    } catch (err) {
        console.error('🛑 Error when deleting venta', err);
        throw err;
    }
    };


    module.exports = {
    listAllventa, listOneventa, createventa, updateventa, deleteventa,
    };

