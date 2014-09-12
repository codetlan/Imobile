/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:01
 * To change this template use File | Settings | File Templates.
 */
Ext.define('APP.view.phone.ordenes.OpcionesOrdenPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'opcionesorden',
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        defaults: {
            styleHtmlContent: true,
            background: '#000'
        }
    },

    initialize: function(){
        this.setItems ([
            {
                title: APP.core.config.Locale.config.lan.OpcionesOrdenPanel.orden,
                iconCls: 'settings',
                xtype: 'partidacontainer'
            },
            {
                title: APP.core.config.Locale.config.lan.OpcionesOrdenPanel.cliente,
                iconCls: 'user',
                xtype: 'clientecontainer'
            },
            {
                title: APP.core.config.Locale.config.lan.OpcionesOrdenPanel.editar,
                itemId: 'editarPedido',
                iconCls: 'fa fa-pencil-square-o',
                xtype: 'editarpedidoform'
            },
            {
                title: APP.core.config.Locale.config.lan.OpcionesOrdenPanel.eliminar,
                iconCls: 'fa fa-times',
                itemId: 'eliminar'
            },
            {
                title: APP.core.config.Locale.config.lan.OpcionesOrdenPanel.terminar,
                iconCls: 'action',
                itemId: 'terminar'
            }
        ]);

        this.callParent(arguments);
    }
});