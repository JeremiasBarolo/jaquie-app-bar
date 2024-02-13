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
    const adminExists = await models.User.findOne({ where: { username: adminUsername } });
        
            
    !adminExists
        ?  await models.User.create({
            username: adminUsername,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD , 10)
        }).then(() => 
            console.log(`✅ ${adminUsername} user was created`))

    : console.log(`✅ ${adminUsername} already exists`);
            
            
            

}

module.exports = { checkAdmin };