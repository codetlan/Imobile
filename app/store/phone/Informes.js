/**
* @class APP.store.phone.Informes
* @extends Ext.data.Store
* El store para los informes
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Informes', {
    extend: 'APP.core.data.Store',    

    config: {
        model: 'APP.model.phone.Informe',
        proxy: {
            url: "/iMobile/COK1_CL_Informes/obtenInformeClientes",
            type: 'jsonp',
            callbackKey: 'callback',
            reader: {
                type: 'json',
                rootProperty: 'Data'

            }
        }
    }
});