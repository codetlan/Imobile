/**
* @class APP.model.phone.Producto
* @extends Ext.data.Model
* El modelo para representar a un producto.
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Producto', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'CodigoArticulo',
                type: 'string'
            },
            {
                name: 'NombreArticulo',
                type: 'string'
            },
            {
                name: 'cantidad',
                type: 'float',
                defaultValue: 0
            },
            {
                name: 'Precio',
                type: 'double'
            },
            {
                name: 'moneda',
                type: 'string'
            },
            {
                name: 'descuento',
                type: 'string'
            },
            {
                name: 'precioConDescuento',
                type: 'double'
            },
            {
                name: 'totalDeImpuesto',
                type: 'double'
            },
            {
                name: 'importe',
                type: 'string'
            },
            {
                name: 'NombreAlmacen',
                type: 'string'
            },
            {
                name: 'Disponible',
                type: 'float',
                convert: function (Disponible) {
                    return parseFloat(Disponible).toFixed(2);
                }
            },
            {
                name: 'DesplegarEnPanel',
                type: 'boolean'
            },
            {
                name: 'ListaPrecios',
                type: 'array'
            },
            {
                name: 'SujetoImpuesto',
                type: 'boolean'
            },
            {
                name: 'color',
                type: 'string'
            },
            {
                name: 'Imagen',
                type: 'string',
                mapping: 'Imagen',
                convert: function (Imagen) {
                    return "http://" + localStorage.getItem("dirIP") + Imagen;                    
                    //return 'http://25.15.241.121:88' + Imagen;
                }
            }
        ]
    }
});