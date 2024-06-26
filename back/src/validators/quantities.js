const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');
const models = require('../models');
const { listOnedisponibilidad_articulos } = require('../providers/disponibilidad_articulos');




// Validador para el pedido
const pedidoValidator = [
    check('insumos')
        .exists()
        .not()
        .isEmpty()
        .isArray()
        .custom(async (insumos, { req, res }) => {
            const errors = [];
            let pedidos_revisados_reales = [];
            let componentes= []


            for (const insumo of insumos) {
                if (insumo.cantidad <= 0) {
                    errors.push(`La cantidad debe ser mayor a 0.`);
                    continue;
                }


                try {
                    const producto = await models.maestro_articulos.findByPk(insumo.id, {
                        include: { all: true },
                    });

                    if (producto) {
                        if (producto.tipo_articulo.description === "Productos Elaborados") {
                            
                            await Promise.all(producto.receta.map(async receta => {
                                const disponibilidad = await listOnedisponibilidad_articulos(receta.articuloId);
                                await copia_seguridad(pedidos_revisados_reales, disponibilidad);

                                if (disponibilidad.cant_disponible < (receta.cant_necesaria * insumo.cantidad)) {
                                    errors.push(`No hay suficiente stock de ${disponibilidad.maestro_articulo.descripcion} para crear ${producto.descripcion}.`);
                                } else {
                                    await disponibilidad.update({
                                        cant_comprometida: disponibilidad.cant_comprometida + (receta.cant_necesaria * insumo.cantidad),
                                        cant_disponible: disponibilidad.cant_disponible - (receta.cant_necesaria * insumo.cantidad),
                                        cant_fisica: disponibilidad.cant_fisica - (receta.cant_necesaria * insumo.cantidad),
                                    });
                                }
                            }));
                        } else if(producto.tipo_articulo.description !== 'Bebidas') {
                            await copia_seguridad(pedidos_revisados_reales, producto.disponibilidad_articulo);
                            
                            let disponibilidad = producto.disponibilidad_articulo

                            

                            if (disponibilidad.cant_disponible < insumo.cantidad) {
                                errors.push(`No hay suficiente stock de ${producto.descripcion}.`);
                            } else {
                                await disponibilidad.update({
                                    cant_comprometida: disponibilidad.cant_comprometida + insumo.cantidad,
                                    cant_disponible: disponibilidad.cant_disponible - insumo.cantidad,
                                    cant_fisica: disponibilidad.cant_fisica - insumo.cantidad,
                                });
                            }
                        }else{
                            let bebida = await models.Bebidas.findOne({
                                where:  { nombre: producto.id }
                            })

                            if(bebida === null){
                                errors.push('Una bebida no tiene consigo su receta');
                                break
                            }

                            
                            
                            for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
                              if (bebida[key] !== null && bebida[`${key}Cantidad`] !== null) {
                                componentes.push({
                                  componente: bebida[key],
                                  cantidad: bebida[`${key}Cantidad`]
                                });
                              }
                            }

                            await Promise.all(componentes.map(async receta => {

                                let disponibilidad = await models.disponibilidad_articulos.findOne({
                                    where:  { articuloId: receta.componente }
                                })

                                //  <=================== calculamos cantidad exacta ======================>
                                let alto = bebida.cantidadTotalRecipiente * receta.cantidad
                                let total = alto / 100

                                let cant_principal_exacta = total / 1000

                                await copia_seguridad(pedidos_revisados_reales, disponibilidad)

                                if (disponibilidad.cant_disponible < insumo.cantidad) {
                                    errors.push(`No hay suficiente stock de ${producto.descripcion}.`);
                                } else {
                                    await disponibilidad.update({
                                        cant_comprometida: disponibilidad.cant_comprometida + cant_principal_exacta,
                                        cant_disponible: disponibilidad.cant_disponible - cant_principal_exacta,
                                        cant_fisica: disponibilidad.cant_fisica - cant_principal_exacta,
                                    });
                                }



                            }));
                        }
                    } else {
                        errors.push(`El insumo con ID ${insumo.id} no existe.`);
                    }
                } catch (error) {
                    errors.push(`Error al procesar el insumo con ID ${insumo.id}: ${error.message}`);
                }
            }

            if (errors.length > 0) {
                // Si hay errores, restaurar los datos
                await restaurar(pedidos_revisados_reales);
                throw new Error(errors.join(', '));
            }
            await restaurar(pedidos_revisados_reales);
            return true;
        }),
    validateResult
];

module.exports = pedidoValidator;


const copia_seguridad = async (pedidos_revisados, disponibilidad) => {
    if (disponibilidad && disponibilidad.id) { 
        const existente = pedidos_revisados.find(item => item.id === disponibilidad.id);
        if (!existente) {
            pedidos_revisados.push({
                id: disponibilidad.id,
                cant_fisica: disponibilidad.cant_fisica,
                cant_disponible: disponibilidad.cant_disponible,
                cant_comprometida: disponibilidad.cant_comprometida,
            });
        }
    } else {
        console.error("El objeto de disponibilidad es nulo o no tiene la propiedad 'id'.");
    }
};


// Función para restaurar los datos en caso de errores
const restaurar = async (pedidos_revisados) => {
    for (const pedido_revisado of pedidos_revisados) {
        const disponibilidad = await models.disponibilidad_articulos.findByPk(pedido_revisado.id);
        if (disponibilidad) {
            await disponibilidad.update({
                cant_fisica: pedido_revisado.cant_fisica,
                cant_disponible: pedido_revisado.cant_disponible,
                cant_comprometida: pedido_revisado.cant_comprometida,
            });
        }
    }
};
