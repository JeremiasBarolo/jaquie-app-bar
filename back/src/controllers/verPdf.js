
const { where } = require('sequelize');
var models = require('../models');



const listAll = async (req, res) => {
  try {
    const id = req.params.id;

    const venta = await models.ProductosDelDia.findAll({
        where:{
            estadisticaId: id
        },
        include: [{
            all:true
        }],
        
    });

    let data = venta.map(estadistica => ({
      id: estadistica.id,
      articulo: estadistica.maestro_articulo.descripcion,
      articuloId: estadistica.maestro_articulo.id,
      Articulo: estadistica.maestro_articulo,
      cantidad: estadistica.cantidad,
      precio: estadistica.maestro_articulo.costo_unitario,
      createdAt: estadistica.createdAt,
      updatedAt: estadistica.updatedAt
    }))

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ action: "listAll", error: err.message });
  }
};




module.exports = {
  listAll
};
