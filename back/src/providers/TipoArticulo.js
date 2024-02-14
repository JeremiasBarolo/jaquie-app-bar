

    var models = require('../models');

    const listAllTipoArticulo= async () => {
    try {
        const TipoArticulo = await models.tipo_articulo.findAll(
        );
        console.log('✅ TipoArticulo were found');
        return TipoArticulo;
    } catch (err) {
        console.error('🛑 Error when fetching TipoArticulo', err);
        throw err;
    }
    };

    const listOneTipoArticulo= async (TipoArticulo_id) => {
    try {
        const oneTipoArticulo= await models.tipo_articulo.findByPk(TipoArticulo_id, 
        );
        if (!oneTipoArticulo) {
        
        return null;
        }
        return oneTipoArticulo;
    } catch (err) {
        
        throw err;
    }
    };

    const createTipoArticulo= async (DataTipoArticulo) => {
    

    try {
        
        const newTipoArticulo= await models.tipo_articulo.create(DataTipoArticulo);
        
        return newTipoArticulo;
        
    } catch (err) {
        console.error('🛑 Error when creating TipoArticulo', err);
        throw err;
    }
    };

    const updateTipoArticulo= async (TipoArticulo_id, dataUpdated) => {
    

    try {

        const oldTipoArticulo= await models.tipo_articulo.findByPk(TipoArticulo_id);
        
        let newTipoArticulo = await oldTipoArticulo.update(dataUpdated);

        return newTipoArticulo;
    } catch (err) {
        console.error('🛑 Error when updating TipoArticulo', err);
        throw err;
    }
    
    };


    const deleteTipoArticulo = async (TipoArticulo_id) => {
    try {
        const deletedTipoArticulo = await models.tipo_articulo.findByPk(TipoArticulo_id, 
        );

        if (!deletedTipoArticulo) {
        return null;
        }
        
        await models.tipo_articulo.destroy({ where: { id: TipoArticulo_id } });


        return deletedTipoArticulo;
    } catch (err) {
        console.error('🛑 Error when deleting TipoArticulo', err);
        throw err;
    }
    };


    module.exports = {
    listAllTipoArticulo, listOneTipoArticulo, createTipoArticulo, updateTipoArticulo, deleteTipoArticulo,
    };

