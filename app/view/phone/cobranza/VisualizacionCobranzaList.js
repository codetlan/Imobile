/**
 * @class Imobile.view.ventas.VisualizacionCobranzaList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.cobranza.VisualizacionCobranzaList', {
    extend: 'Ext.dataview.List',
    xtype: 'visualizacioncobranzalist',
    config: {
        store: 'Transacciones',
        cls: 'factura',

        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true,
            loadMoreText: 'Ver Más...'
        }]
    },

    initialize: function(){
        var me = this;

        me.setItemTpl('<b>' + APP.core.config.Locale.config.lan.TransaccionList.folio + 
        ': </b> {CodigoCobranza} <b> <br>' + APP.core.config.Locale.config.lan.TransaccionList.tipoTransaccion +
         ': </b> {TipoTransaccion} <br> <b> ' + APP.core.config.Locale.config.lan.OpcionesOrdenPanel.cliente +
          ': </b> {CodigoCliente} {NombreCliente}');

        me.setItems([{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',        

            items: [{
                xtype: 'searchfield',
                itemId: APP.core.config.Locale.config.lan.VisualizacionCobranzaList.buscarCobranza,
                placeHolder: APP.core.config.Locale.config.lan.VisualizacionCobranzaList.criterio,
                flex: 8
            },{
                xtype: 'selectfield',
                itemId: 'buscarTipo',
                options: [
                    {text: APP.core.config.Locale.config.lan.VisualizacionCobranzaList.seleccionaOpcion, value: ''},
                    {text: APP.core.config.Locale.config.lan.VisualizacionCobranzaList.cobranzaFactura,  value: 'C'},
                    {text: APP.core.config.Locale.config.lan.VisualizacionCobranzaList.anticipoPedido, value: 'A'}
                ],
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarCobranza',
                flex: 0.5
            }]
        }]);

        me.callParent(arguments);
    }
});