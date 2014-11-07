/**
* @class APP.model.phone.Direccion
* @extends Ext.data.Model
* El modelo para representar una dirección
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Direccion', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'idCliente',
            type: 'int'
        },{
            name: 'Calle',
            type: 'string'
        },{
            name: 'NoExterior',
            type: 'string'
        }, {
            name: 'NoInterior',
            type: 'string'
        },{
            name: 'Colonia',
            type: 'string'
        },{
            name: 'Municipio',
            type: 'string'
        },{
            name: 'CodigoPostal',
            type: 'string'
        },{
            name: 'Ciudad',
            type: 'string'
        },{
            name: 'Estado',
            type: 'string'
        },{
            name: 'Pais',
            type: 'string'
        },{
            name: 'TipoDireccion', //La B es la dirección de entrega y S es la dirección fiscal
            type: 'string'
        },{
            name: 'CodigoImpuesto',
            type: 'string'
        },{
            name: 'Tasa',
            type: 'string'
        },{
            name: 'CodigoDireccion',
            type: 'string'
        },{
            name: 'Predeterminado',
            type: 'boolean'
        }]
    }
});