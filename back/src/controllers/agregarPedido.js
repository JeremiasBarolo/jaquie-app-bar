var models = require('../models');
const {listOnemaestro_articulos} = require('../providers/maestro_articulos');
const {traerComponentesDeBebida} = require('../providers/pedido_produccion');
const {listOnedisponibilidad_articulos} = require('../providers/disponibilidad_articulos');
const { where } = require('sequelize');



const agregarPedido = async (req, res) => {

    let insumos_recorridos = [];
    

  try {

    let {estado, insumos, mesa} = req.body
    
    for(const insumo of insumos){

        await models.pedido_produccion.create({
            maestroId: insumo.id,
            cant_requerida: insumo.cantidad,
            ventaId: mesa,
            estado: 'PENDIENTE'
        });

        
        

        const maestro = await listOnemaestro_articulos(insumo.id);


        if (maestro.tipo_articulo.description === "Productos Elaborados") {
            await Promise.all(maestro.receta.map(async receta => {
                const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                if (!existente) {
                    insumos_recorridos.push({
                        id: disponibilidad.id,
                        cant_necesaria: receta.cant_necesaria * insumo.cantidad
                    });
                } else {
                    existente.cant_necesaria += insumo.cantidad * insumo.cantidad
                }
            }));

        }else if(maestro.tipo_articulo.description === "Bebidas"){
           
                const maestroReal = await models.Bebidas.findOne({
                    where: {nombre: insumo.id}
                });
                
                let componentes = await traerComponentesDeBebida(maestroReal)

                await Promise.all(componentes.map(async receta => {

                    let disponibilidad = await models.disponibilidad_articulos.findOne({
                        where:  { articuloId: receta.componente }
                    })

                    //  <=================== calculamos cantidad exacta ======================>
                    let alto = maestroReal.cantidadTotalRecipiente * receta.cantidad
                    let total = alto / 100

                    let cant_principal_exacta = total / 1000 

                    const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
                    if (!existente) {
                        insumos_recorridos.push({
                            id: disponibilidad.id,
                            cant_necesaria: cant_principal_exacta * insumo.cantidad,
                        });
                    } else {
                        existente.cant_necesaria += cant_principal_exacta * insumo.cantidad;
                    }

                    

                }));

                

            
        } else {
            const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
            const existente = insumos_recorridos.find(item => item.id === disponibilidad.id);
            if (!existente) {
                insumos_recorridos.push({
                    id: disponibilidad.id,
                    cant_necesaria: insumo.cantidad,
                });
            } else {
                existente.cant_necesaria += insumo.cantidad;
            }
        }
    }

    
    await Promise.all(insumos_recorridos.map(async (receta) => {
        let disponibilidad = await listOnedisponibilidad_articulos(receta.id);
        await disponibilidad.update({
            cant_fisica: disponibilidad.cant_fisica,
            cant_disponible: disponibilidad.cant_disponible - receta.cant_necesaria,
            cant_comprometida: disponibilidad.cant_comprometida + receta.cant_necesaria,
        });
        
    }));
    

    return res.status(200).json({message: 'Pedido Actualizado'})
    
  } catch (err) {
    res.status(500).json({ action: 'agregarPedido', error: err.message });
  }
};


const traerPedidos = async (req, res) => {

    try {
        const pedidos = await models.pedido_produccion.findAll({
            where: {
                ventaId: req.params.id
            
            },
            attributes: ['id', 'cant_requerida', 'estado'],
            include: [
                {
                    model: models.maestro_articulos,
                    
                }
            ]

        });

        
            const pedidosFormateados = await Promise.all(pedidos.map(async (pedido) => {
                return {
                id: pedido.id,
                name: pedido.maestro_articulo.descripcion,
                costo_unitario: pedido.maestro_articulo.costo_unitario,
                cant_requerida: pedido.cant_requerida,
                estado: pedido.estado
                };
            }));
        res.status(200).json(pedidosFormateados);
    } catch (err) {
        res.status(500).json({ action: 'traerPedidos', error: err.message });
    }
}

const devolverPedido = async (req, res) => {
    try {
        const pedido = await models.pedido_produccion.findOne({where:{id:req.params.id}});

        const maestro = await listOnemaestro_articulos(pedido.maestroId);
        
        if (maestro.tipo_articulo.description === "Productos Elaborados") {
            await Promise.all(maestro.receta.map(async receta => {
                const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                let cant_exacta = receta.cant_necesaria * pedido.cant_requerida
                await disponibilidad.update({
                        id: disponibilidad.id,
                        cant_disponible: disponibilidad.cant_disponible + cant_exacta,
                        cant_comprometida: disponibilidad.cant_comprometida - cant_exacta,
                        cant_fisica: disponibilidad.cant_fisica,
                    });
                
                
            }));

        }else if(maestro.tipo_articulo.description === "Bebidas"){
           
                const maestroReal = await models.Bebidas.findOne({
                    where: {nombre: maestro.id}
                });
                
                let componentes = await traerComponentesDeBebida(maestroReal)

                await Promise.all(componentes.map(async receta => {

                    let disponibilidad = await models.disponibilidad_articulos.findOne({
                        where:  { articuloId: receta.componente }
                    })

                    //  <=================== calculamos cantidad exacta ======================>
                    let alto = maestroReal.cantidadTotalRecipiente * receta.cantidad
                    let total = alto / 100

                    let cant_principal_exacta = total / 1000 

                    await disponibilidad.update({
                        
                        cant_disponible: disponibilidad.cant_disponible + cant_principal_exacta,
                        cant_comprometida: disponibilidad.cant_comprometida - cant_principal_exacta,
                        cant_fisica: disponibilidad.cant_fisica,
                    })

                    

                }));

                

            
        } else {
            const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
            await disponibilidad.update({
                id: disponibilidad.id,
                cant_disponible: disponibilidad.cant_disponible + pedido.cant_requerida,
                cant_comprometida: disponibilidad.cant_comprometida - pedido.cant_requerida,
                cant_fisica: disponibilidad.cant_fisica,
            });
            
            
        }


        await models.pedido_produccion.destroy({
            where:{ id: req.params.id, maestroId: pedido.maestroId, ventaId: pedido.ventaId, estado: 'PENDIENTE'}
        });
  
        res.status(200).json({message: 'Ingredientes devueltos de manera correcta.'});
    } catch (err) {
        res.status(500).json({ action: 'traerPedidos', error: err.message });
    }
}

const sumarPedido = async (req, res) => {

    try {
        const pedido = await models.pedido_produccion.findOne({where:{id:req.params.id}});

        const maestro = await listOnemaestro_articulos(pedido.maestroId);
        
        if (maestro.tipo_articulo.description === "Productos Elaborados") {
            await Promise.all(maestro.receta.map(async receta => {
                const disponibilidad = await listOnedisponibilidad_articulos(receta.disponibilidad_articulo.id);
                let cant_exacta = receta.cant_necesaria * pedido.cant_requerida
                await disponibilidad.update({
                        id: disponibilidad.id,
                        cant_fisica: disponibilidad.cant_fisica - cant_exacta,
                    });
                
                
            }));

        }else if(maestro.tipo_articulo.description === "Bebidas"){
           
                const maestroReal = await models.Bebidas.findOne({
                    where: {nombre: maestro.id}
                });
                
                let componentes = await traerComponentesDeBebida(maestroReal)

                await Promise.all(componentes.map(async receta => {

                    let disponibilidad = await models.disponibilidad_articulos.findOne({
                        where:  { articuloId: receta.componente }
                    })

                    //  <=================== calculamos cantidad exacta ======================>
                    let alto = maestroReal.cantidadTotalRecipiente * receta.cantidad
                    let total = alto / 100

                    let cant_principal_exacta = total / 1000 

                    await disponibilidad.update({
                        cant_fisica: disponibilidad.cant_fisica - (cant_principal_exacta * pedido.cant_requerida)
                    })

                    

                }));

                

            
        } else {
            const disponibilidad = await models.disponibilidad_articulos.findOne({ where: { articuloId: maestro.id } });
            await disponibilidad.update({
                cant_fisica: disponibilidad.cant_fisica - pedido.cant_requerida,
            });
            
            
        }


        let existente = await models.pedido_produccion.findOne({ where: { maestroId: pedido.maestroId, ventaId: pedido.ventaId, estado: 'FINALIZADO' } });
        if(existente){
            await existente.update({
                cant_requerida: existente.cant_requerida + pedido.cant_requerida,
            });
            await models.pedido_produccion.destroy({
                where:{ id: req.params.id, maestroId: pedido.maestroId, ventaId: pedido.ventaId, estado: 'PENDIENTE'}
            });
            
        }else{
            await pedido.update({
                estado: "FINALIZADO",
            });
        }
        
  
        return res.status(200).json({message: 'Pedido Actualizado'});
    } catch (err) {
        res.status(500).json({ action: 'sumarPedido', error: err.message }); 
    }
}





module.exports = {
    agregarPedido, traerPedidos, devolverPedido, sumarPedido
};
