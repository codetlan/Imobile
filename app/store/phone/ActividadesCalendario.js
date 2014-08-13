/**
 * @class Imobile.store.Clientes
 * @extends Ext.data.Store
 * Este es el store para los clientes
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