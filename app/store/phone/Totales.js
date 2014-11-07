/**
* @class APP.store.phone.Totales
* @extends Ext.data.Store
* El store para los totales
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Totales', {
    extend: 'Ext.data.Store',    
    config: {
        model: 'APP.model.phone.Total',
        autoLoad: true
    }
});