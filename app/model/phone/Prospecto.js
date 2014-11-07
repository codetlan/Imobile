/**
* @class APP.model.phone.Prospecto
* @extends Ext.data.Model
* El modelo para representar a un prospecto.
* @temerario28@gmail.com
* @codetlan
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
                name: 'CodigoSocio',
                type: 'string'
            },
            {
                name: 'NombreSocio',
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