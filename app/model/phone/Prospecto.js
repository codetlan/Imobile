/**
 * @class Imobile.model.Prospecto
 * @extends Ext.data.Model
 * El modelo del prospecto
 */
Ext.define('APP.model.phone.Prospecto', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'fecha',
                type: 'string'
            },
            {
                name: 'codigo',
                type: 'string'
            },
            {
                name: 'razonSocial',
                type: 'string'
            },
            {
                name: 'tipoPersona',
                type: 'string'
            },
            {
                name: 'rfc',
                type: 'string'
            },
            {
                name: 'direcciones',
                type: 'array'
            },
            {
                name: 'encargado',
                type: 'object'
            },
            {
                name: 'productor',
                type: 'object'
            },
            {
                name: 'productosUtilizados',
                type: 'object'
            },
            {
                name: 'comentarios',
                type: 'string'
            }
        ]
    }
});