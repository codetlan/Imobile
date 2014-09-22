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
            name: 'descripcion',
            type: 'string'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'cantidad',
            type: 'int'
        },{
            name: 'importe',
            type: 'int'
        }]
    }
});