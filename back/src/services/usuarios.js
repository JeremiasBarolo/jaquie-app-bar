

        const { usuariosProvider } = require('../providers');

        const listAllusuarios = async () => {
            return await usuariosProvider.listAllusuarios();
        };

        const listOneusuarios = async (usuarios_id) => {
            return await usuariosProvider.listOneusuarios(usuarios_id);
        };

        const createusuarios = async (usuariosData) => {
            return await usuariosProvider.createusuarios(usuariosData);
        };


        const updateusuarios = async (usuarios_id, updateusuarios) => {
            return await usuariosProvider.updateusuarios(usuarios_id, updateusuarios);
        };

        const deleteusuarios = async (usuarios_id) => {
            return await usuariosProvider.deleteusuarios(usuarios_id);
        };


        module.exports = {
        listAllusuarios, listOneusuarios, createusuarios, updateusuarios, deleteusuarios, 
        };

