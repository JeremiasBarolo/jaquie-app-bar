

        const { maestro_articulosProvider } = require('../providers');

        const listAllmaestro_articulos = async () => {
            return await maestro_articulosProvider.listAllmaestro_articulos();
        };

        const listOnemaestro_articulos = async (maestro_articulos_id) => {
            return await maestro_articulosProvider.listOnemaestro_articulos(maestro_articulos_id);
        };

        const createmaestro_articulos = async (maestro_articulosData) => {
            return await maestro_articulosProvider.createmaestro_articulos(maestro_articulosData);
        };


        const updatemaestro_articulos = async (maestro_articulos_id, updatemaestro_articulos) => {
            return await maestro_articulosProvider.updatemaestro_articulos(maestro_articulos_id, updatemaestro_articulos);
        };

        const deletemaestro_articulos = async (maestro_articulos_id) => {
            return await maestro_articulosProvider.deletemaestro_articulos(maestro_articulos_id);
        };


        module.exports = {
        listAllmaestro_articulos, listOnemaestro_articulos, createmaestro_articulos, updatemaestro_articulos, deletemaestro_articulos, 
        };

