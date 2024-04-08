

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
            cantidadTotalRecipiente: 1000
            
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

        const oldBebidas= await models.Bebidas.findByPk(Bebidas_id);
        
        let newBebidas = await oldBebidas.update(dataUpdated);

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


    module.exports = {
    listAllBebidas, listOneBebidas, createBebidas, updateBebidas, deleteBebidas,
    };

