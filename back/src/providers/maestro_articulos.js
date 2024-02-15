

    var models = require('../models');

    const listAllmaestro_articulos= async () => {
    try {
        const maestro_articulos = await models.maestro_articulos.findAll(
            {
                include: {all:true},
                include: [{
                    model: models.receta, 
                    include: [{
                        model: models.disponibilidad_articulos, 
                        include:[{
                            model: models.maestro_articulos,
                            attributes: ['descripcion'] 
                        }]
                        
                    }]
                }]
            }
            
        );
        console.log('✅ maestro_articulos were found');
        return maestro_articulos;
    } catch (err) {
        console.error('🛑 Error when fetching maestro_articulos', err);
        throw err;
    }
    };

    const listOnemaestro_articulos= async (maestro_articulos_id) => {
    try {
        const onemaestro_articulos= await models.maestro_articulos.findByPk(maestro_articulos_id, 
            
            {
                include: [{model: models.tipo_articulo}],
                include: [{model: models.conversion_UM}],
                include: [{
                    model: models.receta, 
                    include: [{
                        model: models.disponibilidad_articulos, 
                        include:[{
                            model: models.maestro_articulos,
                            attributes: ['descripcion'] 
                        }]
                        
                    }]
                }]
            }
            
        );

        if (!onemaestro_articulos) {
        
        return null;
        }
        return onemaestro_articulos;
    } catch (err) {
        
        throw err;
    }
    };

    const createmaestro_articulos= async (Datamaestro_articulos) => {
    

    try {
        
        const newmaestro_articulos= await models.maestro_articulos.create(Datamaestro_articulos);
        
        return newmaestro_articulos;
        
    } catch (err) {
        console.error('🛑 Error when creating maestro_articulos', err);
        throw err;
    }
    };

    const updatemaestro_articulos= async (maestro_articulos_id, dataUpdated) => {
    

    try {

        const oldmaestro_articulos= await models.maestro_articulos.findByPk(maestro_articulos_id);
        
        let newmaestro_articulos = await oldmaestro_articulos.update(dataUpdated);

        return newmaestro_articulos;
    } catch (err) {
        console.error('🛑 Error when updating maestro_articulos', err);
        throw err;
    }
    
    };


    const deletemaestro_articulos = async (maestro_articulos_id) => {
    try {
        const deletedmaestro_articulos = await models.maestro_articulos.findByPk(maestro_articulos_id, 
        );

        if (!deletedmaestro_articulos) {
        return null;
        }
        
        await models.maestro_articulos.destroy({ where: { id: maestro_articulos_id } });


        return deletedmaestro_articulos;
    } catch (err) {
        console.error('🛑 Error when deleting maestro_articulos', err);
        throw err;
    }
    };


    module.exports = {
    listAllmaestro_articulos, listOnemaestro_articulos, createmaestro_articulos, updatemaestro_articulos, deletemaestro_articulos,
    };

