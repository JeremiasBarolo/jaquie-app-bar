const bcrypt = require('bcrypt');
var models = require('../models');
const { all } = require('../routes/TipoArticulo');

    const listAllusuarios= async () => {
    try {
        const usuarios = await models.usuarios.findAll(
            {
                include: [models.personas]
            }
            
        );
        console.log('✅ usuarios were found');
        return usuarios;
    } catch (err) {
        console.error('🛑 Error when fetching usuarios', err);
        throw err;
    }
    };

    const listOneusuarios= async (usuarios_id) => {
    try {
        const oneusuarios= await models.usuarios.findByPk(usuarios_id, 
            {
                include: [models.personas]
            }
        );
        if (!oneusuarios) {
        
        return null;
        }
        return oneusuarios;
    } catch (err) {
        
        throw err;
    }
    };

    const createusuarios = async (Datausuarios) => {
        try {
            
            const hashedPassword = await bcrypt.hash(Datausuarios.password, 10); 
    
            let user = {
                username: Datausuarios.username,
                password: hashedPassword, 
                rol: Datausuarios.rol,
                personaId: Datausuarios.personaId
            };
            
            const newusuarios = await models.usuarios.create(user);
            
            return newusuarios;
            
        } catch (err) {
            console.error('🛑 Error when creating usuarios', err);
            throw err;
        }
    };

    const updateusuarios= async (usuarios_id, dataUpdated) => {
    

    try {

        const oldusuarios= await models.usuarios.findByPk(usuarios_id);
        
        let newusuarios = await oldusuarios.update(dataUpdated);

        return newusuarios;
    } catch (err) {
        console.error('🛑 Error when updating usuarios', err);
        throw err;
    }
    
    };


    const deleteusuarios = async (usuarios_id) => {
    try {
        const deletedusuarios = await models.usuarios.findByPk(usuarios_id, 
        );

        if (!deletedusuarios) {
        return null;
        }
        
        await models.usuarios.destroy({ where: { id: usuarios_id } });


        return deletedusuarios;
    } catch (err) {
        console.error('🛑 Error when deleting usuarios', err);
        throw err;
    }
    };


    module.exports = {
    listAllusuarios, listOneusuarios, createusuarios, updateusuarios, deleteusuarios,
    };

