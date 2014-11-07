/**
* @class APP.store.phone.Direcciones
* @extends Ext.data.Store
* El store para las direcciones
* @author temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.store.phone.Direcciones', {
    extend: 'Ext.data.Store',
    config: {
        model:'APP.model.phone.Direccion'
    }
});