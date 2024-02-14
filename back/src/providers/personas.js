

    var models = require('../models');

    const listAllpersonas= async () => {
    try {
        const personas = await models.personas.findAll(
        );
        console.log('✅ personas were found');
        return personas;
    } catch (err) {
        console.error('🛑 Error when fetching personas', err);
        throw err;
    }
    };

    const listOnepersonas= async (personas_id) => {
    try {
        const onepersonas= await models.personas.findByPk(personas_id, 
        );
        if (!onepersonas) {
        
        return null;
        }
        return onepersonas;
    } catch (err) {
        
        throw err;
    }
    };

    const createpersonas= async (Datapersonas) => {
    

    try {
        
        const newpersonas= await models.personas.create(Datapersonas);
        
        return newpersonas;
        
    } catch (err) {
        console.error('🛑 Error when creating personas', err);
        throw err;
    }
    };

    const updatepersonas= async (personas_id, dataUpdated) => {
    

    try {

        const oldpersonas= await models.personas.findByPk(personas_id);
        
        let newpersonas = await oldpersonas.update(dataUpdated);

        return newpersonas;
    } catch (err) {
        console.error('🛑 Error when updating personas', err);
        throw err;
    }
    
    };


    const deletepersonas = async (personas_id) => {
    try {
        const deletedpersonas = await models.personas.findByPk(personas_id, 
        );

        if (!deletedpersonas) {
        return null;
        }
        
        await models.personas.destroy({ where: { id: personas_id } });


        return deletedpersonas;
    } catch (err) {
        console.error('🛑 Error when deleting personas', err);
        throw err;
    }
    };


    module.exports = {
    listAllpersonas, listOnepersonas, createpersonas, updatepersonas, deletepersonas,
    };

