

const { ventaService } = require("../services");


const listAllventa = async (req, res) => {
  try {
    const venta = await ventaService.listAllventa();
    res.json(venta);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneventa = async (req, res) => {
  try {
    const id = req.params.venta_id;
    const venta = await ventaService.listOneventa(id);
    res.json(venta);

  } catch (err) {
    res.status(500).json({ action: "listOneventa", error: err.message });
  }

};

const createventa = async (req, res) => {

  try {
    const newventa = await ventaService.createventa(req.body);

    res.json(newventa);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create venta.' });
  }
};

const updateventa = async (req, res) => {

  try {
    const ventaUpdate = await ventaService.updateventa(req.params.venta_id, req.body);
    res.json(ventaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateventa', error: err.message });
  }
};

const deleteventa = async (req, res) => {
  const id = req.params.venta_id;
  try {
    await ventaService.deleteventa(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteventa', error: err.message });
  }
};



module.exports = {
  listAllventa, listOneventa, createventa, updateventa, deleteventa, 
};
