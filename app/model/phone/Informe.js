/**
* @class APP.model.phone.Informe
* @extends Ext.data.Model
* El modelo para representar un informe
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Informe', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'codigo',
            type: 'string'
        },{
            name: 'nombre',
            type: 'string'
        },{
            name: 'codigoArticulo', // Sólo se usa para el informe de Cliente-Artículos
            type: 'string'
        },{
            name: 'descripcion',
            type: 'string'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'cantidad',
            type: 'float',
            convert: function(decimales){
                var nuevo = APP.core.FormatCurrency.formatValue(decimales);
                return nuevo;
            }
        },{
            name: 'importe',
            type: 'float',
            convert: function(decimales){
                var nuevo = APP.core.FormatCurrency.formatValue(decimales);
                return nuevo;
            }
        }]
    }
});