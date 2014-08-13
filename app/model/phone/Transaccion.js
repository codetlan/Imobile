/**
 * @class Imobile.model..Cliente
 * @extends Ext.data.Model
 * El modelo del cliente
 */
Ext.define('APP.model.phone.Transaccion', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'Folio',
                type: 'string'
            },
            {
                name: 'CodigoSocio',
                type: 'string'
            },
            {
                name: 'NombreCliente',
                type: 'string'
            },
            {
                name: 'TipoTransaccion',
                type: 'int'
            },
            {
                name: 'NumeroDocumento',
                type: 'string'
            }
        ]
    }
});