/**
 * @class Imobile.view.ventas.VisualizacionCobranzaList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.cobranza.VisualizacionCobranzaList', {
    extend: 'Ext.dataview.List',
    xtype: 'visualizacioncobranzalist',
    config: {
        itemTpl: '<b>Folio:</b> {CodigoCobranza} <b>Tipo:</b> {Tipo}<br> <b>Tipo de transacción:</b> Cobranza de factura <br> <b>Cliente:</b> {CodigoCliente} {NombreCliente}', 
        store: 'Transacciones',
        cls: 'factura',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarCobranzas',
                placeHolder: 'Criterio...',
                flex: 8
            },{
                xtype: 'searchfield',
                itemId: 'buscarTipo',
                placeHolder: 'Tipo...',
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarCobranza',
                flex: 0.5
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true,
            loadMoreText: 'Ver Más...'
        }]
    }
});