/**
* @class APP.model.phone.FormaDePago
* @extends Ext.data.Model
* El modelo para representar una forma de pago
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.FormaDePago', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'Codigo',
            type: 'string'
        }, {
            name: 'Nombre',
            type: 'string'
        },{
            name: 'PermiteCambio',
            type: 'string'
        },{
            name: 'TipoFormaPago',
            type: 'string'
        },{
            name: 'UIDTransaccion',
            type: 'string'            
        },{
            name: 'TipoTransaccion',
            type: 'string'
        }]
    }
});