/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('APP.model.phone.RutaCalendario', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'title',
            type: 'string'
        },{
            name: 'location',
            type: 'string'
        },{
            name: 'start',
            type: 'date',
            dateFormat: 'c'
        },{
            name: 'end',
            type: 'date',
            dateFormat: 'c'
        }]
    }
});