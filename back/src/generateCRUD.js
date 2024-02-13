const fs = require('fs');
const path = require('path');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
  console.log(`Archivo creado: ${filePath}`);
};

const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Directorio creado: ${dirPath}`);
  }
};

const generateCRUD = (resourceName) => {
  const capitalizedResourceName = capitalizeFirstLetter(resourceName);





const routesContent = `
    const express = require('express');
    const router = express.Router();
    const {${resourceName}Controller }= require('../controllers');

    router.get('/', ${resourceName}Controller.listAll${resourceName});
    router.get('/:${resourceName}_id', ${resourceName}Controller.listOne${resourceName});
    router.post('/', ${resourceName}Controller.create${resourceName});
    router.put('/:${resourceName}_id', ${resourceName}Controller.update${resourceName});
    router.delete('/:${resourceName}_id', ${resourceName}Controller.delete${resourceName});

    module.exports = router;
    `;

const controllersContent = `

const { ${resourceName}Service } = require("../services");


const listAll${resourceName} = async (req, res) => {
  try {
    const ${resourceName} = await ${resourceName}Service.listAll${resourceName}();
    res.json(${resourceName});
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOne${resourceName} = async (req, res) => {
  try {
    const id = req.params.${resourceName}_id;
    const ${resourceName} = await ${resourceName}Service.listOne${resourceName}(id);
    res.json(${resourceName});

  } catch (err) {
    res.status(500).json({ action: "listOne${resourceName}", error: err.message });
  }

};

const create${resourceName} = async (req, res) => {

  try {
    const new${resourceName} = await ${resourceName}Service.create${resourceName}(req.body);

    res.json(new${resourceName});
  } catch (error) {
    res.status(500).json({ error: 'Unable to create ${resourceName}.' });
  }
};

const update${resourceName} = async (req, res) => {

  try {
    const ${resourceName}Update = await ${resourceName}Service.update${resourceName}(req.params.${resourceName}_id, req.body);
    res.json(${resourceName}Update);
  } catch (err) {
    res.status(500).json({ action: 'update${resourceName}', error: err.message });
  }
};

const delete${resourceName} = async (req, res) => {
  const id = req.params.${resourceName}_id;
  try {
    await ${resourceName}Service.delete${resourceName}(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'delete${resourceName}', error: err.message });
  }
};



module.exports = {
  listAll${resourceName}, listOne${resourceName}, create${resourceName}, update${resourceName}, delete${resourceName}, 
};
`;

  const servicesContent = `

        const { ${resourceName}Provider } = require('../providers');

        const listAll${resourceName} = async () => {
            return await ${resourceName}Provider.listAll${resourceName}();
        };

        const listOne${resourceName} = async (${resourceName}_id) => {
            return await ${resourceName}Provider.listOne${resourceName}(${resourceName}_id);
        };

        const create${resourceName} = async (${resourceName}Data) => {
            return await ${resourceName}Provider.create${resourceName}(${resourceName}Data);
        };


        const update${resourceName} = async (${resourceName}_id, update${resourceName}) => {
            return await ${resourceName}Provider.update${resourceName}(${resourceName}_id, update${resourceName});
        };

        const delete${resourceName} = async (${resourceName}_id) => {
            return await ${resourceName}Provider.delete${resourceName}(${resourceName}_id);
        };


        module.exports = {
        listAll${resourceName}, listOne${resourceName}, create${resourceName}, update${resourceName}, delete${resourceName}, 
        };

`;

  const providersContent = `

    var models = require('../models');

    const listAll${resourceName}= async () => {
    try {
        const ${resourceName} = await models.${capitalizedResourceName}.findAll(
        );
        console.log('✅ ${resourceName} were found');
        return ${resourceName};
    } catch (err) {
        console.error('🛑 Error when fetching ${resourceName}', err);
        throw err;
    }
    };

    const listOne${resourceName}= async (${resourceName}_id) => {
    try {
        const one${resourceName}= await models.${capitalizedResourceName}.findByPk(${resourceName}_id, 
        );
        if (!one${resourceName}) {
        
        return null;
        }
        return one${resourceName};
    } catch (err) {
        
        throw err;
    }
    };

    const create${resourceName}= async (Data${resourceName}) => {
    

    try {
        
        const new${resourceName}= await models.${capitalizedResourceName}.create(Data${resourceName});
        
        return new${resourceName};
        
    } catch (err) {
        console.error('🛑 Error when creating ${resourceName}', err);
        throw err;
    }
    };

    const update${resourceName}= async (${resourceName}_id, dataUpdated) => {
    

    try {

        const old${resourceName}= await models.${capitalizedResourceName}.findByPk(${resourceName}_id);
        
        let new${resourceName} = await old${resourceName}.update(dataUpdated);

        return new${resourceName};
    } catch (err) {
        console.error('🛑 Error when updating ${resourceName}', err);
        throw err;
    }
    
    };


    const delete${resourceName} = async (${resourceName}_id) => {
    try {
        const deleted${resourceName} = await models.${capitalizedResourceName}.findByPk(${resourceName}_id, 
        );

        if (!deleted${resourceName}) {
        return null;
        }
        
        await models.${capitalizedResourceName}.destroy({ where: { id: ${resourceName}_id } });


        return deleted${resourceName};
    } catch (err) {
        console.error('🛑 Error when deleting ${resourceName}', err);
        throw err;
    }
    };


    module.exports = {
    listAll${resourceName}, listOne${resourceName}, create${resourceName}, update${resourceName}, delete${resourceName},
    };

`;

  // Crear directorios
  createDirectory('./routes');
  createDirectory('./controllers');
  createDirectory('./services');
  createDirectory('./providers');

  // Crear archivos
  createFile(`./routes/${resourceName}.js`, routesContent);
  createFile(`./controllers/${resourceName}.js`, controllersContent);
  createFile(`./services/${resourceName}.js`, servicesContent);
  createFile(`./providers/${resourceName}.js`, providersContent);

  console.log('Estructura CRUD generada exitosamente.');
};

// Obtener el nombre del recurso desde la línea de comandos
const resourceName = process.argv[2];

if (!resourceName) {
  console.error('Por favor, proporciona un nombre para el recurso.');
} else {
  generateCRUD(resourceName);
}
