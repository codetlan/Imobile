/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.ordenes.OpcionOrdenesList', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionordeneslist',
    config: {
        itemTpl: '{title}',
        data:[
            {title: 'Orden de venta', action: 'orden'},
            {title: 'Visualizar transacciones', action: 'visualizar'}
        ]
    }
});