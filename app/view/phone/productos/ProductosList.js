/**
 * @class Imobile.view.clientes.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('APP.view.phone.productos.ProductosList', {
    extend: 'Ext.dataview.List',
    xtype: 'productoslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.MessageBox'],
    config: {
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{CodigoArticulo}</p>', '<span><b>{NombreArticulo}</b></span> </br>', '<span style="color: red;">Cantidad: <b>{cantidad}</b></span>', '</div>'].join(''),
        store: 'Productos',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay productos con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarProductos',
                placeHolder: ' Buscar producto...',
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarProductos',
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