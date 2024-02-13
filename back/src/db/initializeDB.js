const { exec } = require('child_process');


const initializeDB = async () => {
  try {
    await new Promise((resolve, reject) => {
      const migrate = exec(
        'npx sequelize-cli db:migrate',
        { env: process.env },
        (err, stdout, stderr) => {
          if (err) {
            console.error('Error executing migrations:', err);
            reject(err);
            return;
          }
          resolve(null);
        },
      );

      migrate.stdout.on('data', (data) => {
        console.log(data);
        if (data.indexOf('No migrations were executed, database schema was already up to date.') !== -1) {
          // migrate.kill();
        }
      });
    });
  } catch (error) {
    console.error('Error in initializeDB:', error);
  }
};



module.exports = { initializeDB };