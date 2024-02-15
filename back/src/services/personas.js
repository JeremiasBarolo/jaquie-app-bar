

        const { personasProvider } = require('../providers');

        const listAllpersonas = async () => {
            return await personasProvider.listAllpersonas();
        };

        const listOnepersonas = async (personas_id) => {
            return await personasProvider.listOnepersonas(personas_id);
        };

        const createpersonas = async (personasData) => {
            return await personasProvider.createpersonas(personasData);
        };


        const updatepersonas = async (personas_id, updatepersonas) => {
            return await personasProvider.updatepersonas(personas_id, updatepersonas);
        };

        const deletepersonas = async (personas_id) => {
            return await personasProvider.deletepersonas(personas_id);
        };


        module.exports = {
        listAllpersonas, listOnepersonas, createpersonas, updatepersonas, deletepersonas, 
        };

