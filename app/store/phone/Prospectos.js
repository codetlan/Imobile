/**
 * @class Imobile.store.Prospectos
 * @extends Ext.data.Store
 * Este es el store para prospectos
 */
Ext.define('APP.store.phone.Prospectos', {
    extend: 'APP.core.data.Store',
    //requires: ['Imobile.model.Prospecto'],

    config: {
        model: 'APP.model.phone.Prospecto',
        //autoLoad: true
        proxy: {
            url: "/iMobile/COK1_CL_Socio/ObtenerListaProspectosiMobile",
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