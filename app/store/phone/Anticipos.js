/**
 * @class Imobile.store.Anticipos
 * @extends Ext.data.Store
 * Este es el store para los anticipos.
 */
Ext.define('APP.store.phone.Anticipos', {
    extend: 'APP.core.data.Store',
    //requires: ['APP.core.data.Store'],

    config: {
        model: 'APP.model.phone.Factura',
        proxy: {
            url: "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
    }
});