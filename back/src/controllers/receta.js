

const { recetaService } = require("../services");


const listAllreceta = async (req, res) => {
  try {
    const receta = await recetaService.listAllreceta();
    res.json(receta);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnereceta = async (req, res) => {
  try {
    const id = req.params.receta_id;
    const receta = await recetaService.listOnereceta(id);
    res.json(receta);

  } catch (err) {
    res.status(500).json({ action: "listOnereceta", error: err.message });
  }

};

const createreceta = async (req, res) => {

  try {
    const newreceta = await recetaService.createreceta(req.body);

    res.json(newreceta);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create receta.' });
  }
};

const updatereceta = async (req, res) => {

  try {
    const recetaUpdate = await recetaService.updatereceta(req.params.receta_id, req.body);
    res.json(recetaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatereceta', error: err.message });
  }
};

const deletereceta = async (req, res) => {
  const id = req.params.receta_id;
  try {
    await recetaService.deletereceta(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletereceta', error: err.message });
  }
};



module.exports = {
  listAllreceta, listOnereceta, createreceta, updatereceta, deletereceta, 
};
