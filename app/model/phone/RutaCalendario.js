/**
* @class APP.model.phone.RutaCalendario
* @extends Ext.data.Model
* El modelo para representar una ruta.
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.RutaCalendario', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name:'CodigoRuta'
        },{
            name:'CodigoCliente'
        },{
            name: 'title',
            type: 'string',
            mapping:'Descripcion'
        },{
            name: 'CodigoDireccion',
            type: 'string'
        },{
            name: 'TipoDireccion',
            type: 'string'
        },{
            name: 'lat',
            type: 'string',
            mapping:'LatitudOrigen'
        },{
            name: 'lon',
            type: 'string',
            mapping: 'LongitudOrigen'
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
            name: 'FechaVisita',
            type: 'date',
            dateFormat: 'c'            
        },{
            name: 'HoraInicio'
        },{
            name: 'HoraFin'
        },{
            name: 'HoraVisita'
        },{
            name:'Repetir'
        },{
            name:'Lunes'
        },{
            name:'Martes'
        },{
            name:'Miercoles'
        },{
            name:'Jueves'
        },{
            name:'Viernes'
        },{
            name:'Sabado'
        },{
            name:'Domingo'
        },{
            name:'Estatus'
        },{
            name:'Notas'
        }]
    }
});