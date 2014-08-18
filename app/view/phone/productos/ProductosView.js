/**
 * @class Imobile.view.productos.ProductosView
 * @extends Ext.dataview.List
 * Esta es la lista para el panel de productos (los cuadritos de colores)
 */
Ext.define('APP.view.phone.productos.ProductosView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'productosview',

    config: {
        inline: true,
        padding: '10 10 10 17',        
        cls: 'dataview-inline',
        itemTpl: [
            '<tpl for=".">',
                '<tpl if="cantidad &gt; 0">',
                    '<div class= "ovalo">{cantidad}</div>',
                '</tpl>',
            '<div class="product-list" style="background-color: {color}">',
                '<div class="container"> ',
                    '{NombreArticulo}',
                //'<h2>{name}</h2>',
                '</div>',
            '</div>',
            '</tpl>'
        ].join(''),
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay productos con esos datos</div>',
        store: 'Productos',
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        loadingText: 'Cargando...'
    }
});