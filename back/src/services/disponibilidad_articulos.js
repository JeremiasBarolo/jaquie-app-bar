

        const { disponibilidad_articulosProvider } = require('../providers');

        const listAlldisponibilidad_articulos = async () => {
            return await disponibilidad_articulosProvider.listAlldisponibilidad_articulos();
        };

        const listOnedisponibilidad_articulos = async (disponibilidad_articulos_id) => {
            return await disponibilidad_articulosProvider.listOnedisponibilidad_articulos(disponibilidad_articulos_id);
        };

        const createdisponibilidad_articulos = async (disponibilidad_articulosData) => {
            return await disponibilidad_articulosProvider.createdisponibilidad_articulos(disponibilidad_articulosData);
        };


        const updatedisponibilidad_articulos = async (disponibilidad_articulos_id, updatedisponibilidad_articulos) => {
            return await disponibilidad_articulosProvider.updatedisponibilidad_articulos(disponibilidad_articulos_id, updatedisponibilidad_articulos);
        };

        const deletedisponibilidad_articulos = async (disponibilidad_articulos_id) => {
            return await disponibilidad_articulosProvider.deletedisponibilidad_articulos(disponibilidad_articulos_id);
        };


        module.exports = {
        listAlldisponibilidad_articulos, listOnedisponibilidad_articulos, createdisponibilidad_articulos, updatedisponibilidad_articulos, deletedisponibilidad_articulos, 
        };

