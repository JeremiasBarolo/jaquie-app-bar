

        const { conversion_UMProvider } = require('../providers');

        const listAllconversion_UM = async () => {
            return await conversion_UMProvider.listAllconversion_UM();
        };

        const listOneconversion_UM = async (conversion_UM_id) => {
            return await conversion_UMProvider.listOneconversion_UM(conversion_UM_id);
        };

        const createconversion_UM = async (conversion_UMData) => {
            return await conversion_UMProvider.createconversion_UM(conversion_UMData);
        };


        const updateconversion_UM = async (conversion_UM_id, updateconversion_UM) => {
            return await conversion_UMProvider.updateconversion_UM(conversion_UM_id, updateconversion_UM);
        };

        const deleteconversion_UM = async (conversion_UM_id) => {
            return await conversion_UMProvider.deleteconversion_UM(conversion_UM_id);
        };


        module.exports = {
        listAllconversion_UM, listOneconversion_UM, createconversion_UM, updateconversion_UM, deleteconversion_UM, 
        };

