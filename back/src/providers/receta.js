

    var models = require('../models');

    const listAllreceta= async () => {
    try {
        const receta = await models.receta.findAll(
            {
                include: {all:true}
            }
        );
        console.log('✅ receta were found');
        return receta;
    } catch (err) {
        console.error('🛑 Error when fetching receta', err);
        throw err;
    }
    };

    const listOnereceta= async (receta_id) => {
    try {
        const onereceta= await models.receta.findByPk(receta_id, 
            {
                include: {all:true}
            }
        );
        if (!onereceta) {
        
        return null;
        }
        return onereceta;
    } catch (err) {
        
        throw err;
    }
    };

    const createreceta= async (dataReceta) => {
    

    try {
        const receta = {   
            cant_fisica:dataReceta.cant_fisica,
            maestroId:dataReceta.maestro,
            n_linea:dataReceta.n_linea
        }
        dataReceta.insumos.forEach(async element => {

            const newreceta= await models.receta.create({
                ...receta, 
                cant_necesarias: element.cantidad, 
                articuloId: element.id
            });
        
            return newreceta;
        });

        
        
    } catch (err) {
        console.error('🛑 Error when creating receta', err);
        throw err;
    }
    };

    const updatereceta= async (receta_id, dataUpdated) => {
    

    try {

        const oldreceta= await models.receta.findByPk(receta_id);
        
        let newreceta = await oldreceta.update(dataUpdated);

        return newreceta;
    } catch (err) {
        console.error('🛑 Error when updating receta', err);
        throw err;
    }
    
    };


    const deletereceta = async (receta_id) => {
    try {
        const deletedreceta = await models.receta.findByPk(receta_id, 
        );

        if (!deletedreceta) {
        return null;
        }
        
        await models.receta.destroy({ where: { id: receta_id } });


        return deletedreceta;
    } catch (err) {
        console.error('🛑 Error when deleting receta', err);
        throw err;
    }
    };


    module.exports = {
    listAllreceta, listOnereceta, createreceta, updatereceta, deletereceta,
    };

