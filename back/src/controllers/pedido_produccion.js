

const { pedido_produccionService } = require("../services");


const listAllpedido_produccion = async (req, res) => {
  try {
    const pedido_produccion = await pedido_produccionService.listAllpedido_produccion();
    res.json(pedido_produccion);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnepedido_produccion = async (req, res) => {
  try {
    const id = req.params.pedido_produccion_id;
    const pedido_produccion = await pedido_produccionService.listOnepedido_produccion(id);
    res.json(pedido_produccion);

  } catch (err) {
    res.status(500).json({ action: "listOnepedido_produccion", error: err.message });
  }

};

const createpedido_produccion = async (req, res) => {

  try {
    const newpedido_produccion = await pedido_produccionService.createpedido_produccion(req.body);

    res.json(newpedido_produccion);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create pedido_produccion.' });
  }
};

const updatepedido_produccion = async (req, res) => {

  try {
    const pedido_produccionUpdate = await pedido_produccionService.updatepedido_produccion(req.params.pedido_produccion_id, req.body);
    res.json(pedido_produccionUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatepedido_produccion', error: err.message });
  }
};

const deletepedido_produccion = async (req, res) => {
  const id = req.params.pedido_produccion_id;
  try {
    await pedido_produccionService.deletepedido_produccion(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletepedido_produccion', error: err.message });
  }
};



module.exports = {
  listAllpedido_produccion, listOnepedido_produccion, createpedido_produccion, updatepedido_produccion, deletepedido_produccion, 
};
