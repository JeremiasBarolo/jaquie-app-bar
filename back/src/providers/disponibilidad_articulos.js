

    var models = require('../models');

    const listAlldisponibilidad_articulos= async () => {
    try {
        const disponibilidad_articulos = await models.disponibilidad_articulos.findAll(
            {
                include: [models.conversion_UM],
                include: [models.maestro_articulos]
            }
        
        );
        console.log('✅ disponibilidad_articulos were found');
        return disponibilidad_articulos;
    } catch (err) {
        console.error('🛑 Error when fetching disponibilidad_articulos', err);
        throw err;
    }
    };

    const listOnedisponibilidad_articulos= async (disponibilidad_articulos_id) => {
    try {
        const onedisponibilidad_articulos= await models.disponibilidad_articulos.findByPk(disponibilidad_articulos_id, 
            {
                include: [models.conversion_UM],
                include: [models.maestro_articulos]
            }
        );
        if (!onedisponibilidad_articulos) {
        
        return null;
        }
        return onedisponibilidad_articulos;
    } catch (err) {
        
        throw err;
    }
    };

    const createdisponibilidad_articulos= async (Datadisponibilidad_articulos) => {
    

    try {
        
        const newdisponibilidad_articulos= await models.disponibilidad_articulos.create(Datadisponibilidad_articulos);
        
        return newdisponibilidad_articulos;
        
    } catch (err) {
        console.error('🛑 Error when creating disponibilidad_articulos', err);
        throw err;
    }
    };

    const updatedisponibilidad_articulos= async (disponibilidad_articulos_id, dataUpdated) => {
    

    try {

        const olddisponibilidad_articulos= await models.disponibilidad_articulos.findByPk(disponibilidad_articulos_id);
        
        let newdisponibilidad_articulos = await olddisponibilidad_articulos.update(dataUpdated);

        return newdisponibilidad_articulos;
    } catch (err) {
        console.error('🛑 Error when updating disponibilidad_articulos', err);
        throw err;
    }
    
    };


    const deletedisponibilidad_articulos = async (disponibilidad_articulos_id) => {
    try {
        const deleteddisponibilidad_articulos = await models.disponibilidad_articulos.findByPk(disponibilidad_articulos_id, 
        );

        if (!deleteddisponibilidad_articulos) {
        return null;
        }
        
        await models.disponibilidad_articulos.destroy({ where: { id: disponibilidad_articulos_id } });


        return deleteddisponibilidad_articulos;
    } catch (err) {
        console.error('🛑 Error when deleting disponibilidad_articulos', err);
        throw err;
    }
    };


    module.exports = {
    listAlldisponibilidad_articulos, listOnedisponibilidad_articulos, createdisponibilidad_articulos, updatedisponibilidad_articulos, deletedisponibilidad_articulos,
    };

