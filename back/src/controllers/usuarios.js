

const { usuariosService } = require("../services");


const listAllusuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.listAllusuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneusuarios = async (req, res) => {
  try {
    const id = req.params.usuarios_id;
    const usuarios = await usuariosService.listOneusuarios(id);
    res.json(usuarios);

  } catch (err) {
    res.status(500).json({ action: "listOneusuarios", error: err.message });
  }

};

const createusuarios = async (req, res) => {

  try {
    const newusuarios = await usuariosService.createusuarios(req.body);

    res.json(newusuarios);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create usuarios.' });
  }
};

const updateusuarios = async (req, res) => {

  try {
    const usuariosUpdate = await usuariosService.updateusuarios(req.params.usuarios_id, req.body);
    res.json(usuariosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateusuarios', error: err.message });
  }
};

const deleteusuarios = async (req, res) => {
  const id = req.params.usuarios_id;
  try {
    await usuariosService.deleteusuarios(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteusuarios', error: err.message });
  }
};



module.exports = {
  listAllusuarios, listOneusuarios, createusuarios, updateusuarios, deleteusuarios, 
};
