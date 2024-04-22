const bcrypt = require('bcrypt');
const models = require('../models');
const config = require('../config/config')

const dbConfig = {
    host: config.development.host,
    port: config.development.port,
    username: config.development.username,
    password: config.development.password,
    database: config.development.database
};

const checkAdmin = async (dbConfig) => {

    const adminUsername = process.env.ADMIN_USER
    const adminExists = await models.usuarios.findOne({ where: { username: adminUsername } });
        
            

        if(!adminExists){
            const persona = await models.personas.create({
                name: "Admin",
	            lastname: "Admin",
	            dni: 99999999,
	            phone: 353555555,
            })

            await models.usuarios.create({
                username: adminUsername,
                password: await bcrypt.hash(process.env.ADMIN_PASSWORD , 10),
                rol: 'ADMIN',
                personaId: persona.id
            }).then(() => 
                console.log(`✅ ${adminUsername} user was created`))
        }else{
            console.log(`✅ ${adminUsername} already exists`);
        }

    
        
        
        
        
        
        

    
            
            
            

}

module.exports = { checkAdmin };