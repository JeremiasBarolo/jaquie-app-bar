

    var models = require('../models');

    const listAllconversion_UM= async () => {
    try {
        const conversion_UM = await models.conversion_UM.findAll(
        );
        console.log('✅ conversion_UM were found');
        return conversion_UM;
    } catch (err) {
        console.error('🛑 Error when fetching conversion_UM', err);
        throw err;
    }
    };

    const listOneconversion_UM= async (conversion_UM_id) => {
    try {
        const oneconversion_UM= await models.conversion_UM.findByPk(conversion_UM_id, 
        );
        if (!oneconversion_UM) {
        
        return null;
        }
        return oneconversion_UM;
    } catch (err) {
        
        throw err;
    }
    };

    const createconversion_UM= async (Dataconversion_UM) => {
    

    try {
        
        const newconversion_UM= await models.conversion_UM.create(Dataconversion_UM);
        
        return newconversion_UM;
        
    } catch (err) {
        console.error('🛑 Error when creating conversion_UM', err);
        throw err;
    }
    };

    const updateconversion_UM= async (conversion_UM_id, dataUpdated) => {
    

    try {

        const oldconversion_UM= await models.conversion_UM.findByPk(conversion_UM_id);
        
        let newconversion_UM = await oldconversion_UM.update(dataUpdated);

        return newconversion_UM;
    } catch (err) {
        console.error('🛑 Error when updating conversion_UM', err);
        throw err;
    }
    
    };


    const deleteconversion_UM = async (conversion_UM_id) => {
    try {
        const deletedconversion_UM = await models.conversion_UM.findByPk(conversion_UM_id, 
        );

        if (!deletedconversion_UM) {
        return null;
        }
        
        await models.conversion_UM.destroy({ where: { id: conversion_UM_id } });


        return deletedconversion_UM;
    } catch (err) {
        console.error('🛑 Error when deleting conversion_UM', err);
        throw err;
    }
    };


    module.exports = {
    listAllconversion_UM, listOneconversion_UM, createconversion_UM, updateconversion_UM, deleteconversion_UM,
    };

