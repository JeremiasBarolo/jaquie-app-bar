

    var models = require('../models');

    const listAllBebidas= async () => {
    try {
        const Bebidas = await models.Bebidas.findAll(
            {
                include: [
                    { model: models.maestro_articulos, as: 'NombreArticulo' },
                    { model: models.maestro_articulos, as: 'PrimerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'SegundoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'TercerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'CuartoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'QuintoComponenteArticulo' },
                ],
               
            }
        );
        console.log('✅ Bebidas were found');
        return Bebidas;
    } catch (err) {
        console.error('🛑 Error when fetching Bebidas', err);
        throw err;
    }
    };

    const listOneBebidas= async (Bebidas_id) => {
    try {
        const oneBebidas= await models.Bebidas.findByPk(Bebidas_id, 
            {
                include: [
                    { model: models.maestro_articulos, as: 'NombreArticulo' },
                    { model: models.maestro_articulos, as: 'PrimerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'SegundoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'TercerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'CuartoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'QuintoComponenteArticulo' },
                ],
               
            }
        );
        if (!oneBebidas) {
        
        return null;
        }
        return oneBebidas;
    } catch (err) {
        
        throw err;
    }
    };

    const createBebidas= async (DataBebidas) => {
    

    try {

        
        const newBebidas= await models.Bebidas.create(DataBebidas);
        
        return newBebidas;
        
    } catch (err) {
        console.error('🛑 Error when creating Bebidas', err);
        throw err;
    }
    };

    const updateBebidas= async (Bebidas_id, dataUpdated) => {
    

    try {

        const oldBebidas= await models.Bebidas.findByPk(Bebidas_id);
        
        let newBebidas = await oldBebidas.update(dataUpdated);

        return newBebidas;
    } catch (err) {
        console.error('🛑 Error when updating Bebidas', err);
        throw err;
    }
    
    };


    const deleteBebidas = async (Bebidas_id) => {
    try {
        const deletedBebidas = await models.Bebidas.findByPk(Bebidas_id, 
        );

        if (!deletedBebidas) {
        return null;
        }
        
        await models.Bebidas.destroy({ where: { id: Bebidas_id } });


        return deletedBebidas;
    } catch (err) {
        console.error('🛑 Error when deleting Bebidas', err);
        throw err;
    }
    };


    module.exports = {
    listAllBebidas, listOneBebidas, createBebidas, updateBebidas, deleteBebidas,
    };

