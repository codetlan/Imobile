/**
* @class APP.store.phone.Clientes
* @extends Ext.data.Store
* El store para los clientes
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Clientes', {
    extend: 'APP.core.data.Store',    

    config: {
        model: 'APP.model.phone.Cliente',
        proxy: {
            url: "/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile",
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