/**
* @class APP.store.phone.ActividadesCalendario
* @extends Ext.data.Store
* El store para las actividades
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.ActividadesCalendario', {
    extend: 'APP.core.data.Store',
    //extend: 'Ext.data.Store',

    config: {
        model: 'APP.model.phone.ActividadCalendario',
        proxy: {
            url: "/iMobile/COK1_CL_Actividades/ObtenerActividades",
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