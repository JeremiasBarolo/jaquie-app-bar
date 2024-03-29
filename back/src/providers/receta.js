

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
                cant_necesaria: element.cantidad, 
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

        // trae las recetas de el maestro de articulos
        const oldreceta=  await models.maestro_articulos.findByPk(receta_id, {include: { all: true }});
        const recetas =  oldreceta.receta;

       const newreceta = await recetas.map(async (recetaActual) => {
            dataUpdated.insumos.forEach(async element => {
                if(recetaActual.articuloId === element.id){
                    const updatedReceta = await models.receta.findByPk(recetaActual.id)
                    await updatedReceta.update({
                        cant_fisica:dataUpdated.cant_fisica,
                        maestroId:dataUpdated.maestro,
                        n_linea:dataUpdated.n_linea,
                        articuloId: element.id,
                        cant_necesaria: element.cantidad,
                    })
                }
            })
        })

        return newreceta;
    } catch (err) {
        console.error('🛑 Error when updating receta', err);
        throw err;
    }
    
    };


    const deletereceta = async (receta_id) => {
    try {

        const deletedreceta = await models.maestro_articulos.findByPk(receta_id, 
            {include:{all:true}}
        );

        if (!deletedreceta) {
        return null;
        }
        
        deletedreceta.receta.map(async (receta) => {
            await models.receta.findByPk(receta.id)
            .then(async (receta) => {
                await receta.destroy();
            })
            
        })


        return deletedreceta;
    } catch (err) {
        console.error('🛑 Error when deleting receta', err);
        throw err;
    }
    };


    module.exports = {
    listAllreceta, listOnereceta, createreceta, updatereceta, deletereceta,
    };

