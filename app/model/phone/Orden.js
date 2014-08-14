/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 13:54
 * To change this template use File | Settings | File Templates.
 */
Ext.define('APP.model.phone.Orden', {
    extend: 'Ext.data.Model',

     config: {
        fields: [{
            name: 'id',
            type: 'int'
        },{
            name: 'CodigoSocio',
            type: 'string'
        },{
            name: 'CodigoArticulo',
            type: 'string'
        }, {
            name: 'NombreArticulo',
            type: 'string'
        },{
            name: 'cantidad',
            type: 'float'
        },{
            name: 'Precio',
            type: 'string'
        },{
            name: 'moneda',
            type: 'string'
        },{
            name: 'PorcentajeDescuento',
            type: 'double'
        },{
            name: 'precioConDescuento',
            type: 'double'
        },{
            name: 'totalDeImpuesto',
            type: 'double'
        },{
            name: 'importe',
            type: 'string'
        },{
            name: 'NombreAlmacen',
            type: 'string'
        },{
            name: 'Disponible',
            type: 'float'
        },{
            name: 'Imagen',
            type: 'string'
        },{
            name: 'CodigoAlmacen',
            type: 'string'
        },{
            name: 'nombreMostrado',
            type: 'string'
        },{
            name: 'esOrdenRecuperada',
            type: 'boolean'
        },{
            name: 'TipoCambio',
            type: 'float'
        },{
            name: 'SujetoImpuesto',
            type: 'boolean'
        }]
    }
});