

const { personasService } = require("../services");


const listAllpersonas = async (req, res) => {
  try {
    const personas = await personasService.listAllpersonas();
    res.json(personas);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOnepersonas = async (req, res) => {
  try {
    const id = req.params.personas_id;
    const personas = await personasService.listOnepersonas(id);
    res.json(personas);

  } catch (err) {
    res.status(500).json({ action: "listOnepersonas", error: err.message });
  }

};

const createpersonas = async (req, res) => {

  try {
    const newpersonas = await personasService.createpersonas(req.body);

    res.json(newpersonas);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create personas.' });
  }
};

const updatepersonas = async (req, res) => {

  try {
    const personasUpdate = await personasService.updatepersonas(req.params.personas_id, req.body);
    res.json(personasUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updatepersonas', error: err.message });
  }
};

const deletepersonas = async (req, res) => {
  const id = req.params.personas_id;
  try {
    await personasService.deletepersonas(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deletepersonas', error: err.message });
  }
};



module.exports = {
  listAllpersonas, listOnepersonas, createpersonas, updatepersonas, deletepersonas, 
};
