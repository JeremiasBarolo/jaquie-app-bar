

const { pedido_stockService } = require("../services");


const listAllpedido_stock = async (req, res) => {
  try {
    const pedido_stock = await pedido_stockService.listAllpedido_stock();
    res.json(pedido_stock);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnepedido_stock = async (req, res) => {
  try {
    const id = req.params.pedido_stock_id;
    const pedido_stock = await pedido_stockService.listOnepedido_stock(id);
    res.json(pedido_stock);

  } catch (err) {
    res.status(500).json({ action: "listOnepedido_stock", error: err.message });
  }

};

const createpedido_stock = async (req, res) => {

  try {
    const newpedido_stock = await pedido_stockService.createpedido_stock(req.body);

    res.json(newpedido_stock);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create pedido_stock.' });
  }
};

const updatepedido_stock = async (req, res) => {

  try {
    const pedido_stockUpdate = await pedido_stockService.updatepedido_stock(req.params.pedido_stock_id, req.body);
    res.json(pedido_stockUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatepedido_stock', error: err.message });
  }
};

const deletepedido_stock = async (req, res) => {
  const id = req.params.pedido_stock_id;
  try {
    await pedido_stockService.deletepedido_stock(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletepedido_stock', error: err.message });
  }
};



module.exports = {
  listAllpedido_stock, listOnepedido_stock, createpedido_stock, updatepedido_stock, deletepedido_stock, 
};
