/**
 * @class Imobile.store.FormasDePago
 * @extends Ext.data.Store
 * Este es el store para las formas de pago
 */
Ext.define('APP.store.phone.FormasDePago', {
    extend: 'APP.core.data.Store',
    //requires: ['Imobile.model.FormaDePago'],

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