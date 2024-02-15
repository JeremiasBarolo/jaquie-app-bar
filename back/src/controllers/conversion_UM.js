

const { conversion_UMService } = require("../services");


const listAllconversion_UM = async (req, res) => {
  try {
    const conversion_UM = await conversion_UMService.listAllconversion_UM();
    res.json(conversion_UM);
  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};

const listOneconversion_UM = async (req, res) => {
  try {
    const id = req.params.conversion_UM_id;
    const conversion_UM = await conversion_UMService.listOneconversion_UM(id);
    res.json(conversion_UM);

  } catch (err) {
    res.status(500).json({ action: "listOneconversion_UM", error: err.message });
  }

};

const createconversion_UM = async (req, res) => {

  try {
    const newconversion_UM = await conversion_UMService.createconversion_UM(req.body);

    res.json(newconversion_UM);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create conversion_UM.' });
  }
};

const updateconversion_UM = async (req, res) => {

  try {
    const conversion_UMUpdate = await conversion_UMService.updateconversion_UM(req.params.conversion_UM_id, req.body);
    res.json(conversion_UMUpdate);
  } catch (err) {
    res.status(500).json({ action: 'updateconversion_UM', error: err.message });
  }
};

const deleteconversion_UM = async (req, res) => {
  const id = req.params.conversion_UM_id;
  try {
    await conversion_UMService.deleteconversion_UM(id);
    res.json('');
  } catch (err) {
    res.status(500).json({ action: 'deleteconversion_UM', error: err.message });
  }
};



module.exports = {
  listAllconversion_UM, listOneconversion_UM, createconversion_UM, updateconversion_UM, deleteconversion_UM, 
};
