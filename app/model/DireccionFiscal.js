/**
 * @class Imobile.model.DireccionFiscal
 * @extends Ext.data.Model
 * El modelo de la direccion fiscal
 */
Ext.define('Imobile.model.DireccionFiscal', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'idCliente',
            type: 'int'
        },{
            name: 'calle',
            type: 'string'
        }, {
            name: 'colonia',
            type: 'string'
        },{
            name: 'municipio',
            type: 'string'
        },{
            name: 'cp',
            type: 'int'
        },{
            name: 'ciudad',
            type: 'string'
        },{
            name: 'estado',
            type: 'string'
        },{
            name: 'pais',
            type: 'string'
        }],

        proxy: {
            type: "sql"
        }
    }
});