/**
 * Esta es la lista de las opciones de Análisis de Ventas.
 */
Ext.define('APP.view.phone.informes.AnalisisVentasList', {
    extend: 'Ext.dataview.List',
    xtype: 'analisisventaslist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}',        
        modulo: 'informes'
    },

    initialize: function(){
        var me =this;

        me.setData([
            {title: APP.core.config.Locale.config.lan.AnalisisVentasList.clientes, action: 'analisisClientes'},
            {title: APP.core.config.Locale.config.lan.AnalisisVentasList.articulos, action: 'analisisArticulos'}
        ]);

        me.callParent(arguments);
    }
});