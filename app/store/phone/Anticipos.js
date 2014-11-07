/**
* @class APP.store.phone.Anticipos
* @extends Ext.data.Store
* El store para los anticipos, comparto el modelo de facturas
* @author temerario28@gmail.com
* @codetlan
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