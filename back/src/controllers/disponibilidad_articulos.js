

const { disponibilidad_articulosService } = require("../services");


const listAlldisponibilidad_articulos = async (req, res) => {
  try {
    const disponibilidad_articulos = await disponibilidad_articulosService.listAlldisponibilidad_articulos();
    res.json(disponibilidad_articulos);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnedisponibilidad_articulos = async (req, res) => {
  try {
    const id = req.params.disponibilidad_articulos_id;
    const disponibilidad_articulos = await disponibilidad_articulosService.listOnedisponibilidad_articulos(id);
    res.json(disponibilidad_articulos);

  } catch (err) {
    res.status(500).json({ action: "listOnedisponibilidad_articulos", error: err.message });
  }

};

const createdisponibilidad_articulos = async (req, res) => {

  try {
    const newdisponibilidad_articulos = await disponibilidad_articulosService.createdisponibilidad_articulos(req.body);

    res.json(newdisponibilidad_articulos);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create disponibilidad_articulos.' });
  }
};

const updatedisponibilidad_articulos = async (req, res) => {

  try {
    const disponibilidad_articulosUpdate = await disponibilidad_articulosService.updatedisponibilidad_articulos(req.params.disponibilidad_articulos_id, req.body);
    res.json(disponibilidad_articulosUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatedisponibilidad_articulos', error: err.message });
  }
};

const deletedisponibilidad_articulos = async (req, res) => {
  const id = req.params.disponibilidad_articulos_id;
  try {
    await disponibilidad_articulosService.deletedisponibilidad_articulos(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletedisponibilidad_articulos', error: err.message });
  }
};



module.exports = {
  listAlldisponibilidad_articulos, listOnedisponibilidad_articulos, createdisponibilidad_articulos, updatedisponibilidad_articulos, deletedisponibilidad_articulos, 
};
