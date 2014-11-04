/**
 * Created by Alí García on 9/20/14.
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
            name: 'codigoArticulo',
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