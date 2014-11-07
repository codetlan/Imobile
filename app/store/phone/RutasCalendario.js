/**
* @class APP.store.phone.RutasCalendario
* @extends Ext.data.Store
* El store para las rutas
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.RutasCalendario', {
    extend: 'APP.core.data.Store',
    //extend: 'Ext.data.Store',

    config: {
        model: 'APP.model.phone.RutaCalendario',
        proxy: {
            url: "/iMobile/COK1_CL_Rutas/ObtenerRutas",
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