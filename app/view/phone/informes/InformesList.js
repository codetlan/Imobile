/**
 * Esta es la lista de las opciones de informes.
 */
Ext.define('APP.view.phone.informes.InformesList', {
    extend: 'Ext.dataview.List',
    xtype: 'informeslist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        itemTpl: '{title}',
        data:[
            {title: 'Bitácora de vendedores', action: 'bitacoraVendedores'},
            {title: 'Análisis de Ventas', action: 'analisisVentas'}            
        ]
    }
});