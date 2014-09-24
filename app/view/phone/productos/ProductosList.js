/**
 * @class Imobile.view.clientes.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar los productos
 */
Ext.define('APP.view.phone.productos.ProductosList', {
    extend: 'Ext.dataview.List',
    xtype: 'productoslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.MessageBox'],
    config: {        
        store: 'Productos',
        useSimpleItems: true,        
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },

/*        masked: {
            xtype: 'loadmask',
            message: 'Cargando...'
        },
        loadingText: 'Cargando...'*/
    },

    initialize: function(){
        var me = this;

        me.setItemTpl(['<div class="imobile-cliente-tpl">', '<p>{CodigoArticulo}</p>', '<span><b>{NombreArticulo}</b></span> </br>', 
                    '<span style="color: red;">' + APP.core.config.Locale.config.lan.OrdenList.cantidad + ' ' + '<b>{cantidad}</b></span>', '</div>'].join(''));

        me.setEmptyText('<div style="margin-top: 20px; text-align: center">' + APP.core.config.Locale.config.lan.ProductosList.textoVacio + ' ' + '</div>');

        me.setItems([{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarProductos',
                placeHolder: APP.core.config.Locale.config.lan.ProductosList.buscar,
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarProductos',
                flex: 0.5
            }]
         }]);

        me.setPlugins([{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true,
            loadMoreText: APP.core.config.Locale.config.lan.ProductosList.verMas
        }]);

        me.setMasked({
            xtype: 'loadmask',
            message: APP.core.config.Locale.config.lan.ClientesList.cargando
        });

//        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});