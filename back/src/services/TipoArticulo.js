

        const { TipoArticuloProvider } = require('../providers');

        const listAllTipoArticulo = async () => {
            return await TipoArticuloProvider.listAllTipoArticulo();
        };

        const listOneTipoArticulo = async (TipoArticulo_id) => {
            return await TipoArticuloProvider.listOneTipoArticulo(TipoArticulo_id);
        };

        const createTipoArticulo = async (TipoArticuloData) => {
            return await TipoArticuloProvider.createTipoArticulo(TipoArticuloData);
        };


        const updateTipoArticulo = async (TipoArticulo_id, updateTipoArticulo) => {
            return await TipoArticuloProvider.updateTipoArticulo(TipoArticulo_id, updateTipoArticulo);
        };

        const deleteTipoArticulo = async (TipoArticulo_id) => {
            return await TipoArticuloProvider.deleteTipoArticulo(TipoArticulo_id);
        };


        module.exports = {
        listAllTipoArticulo, listOneTipoArticulo, createTipoArticulo, updateTipoArticulo, deleteTipoArticulo, 
        };

