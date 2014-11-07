/**
* @class APP.store.phone.FormasDePago
* @extends Ext.data.Store
* El store para las formas de pago
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.FormasDePago', {
    extend: 'APP.core.data.Store',

    config: {
        model: 'APP.model.phone.FormaDePago',
        proxy: {
            url: "/iMobile/COK1_CL_Catalogos/ObtenerFormasPagoiMobile",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'
            }
        }
    }
});