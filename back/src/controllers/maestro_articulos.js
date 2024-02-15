

const { maestro_articulosService } = require("../services");


const listAllmaestro_articulos = async (req, res) => {
  try {
    const maestro_articulos = await maestro_articulosService.listAllmaestro_articulos();
    res.json(maestro_articulos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnemaestro_articulos = async (req, res) => {
  try {
    const id = req.params.maestro_articulos_id;
    const maestro_articulos = await maestro_articulosService.listOnemaestro_articulos(id);
    res.json(maestro_articulos);

  } catch (err) {
    res.status(500).json({ action: "listOnemaestro_articulos", error: err.message });
  }

};

const createmaestro_articulos = async (req, res) => {

  try {
    const newmaestro_articulos = await maestro_articulosService.createmaestro_articulos(req.body);

    res.json(newmaestro_articulos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create maestro_articulos.' });
  }
};

const updatemaestro_articulos = async (req, res) => {

  try {
    const maestro_articulosUpdate = await maestro_articulosService.updatemaestro_articulos(req.params.maestro_articulos_id, req.body);
    res.json(maestro_articulosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatemaestro_articulos', error: err.message });
  }
};

const deletemaestro_articulos = async (req, res) => {
  const id = req.params.maestro_articulos_id;
  try {
    await maestro_articulosService.deletemaestro_articulos(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletemaestro_articulos', error: err.message });
  }
};



module.exports = {
  listAllmaestro_articulos, listOnemaestro_articulos, createmaestro_articulos, updatemaestro_articulos, deletemaestro_articulos, 
};
