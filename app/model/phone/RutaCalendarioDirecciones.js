/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
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