/**
 * @class Imobile.store.Direcciones
 * @extends Ext.data.Store
 * Este es el store para las direcciones
 */
Ext.define('APP.store.phone.Direcciones', {
    extend: 'Ext.data.Store',
    config: {
        model:'APP.model.phone.Direccion'
    }
});