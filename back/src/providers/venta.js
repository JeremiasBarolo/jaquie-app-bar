

    var models = require('../models');

    const listAllventa= async () => {
        try {
            const ventas = await models.venta.findAll({
                include: [
                    {
                        all: true,
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
                    all: true,
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

        const oldventa= await models.venta.findByPk(venta_id, {include:{all:true}});
        
        if(dataUpdated.estado === 'FINALIZADO'){
            
            let newventa = await oldventa.update({...dataUpdated, precio:dataUpdated.precio, total:dataUpdated.precio});
            await oldventa.maestro_articulos.forEach(element => {
            element.pedido_produccion.update({
                estado: dataUpdated.estado
            })
            return true
        });
        }else{
            let newventa = await oldventa.update({...dataUpdated, precio:dataUpdated.precio, total:dataUpdated.precio});
            return true
        }
        

        return newventa;
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

