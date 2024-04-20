

    const { where } = require('sequelize');
var models = require('../models');

    const listAllBebidas= async () => {
    try {
        const Bebidas = await models.Bebidas.findAll(
            {
                include: [
                    {
                        model: models.maestro_articulos,
                        as: 'NombreArticulo',
                        include: [
                            { model: models.tipo_articulo } 
                        ]
                    },
                    { model: models.maestro_articulos, as: 'PrimerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'SegundoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'TercerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'CuartoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'QuintoComponenteArticulo' },
                ],
               
            }
        );
        console.log('✅ Bebidas were found');
        return Bebidas;
    } catch (err) {
        console.error('🛑 Error when fetching Bebidas', err);
        throw err;
    }
    };

    const listOneBebidas= async (Bebidas_id) => {
    try {
        const oneBebidas= await models.Bebidas.findByPk(Bebidas_id, 
            {
                include: [
                    {
                        model: models.maestro_articulos,
                        as: 'NombreArticulo',
                        include: [
                            { model: models.tipo_articulo } 
                        ]
                    },
                    { model: models.maestro_articulos, as: 'PrimerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'SegundoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'TercerComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'CuartoComponenteArticulo' },
                    { model: models.maestro_articulos, as: 'QuintoComponenteArticulo' },
                ],
               
            }
        );
        if (!oneBebidas) {
        
        return null;
        }
        return oneBebidas;
    } catch (err) {
        
        throw err;
    }
    };

    const createBebidas= async (DataBebidas) => {
    

    try {

        

        const primerComponente = DataBebidas.insumos[0].id;
        const primerComponenteCantidad = DataBebidas.insumos[0].cantidad;
        const segundoComponente = DataBebidas.insumos[1].id;
        const segundoComponenteCantidad = DataBebidas.insumos[1].cantidad;
        const tercerComponente = DataBebidas.insumos[2] ? DataBebidas.insumos[2].id : null;
        const tercerComponenteCantidad = DataBebidas.insumos[2] ? DataBebidas.insumos[2].cantidad : null;
        const cuartoComponente = DataBebidas.insumos[3] ? DataBebidas.insumos[3].id : null;
        const cuartoComponenteCantidad = DataBebidas.insumos[3] ? DataBebidas.insumos[3].cantidad : null;
        const quintoComponente = DataBebidas.insumos[4] ? DataBebidas.insumos[4].id : null;
        const quintoComponenteCantidad = DataBebidas.insumos[4] ? DataBebidas.insumos[4].cantidad : null;

        const data = {
            nombre: DataBebidas.maestro,
            primerComponente: primerComponente,
            primerComponenteCantidad:primerComponenteCantidad,
            segundoComponente: segundoComponente,
            segundoComponenteCantidad:segundoComponenteCantidad,
            tercerComponente: tercerComponente,
            tercerComponenteCantidad: tercerComponenteCantidad,
            cuartoComponente: cuartoComponente,
            cuartoComponenteCantidad: cuartoComponenteCantidad,
            quintoComponente: quintoComponente,
            quintoComponenteCantidad: quintoComponenteCantidad,
            cantidadTotalRecipiente: DataBebidas.recipiente
            
        }

        
        const newBebidas= await models.Bebidas.create(data);
        
        return newBebidas;
        
    } catch (err) {
        console.error('🛑 Error when creating Bebidas', err);
        throw err;
    }
    };

    const updateBebidas= async (Bebidas_id, dataUpdated) => {
    

    try {
        const primerComponente = dataUpdated.insumos[0].id;
        const primerComponenteCantidad = dataUpdated.insumos[0].cantidad;
        const segundoComponente = dataUpdated.insumos[1].id;
        const segundoComponenteCantidad = dataUpdated.insumos[1].cantidad;
        const tercerComponente = dataUpdated.insumos[2] ? dataUpdated.insumos[2].id : null;
        const tercerComponenteCantidad = dataUpdated.insumos[2] ? dataUpdated.insumos[2].cantidad : null;
        const cuartoComponente = dataUpdated.insumos[3] ? dataUpdated.insumos[3].id : null;
        const cuartoComponenteCantidad = dataUpdated.insumos[3] ? dataUpdated.insumos[3].cantidad : null;
        const quintoComponente = dataUpdated.insumos[4] ? dataUpdated.insumos[4].id : null;
        const quintoComponenteCantidad = dataUpdated.insumos[4] ? dataUpdated.insumos[4].cantidad : null;

        const data = {
            nombre: dataUpdated.maestro,
            primerComponente: primerComponente,
            primerComponenteCantidad:primerComponenteCantidad,
            segundoComponente: segundoComponente,
            segundoComponenteCantidad:segundoComponenteCantidad,
            tercerComponente: tercerComponente,
            tercerComponenteCantidad: tercerComponenteCantidad,
            cuartoComponente: cuartoComponente,
            cuartoComponenteCantidad: cuartoComponenteCantidad,
            quintoComponente: quintoComponente,
            quintoComponenteCantidad: quintoComponenteCantidad,
            cantidadTotalRecipiente: dataUpdated.recipiente
            
        }

        const oldBebidas= await models.Bebidas.findByPk(Bebidas_id);
        
        let newBebidas = await oldBebidas.update(data);

        return newBebidas;
    } catch (err) {
        console.error('🛑 Error when updating Bebidas', err);
        throw err;
    }
    
    };


    const deleteBebidas = async (Bebidas_id) => {
    try {
        const deletedBebidas = await models.Bebidas.findByPk(Bebidas_id, 
        );

        if (!deletedBebidas) {
        return null;
        }
        
        await models.Bebidas.destroy({ where: { id: Bebidas_id } });


        return deletedBebidas;
    } catch (err) {
        console.error('🛑 Error when deleting Bebidas', err);
        throw err;
    }
    };

    const traerStockBebidas = async () => {
        try {
            const allBebidas = await listAllBebidas();
            const resultados = [];
            for (const bebida of allBebidas) {
                const componentes = await traerComponentesDeBebida(bebida);
                const cantidadExacta = await calcularCantidadExactaBebida(componentes);
                const nombre = await models.maestro_articulos.findByPk(bebida.nombre)
                let cantidadMaxima = Infinity;
                
                for (const item of cantidadExacta) {
                    const disponibilidad = await models.disponibilidad_articulos.findOne({
                        where: { articuloId: item.id },
                        include: [models.maestro_articulos]
                    });

                    if (disponibilidad) {
                        const cantidadPosible = Math.floor(disponibilidad.cant_disponible / item.cantidad);
                        cantidadMaxima = Math.min(cantidadMaxima, cantidadPosible);
                        
                    } else {
                        cantidadMaxima = 0;
                        break;
                    }
                }
                resultados.push({
                    name: nombre.descripcion,
                    cantidadMaxima: cantidadMaxima
                });
            }
            console.log('Disponibilidad de bebidas:', resultados);
            return resultados;
        } catch (err) {
            console.error('🛑 Error al traer el stock de bebidas:', err);
            throw err;
        }
    };




    const calcularCantidadExactaBebida = async (bebida) => {
        try {
            const cantidadExacta = bebida.map((receta) => {
                const alto = receta.cantidadMaxima * receta.cantidad;
                const total = alto / 100;
                const cant_principal = total / 1000;
                return {
                    id: receta.id,
                    cantidad: cant_principal,
                    cantidadMaxima: receta.cantidadMaxima,
                };
            });
            return cantidadExacta;
        } catch (err) {
            console.error('🛑 Error al calcular la cantidad exacta de bebida', err);
            throw err;
        }
    };
    
    const traerComponentesDeBebida = async (bebida) => {
        try {
            const componentes = [];
            for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
                if (bebida[key] !== null && bebida[`${key}Cantidad`] !== null) {
                    componentes.push({
                        id: bebida[key],
                        cantidad: bebida[`${key}Cantidad`],
                        cantidadMaxima: bebida.cantidadTotalRecipiente
                    });
                }
            }
            return componentes;
        } catch (err) {
            console.error('🛑 Error al traer los componentes de la bebida', err);
            throw err;
        }
    };


    module.exports = {
    listAllBebidas, listOneBebidas, createBebidas, updateBebidas, deleteBebidas, calcularCantidadExactaBebida, traerComponentesDeBebida,traerStockBebidas
    };

