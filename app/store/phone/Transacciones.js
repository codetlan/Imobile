/**
 * @class Imobile.store.Productos
 * @extends Ext.data.Store
 * Este es el store para los productos
 */
Ext.define('APP.store.phone.Transacciones', {
    extend: 'APP.core.data.Store',
    //requires:['Imobile.model.Transaccion'],

    config: {
        model:'APP.model.phone.Transaccion',
        proxy: {            
            url: "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'
            },
            extraParams:{
                format:'json'
            }
        }
    }
});