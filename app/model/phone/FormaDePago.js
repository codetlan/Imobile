/**
 * @class Imobile.model.FormaDePago
 * @extends Ext.data.Model
 * El modelo de la forma de pago
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