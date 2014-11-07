/**
* @class APP.model.phone.RutaCalendarioDirecciones
* @extends Ext.data.Model
* El modelo para representar una dirección para el módulo de rutas y actividades
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.RutaCalendarioDirecciones', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name:'CodigoDireccion'
        },{
            name:'TipoDireccion'
        },{
            name:'Calle'
        },{
            name:'NoExterior'
        },{
            name:'NoInterior'
        },{
            name:'Colonia'
        },{
            name:'Ciudad'
        },{
            name:'Municipio'
        },{
            name:'Estado'
        }]
    }
});