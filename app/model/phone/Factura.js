/**
 * @class Imobile.model..Factura
 * @extends Ext.data.Model
 * El modelo de la factura
 */
Ext.define('APP.model.phone.Factura', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'Folio',
            type: 'int'
        },{
            name: 'TotalDocumento',//Se cambio para hacer pruebas, debería decir Saldo
            type: 'float',
            convert: function(decimales){
                var nuevo = Ext.Number.toFixed(decimales, 2);
                return Ext.Number.from(nuevo, 1);
            }
        }, {
            name: 'FechaCreacion',
            type: 'string',
            convert: function(fechaCreacion){
                return Ext.Date.format(new Date(fechaCreacion), "d-m-Y");
            }
        },{
            name: 'FechaFin',
            type: 'string',
            convert: function(fechaFin){
                return Ext.Date.format(new Date(fechaFin), "d-m-Y");
            }
        },{
            name: 'CodigoMoneda',
            type: 'string'
        },{
            name: 'saldoAMostrar',
            type: 'string'
        },{
            name: 'aPagar',
            type: 'boolean'
        },{
            name: 'NumeroDocumento',
            type: 'string'
        }]
    }
});