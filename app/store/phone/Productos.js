/**
* @class APP.store.phone.Productos
* @extends Ext.data.Store
* El store para los productos
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Productos', {
    extend: 'APP.core.data.Store',        
    config: {
        model:'APP.model.phone.Producto',
        proxy: {            
            url: '/iMobile/COK1_CL_Articulo/ObtenerListaArticulosiMobile',            
                 
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