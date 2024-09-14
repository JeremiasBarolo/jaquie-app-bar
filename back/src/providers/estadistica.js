

    var models = require('../models');
    const {listAllmaestro_articulos} = require('./maestro_articulos');
    const {traerStockBebidas} = require('./Bebidas');
    const {listAlldisponibilidad_articulos} = require('./disponibilidad_articulos');

    const listAllestadistica= async () => {
    try {
        const estadistica = await models.estadistica.findAll({
            include: [
                {all:true}
            ]
        });
        console.log('✅ estadistica were found');
        return estadistica.map(estadistica => ({
            id: estadistica.id,
            totalArticulo: estadistica.totalArticulo,
            profit: estadistica.profit,
            recaudacion: estadistica.recaudacion,
            costo_total: estadistica.costo_total,
            mejorArticuloId: estadistica.mejorArticuloId,
            MejorArticulo: estadistica.mejorArticulo.descripcion,
            createdAt: estadistica.createdAt,
            updatedAt: estadistica.updatedAt
          }))
    } catch (err) {
        console.error('🛑 Error when fetching estadistica', err);
        throw err;
    }
    };


    const calcularCantidadMaximaProductoElaborado = async (productoElaborado) => {
        let cantidadMaxima = Infinity;
        for (const receta of productoElaborado.receta) {
            const disponibilidad = receta.disponibilidad_articulo;
            if (disponibilidad && disponibilidad.cant_disponible !== null) {
                const cantidadNecesaria = receta.cant_necesaria;
                const cantidadDisponible = disponibilidad.cant_disponible;
                const cantidadPosible = Math.floor(cantidadDisponible / cantidadNecesaria);
                cantidadMaxima = Math.min(cantidadMaxima, cantidadPosible);
            } else {
                cantidadMaxima = 0;
                break;
            }
        }
        return cantidadMaxima;
    };

    const calcularComidas = async (comidas) => {
        return comidas.map((element) => {
            return {
                id: element.maestro_articulo.id,
                name: element.maestro_articulo.descripcion,
                cantidadMaxima: element.cant_disponible,
                cantidad:1,
                tipo: 'Comida'
            };
        });
    };
    
    const listDisponibilidad = async () => {
        try {
            let maestro = await listAllmaestro_articulos();
            let disponibilidad = await listAlldisponibilidad_articulos()
            let Comidas = disponibilidad.filter(maestro => maestro.maestro_articulo.tipoId == 2); 
            let productosElaborados = maestro.filter(maestro => maestro.tipoId == 4); // Para productos elaborados
            let Bebidas = await traerStockBebidas(); 
            console.log(Bebidas);
    
            
            productosElaborados = await Promise.all(
                productosElaborados.map(async producto => {
                    return {
                        id: producto.id,
                        name: producto.descripcion,
                        cantidad:1,
                        tipo: 'Bebida',
                        cantidadMaxima: await calcularCantidadMaximaProductoElaborado(producto)
                    };
                })
            );
    
            
            Comidas = await calcularComidas(Comidas);
            
            
            let disponibilidadTotal= [...Comidas, ...productosElaborados]

            Bebidas.forEach(bebida => {
                disponibilidadTotal.push({
                    id: bebida.id,
                    name: bebida.name,
                    cantidad:1,
                    cantidadMaxima: bebida.cantidadMaxima,
                    tipo: 'Bebida'
                });
            });

            

            
            return disponibilidadTotal
    
        } catch (err) {
            console.error('🛑 Error when fetching disponibilidad', err);
            throw err;
        }
    };
    

    const listOneestadistica= async (estadistica_id) => {
    try {
        const oneestadistica= await models.estadistica.findByPk(estadistica_id,{ 
            include: [
                {all:true}
            ]
        
        });
        if (!oneestadistica) {
        
        return null;
        }
        return {
            id: oneestadistica.id,
            totalArticulo: oneestadistica.totalArticulo,
            profit: oneestadistica.profit,
            recaudacion: oneestadistica.recaudacion,
            costo_total: oneestadistica.costo_total,
            mejorArticuloId: oneestadistica.mejorArticuloId,
            MejorArticulo: oneestadistica.mejorArticulo.descripcion,
            createdAt: oneestadistica.createdAt,
            updatedAt: oneestadistica.updatedAt
        };
    } catch (err) {
        
        throw err;
    }
    };

    const createestadistica= async (Dataestadistica) => {
    

    try {
        
        const newestadistica= await models.estadistica.create(Dataestadistica);
        
        return newestadistica;
        
    } catch (err) {
        console.error('🛑 Error when creating estadistica', err);
        throw err;
    }
    };

    const updateestadistica= async (estadistica_id, dataUpdated) => {
    

    try {

        const oldestadistica= await models.estadistica.findByPk(estadistica_id);
        
        let newestadistica = await oldestadistica.update(dataUpdated);

        return newestadistica;
    } catch (err) {
        console.error('🛑 Error when updating estadistica', err);
        throw err;
    }
    
    };


    const deleteestadistica = async (estadistica_id) => {
    try {
        const deletedestadistica = await models.estadistica.findByPk(estadistica_id, 
        );

        if (!deletedestadistica) {
        return null;
        }
        
        await models.estadistica.destroy({ where: { id: estadistica_id } });


        return deletedestadistica;
    } catch (err) {
        console.error('🛑 Error when deleting estadistica', err);
        throw err;
    }
    };


    const generarEstadisticasAleatorias = async (Dataestadistica) => {
        try {
            

            await models.estadistica.destroy({ where: {} });
    
            if(!Dataestadistica.tirarDatos){
                for (let i = 0; i < 365; i++) {
                    // Genera valores aleatorios para costo, recaudación y profit
                    const costo = Math.floor(Math.random() * 100000);
                    const recaudacion = Math.floor(Math.random() * 200000) + costo; 
                    const profit = recaudacion - costo;
        
                    // Inserta un nuevo registro en la tabla estadistica
                    await models.estadistica.create({
                        costo_total: costo,
                        recaudacion: recaudacion,
                        profit: profit,
                        
                        createdAt: new Date(new Date().getTime() - i * 24 * 60 * 60 * 1000),
                        updatedAt: new Date() 
                    });
                }
            }
            
        } catch (err) {
            
            console.error('🛑 Error al crear estadisticas:', err);
            throw err;
        }
    };
    


    module.exports = {
    listAllestadistica, listOneestadistica, createestadistica, updateestadistica, deleteestadistica, generarEstadisticasAleatorias, listDisponibilidad
    };

