/**
 * @class Imobile.view.ventas.DireccionesList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.ordenes.TransaccionList', {
    extend: 'Ext.dataview.List',
    xtype: 'transaccionlist',
    config: {
        itemTpl: '<b>Folio:</b> {NumeroDocumento} <br> <b>Tipo de transacción:</b> Orden de venta', //{TipoTransaccion}',
        store: 'Transacciones',
        cls: 'factura',
        /*data:[
            {folio: 'F001', transaccion: 'Ordenes de Venta', cliente: 'C091 Oswaldo Lopez'},
            {folio: 'F002', transaccion: 'Ordenes de Venta', cliente: 'C032 Ali Hernandez'}
        ],*/
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarTransacciones',
                placeHolder: ' Buscar transaccion...',
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarTransaccion',
                flex: 0.5
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }],
        loadingText: 'Cargando...'
    }
});