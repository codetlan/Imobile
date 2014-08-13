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
        },
        items: [
            {
                title: 'Orden',
                iconCls: 'settings',
                xtype: 'partidacontainer'
            },
            {
                title: 'Cliente',
                iconCls: 'user',
                xtype: 'clientecontainer'
            },
            {
                title: 'Editar',
                itemId: 'editarPedido',
                iconCls: 'fa fa-pencil-square-o',
                xtype: 'editarpedidoform'
            },
            {
                title: 'Eliminar',
                iconCls: 'fa fa-times',                
                itemId: 'eliminar'
            },
            {
                title: 'Terminar',
                iconCls: 'action',
                itemId: 'terminar'

            }
        ]
    }
});