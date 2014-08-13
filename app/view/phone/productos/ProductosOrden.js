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
        itemId: 'principal',
        items:[{
            xtype:'toolbar',
            docked: 'top',
            items:[{
                xtype:'spacer'
            },{
                xtype:'segmentedbutton',
                items:[{
                    text:'Lista',
                    itemId: 'listaProductos',
                    pressed: true
                },{
                    text:'Panel',
                    itemId: 'panelProductos'
                }]
            },{
                xtype:'spacer'
            }]
        },{
            xtype:'productoslist'
            //html:'Lista de productos'
        }]
    }
});