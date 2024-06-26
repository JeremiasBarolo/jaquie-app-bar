

    var models = require('../models');

    const listAllestadistica= async () => {
    try {
        const estadistica = await models.estadistica.findAll(
        );
        console.log('✅ estadistica were found');
        return estadistica;
    } catch (err) {
        console.error('🛑 Error when fetching estadistica', err);
        throw err;
    }
    };

    const listOneestadistica= async (estadistica_id) => {
    try {
        const oneestadistica= await models.estadistica.findByPk(estadistica_id, 
        );
        if (!oneestadistica) {
        
        return null;
        }
        return oneestadistica;
    } catch (err) {
        
        throw err;
    }
    };

    const createestadistica= async (Dataestadistica) => {
    

    try {
        
        const newestadistica= await models.estadistica.create(Dataestadistica);
        
        return newestadistica;
        
    } catch (err) {
        console.error('🛑 Error when creating estadistica', err);
        throw err;
    }
    };

    const updateestadistica= async (estadistica_id, dataUpdated) => {
    

    try {

        const oldestadistica= await models.estadistica.findByPk(estadistica_id);
        
        let newestadistica = await oldestadistica.update(dataUpdated);

        return newestadistica;
    } catch (err) {
        console.error('🛑 Error when updating estadistica', err);
        throw err;
    }
    
    };


    const deleteestadistica = async (estadistica_id) => {
    try {
        const deletedestadistica = await models.estadistica.findByPk(estadistica_id, 
        );

        if (!deletedestadistica) {
        return null;
        }
        
        await models.estadistica.destroy({ where: { id: estadistica_id } });


        return deletedestadistica;
    } catch (err) {
        console.error('🛑 Error when deleting estadistica', err);
        throw err;
    }
    };


    const generarEstadisticasAleatorias = async (Dataestadistica) => {
        try {
            

            await models.estadistica.destroy({ where: {} });
    
            if(!Dataestadistica.tirarDatos){
                for (let i = 0; i < 365; i++) {
                    // Genera valores aleatorios para costo, recaudación y profit
                    const costo = Math.floor(Math.random() * 100000);
                    const recaudacion = Math.floor(Math.random() * 200000) + costo; 
                    const profit = recaudacion - costo;
        
                    // Inserta un nuevo registro en la tabla estadistica
                    await models.estadistica.create({
                        costo_total: costo,
                        recaudacion: recaudacion,
                        profit: profit,
                        
                        createdAt: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
                        updatedAt: new Date() 
                    });
                }
            }
            
        } catch (err) {
            
            console.error('🛑 Error al crear estadisticas:', err);
            throw err;
        }
    };
    


    module.exports = {
    listAllestadistica, listOneestadistica, createestadistica, updateestadistica, deleteestadistica, generarEstadisticasAleatorias
    };

