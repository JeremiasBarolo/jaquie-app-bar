

    var models = require('../models');

    const listAlldisponibilidad_articulos= async () => {
    try {
        const disponibilidad_articulos = await models.disponibilidad_articulos.findAll(
            {
                include: [ 
                    { model: models.maestro_articulos },
                    { model: models.conversion_UM },],
               
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
        const nuevoArticulo ={
            cant_fisica: Datadisponibilidad_articulos.cant_fisica,
            cant_comprometida: Datadisponibilidad_articulos.cant_comprometida,
            cant_disponible: Datadisponibilidad_articulos.cant_disponible,
            articuloId: Datadisponibilidad_articulos.maestro,
            conversionId: Datadisponibilidad_articulos.conversionUM
        }
        const newdisponibilidad_articulos= await models.disponibilidad_articulos.create(nuevoArticulo);
        
        return newdisponibilidad_articulos;
        
    } catch (err) {
        console.error('🛑 Error when creating disponibilidad_articulos', err);
        throw err;
    }
    };

    const updatedisponibilidad_articulos= async (disponibilidad_articulos_id, dataUpdated) => {
        

    try {
        if(dataUpdated.add){
            // <================================== SUMAR CANTIDAD =================================>
            const nuevaCantidad = {
                cant_fisica: dataUpdated.cant_fisica_nueva
            }

            const olddisponibilidad_articulos= await models.disponibilidad_articulos.findByPk(disponibilidad_articulos_id);
        
            let newdisponibilidad_articulos = await olddisponibilidad_articulos.update(nuevaCantidad);
    
            return newdisponibilidad_articulos;
            
        }else{
            // <================================== UPDATE NORMAL =================================>
            const nuevoArticulo ={
                cant_fisica: dataUpdated.cant_fisica,
                cant_comprometida: dataUpdated.cant_comprometida,
                cant_disponible: dataUpdated.cant_disponible,
                articuloId: dataUpdated.maestro,
                conversionId: dataUpdated.conversionUM
            }

            const olddisponibilidad_articulos= await models.disponibilidad_articulos.findByPk(disponibilidad_articulos_id);
        
            let newdisponibilidad_articulos = await olddisponibilidad_articulos.update(nuevoArticulo);
    
            return newdisponibilidad_articulos;
        }
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

