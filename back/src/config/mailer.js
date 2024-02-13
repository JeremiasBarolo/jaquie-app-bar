require('dotenv').config();
const path = require('path');
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");


// Configuración del servicio de correo electrónico
/*
const transporter = nodemailer.createTransport({
  /**
   * Para utilizar otro servicio de correo electrónico, como Yahoo o Outlook, debes cambiar
   * el valor de la propiedad service y ajustar la configuración de autenticación correspondiente.
   **
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
 });
*/

// Configuración del servicio de correo MailTrap
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
});

const handlebarsOptions = {
  viewEngine: {
    extname: ".hbs", // extension de los templates
    partialsDir: path.resolve('./src/views'), // ubicación de handlebars templates
    defaultLayout: false, 
  },
  viewPath: path.resolve('./src/views'),
  extName: ".hbs",
};

transporter.use("compile", hbs( handlebarsOptions ));

// Envía el correo electrónico
const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Correo electrónico enviado: " + info.response);
    }
  });
}

// verify nodemailer connection configuration
const verifyMailerConn = () => {
  transporter.verify((error, success) => {
    if (error) {
    console.log(error);
    } else {
    console.log("Server is ready to take our messages", success);
    }
  });
}


module.exports = { sendEmail, verifyMailerConn };