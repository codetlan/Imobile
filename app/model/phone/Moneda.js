/**
* @class APP.model.phone.Moneda
* @extends Ext.data.Model
* El modelo para representar una moneda
* @temerario28@gmail.com
* @codetlan
*/
Ext.define('APP.model.phone.Moneda', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'CodigoMoneda',
                type: 'string'
            },
            {
                name: 'NombreMoneda',
                type: 'string'
            },
            {
                name: 'Predeterminada',
                type: 'boolean'
            }
        ]
    }
});