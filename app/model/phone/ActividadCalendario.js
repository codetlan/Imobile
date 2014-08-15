/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('APP.model.phone.ActividadCalendario', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name:'CodigoActividad'
        },{
            name: 'title',
            type: 'string',
            mapping:'Descripcion'
        },{
            name: 'location',
            type: 'string',
            mapping:'Notas'
        },{
            name: 'start',
            type: 'date',
            dateFormat: 'c',
            mapping:'FechaInicio'
        },{
            name: 'end',
            type: 'date',
            dateFormat: 'c',
            mapping:'FechaFin'
        },{
            name: 'HoraInicio'
        },{
            name: 'HoraFin'
        }]
    }
});