

const { TipoFormaPagosService } = require("../services");


const listAllTipoFormaPagos = async (req, res) => {
  try {
    const TipoFormaPagos = await TipoFormaPagosService.listAllTipoFormaPagos();
    res.json(TipoFormaPagos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneTipoFormaPagos = async (req, res) => {
  try {
    const id = req.params.TipoFormaPagos_id;
    const TipoFormaPagos = await TipoFormaPagosService.listOneTipoFormaPagos(id);
    res.json(TipoFormaPagos);

  } catch (err) {
    res.status(500).json({ action: "listOneTipoFormaPagos", error: err.message });
  }

};

const createTipoFormaPagos = async (req, res) => {

  try {
    const newTipoFormaPagos = await TipoFormaPagosService.createTipoFormaPagos(req.body);

    res.json(newTipoFormaPagos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create TipoFormaPagos.' });
  }
};

const updateTipoFormaPagos = async (req, res) => {

  try {
    const TipoFormaPagosUpdate = await TipoFormaPagosService.updateTipoFormaPagos(req.params.TipoFormaPagos_id, req.body);
    res.json(TipoFormaPagosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateTipoFormaPagos', error: err.message });
  }
};

const deleteTipoFormaPagos = async (req, res) => {
  const id = req.params.TipoFormaPagos_id;
  try {
    await TipoFormaPagosService.deleteTipoFormaPagos(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteTipoFormaPagos', error: err.message });
  }
};



module.exports = {
  listAllTipoFormaPagos, listOneTipoFormaPagos, createTipoFormaPagos, updateTipoFormaPagos, deleteTipoFormaPagos, 
};
