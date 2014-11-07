/**
* @class APP.store.phone.Prospectos
* @extends Ext.data.Store
* El store para los prospectos
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Prospectos', {
    extend: 'APP.core.data.Store',    

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