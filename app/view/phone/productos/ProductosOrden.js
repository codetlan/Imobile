/**
 * @class Imobile.view.favoritos.SeleccionadorProFav
 * @extends Ext.Toolbar
 * Es un seleccionador para elegir productos o favoritos
 */
Ext.define('APP.view.phone.productos.ProductosOrden', {
    extend: 'Ext.Container',
    xtype: 'productosorden',
    requires: ['Ext.Toolbar','Ext.SegmentedButton'],
    config: {
        layout: 'fit',
        itemId: 'principal'        
    },

    initialize: function(){
        var me = this;

        me.setItems([{
            xtype:'toolbar',
            docked: 'top',
            items:[{
                xtype:'spacer'
            },{
                xtype:'segmentedbutton',
                items:[{
                    text: APP.core.config.Locale.config.lan.ProductosOrden.lista,
                    itemId: 'listaProductos',
                    pressed: true
                },{
                    text: APP.core.config.Locale.config.lan.ProductosOrden.panel,
                    itemId: 'panelProductos'
                }]
            },{
                xtype:'spacer'
            }]
        },{
            xtype:'productoslist'            
        }]);

        me.callParent(arguments);
    }
});