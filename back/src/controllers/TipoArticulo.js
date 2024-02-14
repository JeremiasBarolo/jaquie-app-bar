

const { TipoArticuloService } = require("../services");


const listAllTipoArticulo = async (req, res) => {
  try {
    const TipoArticulo = await TipoArticuloService.listAllTipoArticulo();
    res.json(TipoArticulo);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneTipoArticulo = async (req, res) => {
  try {
    const id = req.params.TipoArticulo_id;
    const TipoArticulo = await TipoArticuloService.listOneTipoArticulo(id);
    res.json(TipoArticulo);

  } catch (err) {
    res.status(500).json({ action: "listOneTipoArticulo", error: err.message });
  }

};

const createTipoArticulo = async (req, res) => {

  try {
    const newTipoArticulo = await TipoArticuloService.createTipoArticulo(req.body);

    res.json(newTipoArticulo);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create TipoArticulo.' });
  }
};

const updateTipoArticulo = async (req, res) => {

  try {
    const TipoArticuloUpdate = await TipoArticuloService.updateTipoArticulo(req.params.TipoArticulo_id, req.body);
    res.json(TipoArticuloUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateTipoArticulo', error: err.message });
  }
};

const deleteTipoArticulo = async (req, res) => {
  const id = req.params.TipoArticulo_id;
  try {
    await TipoArticuloService.deleteTipoArticulo(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteTipoArticulo', error: err.message });
  }
};



module.exports = {
  listAllTipoArticulo, listOneTipoArticulo, createTipoArticulo, updateTipoArticulo, deleteTipoArticulo, 
};
