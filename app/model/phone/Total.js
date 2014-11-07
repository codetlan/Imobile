/**
* @class APP.model.phone.Total
* @extends Ext.data.Model
* El modelo para representar el total de un pago.
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Total', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'tipo',
            type: 'string'
        }, {
            name: 'monto',
            type: 'string'
        },{
            name: 'codigoFormaPago',
            type: 'string'
        },{
            name: 'NumeroCheque',
            type: 'string'
        },{
            name: 'NumeroTarjeta',
            type: 'string'
        },{
            name: 'Banco',
            type: 'string'
        },{
            name: 'Fecha',
            type: 'string',
            convert: function(fechaPago){
                return Ext.Date.format(new Date(fechaPago), "d-m-Y");
            }
        },{
            name: 'NumeroAutorizacion',
            type: 'string'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'tipoFormaPago',
            type: 'string'
        }]
    }
});