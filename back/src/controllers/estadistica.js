

const { estadisticaService } = require("../services");
const moment = require('moment');


const listAllestadistica = async (req, res) => {
  try {
    let estadistica = await estadisticaService.listAllestadistica();
    
    await formattedStats(estadistica)
    

    res.json(estadistica);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneestadistica = async (req, res) => {
  try {
    const id = req.params.estadistica_id;
    let estadistica = await estadisticaService.listOneestadistica(id);
    formattedStats(estadistica)
    res.json(estadistica);
  } catch (err) {
    res.status(500).json({ action: "listOneestadistica", error: err.message });
  }
};
const createestadistica = async (req, res) => {

  try {
    const newestadistica = await estadisticaService.createestadistica(req.body);

    res.json(newestadistica);
  } catch (error) {
    res.status(500).json({ action: 'Unable to create estadistica.', error: error.message });
  }
};

const updateestadistica = async (req, res) => {

  try {
    const estadisticaUpdate = await estadisticaService.updateestadistica(req.params.estadistica_id, req.body);
    res.json(estadisticaUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateestadistica', error: err.message });
  }
};

const deleteestadistica = async (req, res) => {
  const id = req.params.estadistica_id;
  try {
    await estadisticaService.deleteestadistica(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteestadistica', error: err.message });
  }
};



module.exports = {
  listAllestadistica, listOneestadistica, createestadistica, updateestadistica, deleteestadistica, 
};

const formattedStats = async (stats) => {
  

  return stats.forEach(stat => ({
    id: stat.id,
    ganancia: stat.ganancia,
    recaudacionTotal: stat.recaudacionTotal,
    costo: stat.costo,
    createdAt: moment(stat.createdAt).format('DD-MM-YYYY'),
    updatedAt: moment(stat.updatedAt).format('DD-MM-YYYY')
  }));
}