

const { BebidasService } = require("../services");


const listAllBebidas = async (req, res) => {
  try {
    const Bebidas = await BebidasService.listAllBebidas();
    res.json(Bebidas);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneBebidas = async (req, res) => {
  try {
    const id = req.params.Bebidas_id;
    const Bebidas = await BebidasService.listOneBebidas(id);
    res.json(Bebidas);

  } catch (err) {
    res.status(500).json({ action: "listOneBebidas", error: err.message });
  }

};

const createBebidas = async (req, res) => {

  try {
    const newBebidas = await BebidasService.createBebidas(req.body);

    res.json(newBebidas);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create Bebidas.' });
  }
};

const updateBebidas = async (req, res) => {

  try {
    const BebidasUpdate = await BebidasService.updateBebidas(req.params.Bebidas_id, req.body);
    res.json(BebidasUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateBebidas', error: err.message });
  }
};

const deleteBebidas = async (req, res) => {
  const id = req.params.Bebidas_id;
  try {
    await BebidasService.deleteBebidas(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteBebidas', error: err.message });
  }
};



module.exports = {
  listAllBebidas, listOneBebidas, createBebidas, updateBebidas, deleteBebidas, 
};
