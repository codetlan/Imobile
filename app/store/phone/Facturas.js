/**
* @class APP.store.phone.Facturas
* @extends Ext.data.Store
* El store para las faturas
* @author temerario28@gmail.com
* @codetlan
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