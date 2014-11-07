/**
* @class APP.store.phone.Transacciones
* @extends Ext.data.Store
* El store para las transacciones
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Transacciones', {
    extend: 'APP.core.data.Store',    

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