/**
* @class APP.store.phone.Ordenes
* @extends Ext.data.Store
* El store para las órdenes de venta
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Ordenes', {
    extend: 'Ext.data.Store',
    config: {
        model: 'APP.model.phone.Orden'
    }
});