/**
* @class APP.model.phone.Transaccion
* @extends Ext.data.Model
* El modelo para representar una transacción.
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Transaccion', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'CodigoCobranza',
                type: 'string'
            },
            {
                name: 'CodigoCliente',
                type: 'string'
            },
            {
                name: 'NombreCliente',
                type: 'string'
            },
            {
                name: 'TipoTransaccion',
                type: 'string'
            },
            {
                name: 'NumeroDocumento',
                type: 'string'
            },{
                name: 'CodigoCliente',
                type: 'string'
            },{
                name: 'NombreCliente',
                type: 'string'
            },{
                name: 'Tipo',
                type: 'string'
            }
        ]
    }
});