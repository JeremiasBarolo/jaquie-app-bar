

        const { TipoFormaPagosProvider } = require('../providers');

        const listAllTipoFormaPagos = async () => {
            return await TipoFormaPagosProvider.listAllTipoFormaPagos();
        };

        const listOneTipoFormaPagos = async (TipoFormaPagos_id) => {
            return await TipoFormaPagosProvider.listOneTipoFormaPagos(TipoFormaPagos_id);
        };

        const createTipoFormaPagos = async (TipoFormaPagosData) => {
            return await TipoFormaPagosProvider.createTipoFormaPagos(TipoFormaPagosData);
        };


        const updateTipoFormaPagos = async (TipoFormaPagos_id, updateTipoFormaPagos) => {
            return await TipoFormaPagosProvider.updateTipoFormaPagos(TipoFormaPagos_id, updateTipoFormaPagos);
        };

        const deleteTipoFormaPagos = async (TipoFormaPagos_id) => {
            return await TipoFormaPagosProvider.deleteTipoFormaPagos(TipoFormaPagos_id);
        };


        module.exports = {
        listAllTipoFormaPagos, listOneTipoFormaPagos, createTipoFormaPagos, updateTipoFormaPagos, deleteTipoFormaPagos, 
        };

