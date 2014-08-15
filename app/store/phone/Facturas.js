/**
 * @class Imobile.store.Facturas
 * @extends Ext.data.Store
 * Este es el store para las facturas
 */
Ext.define('APP.store.phone.Facturas', {
    extend: 'APP.core.data.Store',

    config: {
        model: 'APP.model.phone.Factura',        
        proxy: {
            url: "/iMobile/COK1_CL_Consultas/ObtenerFacturasAbiertasiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
    }
});