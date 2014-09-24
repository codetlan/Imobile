/**
 * @class Imobile.view.ventas.DireccionesList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.ordenes.TransaccionList', {
    extend: 'Ext.dataview.List',
    xtype: 'transaccionlist',
    config: {        
        store: 'Transacciones',
        cls: 'factura',
        /*data:[
            {folio: 'F001', transaccion: 'Ordenes de Venta', cliente: 'C091 Oswaldo Lopez'},
            {folio: 'F002', transaccion: 'Ordenes de Venta', cliente: 'C032 Ali Hernandez'}
        ],*/

        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }]
    },

    initialize: function(){
        var me = this;

        me.setItemTpl('<b>' + APP.core.config.Locale.config.lan.TransaccionList.folio + ': ' + '</b> {NumeroDocumento} <br> <b>' + 
            APP.core.config.Locale.config.lan.TransaccionList.tipoTransaccion + ': ' + 
            '</b>' + APP.core.config.Locale.config.lan.TransaccionList.orden);

        me.setItems([{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarTransacciones',
                placeHolder: APP.core.config.Locale.config.lan.TransaccionList.buscar,
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarTransaccion',
                flex: 0.5
            }]
        }]);

        this.setMasked({
            xtype: 'loadmask',
            message: APP.core.config.Locale.config.lan.ClientesList.cargando
        });

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});