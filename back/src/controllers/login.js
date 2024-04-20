const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
    }

    const usuario = await models.usuarios.findOne({ where: { username: username.trim().toLowerCase() } });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ username: username, userId: usuario.id, rol: usuario.rol }, process.env.SECRET, { expiresIn: '5h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { login };
