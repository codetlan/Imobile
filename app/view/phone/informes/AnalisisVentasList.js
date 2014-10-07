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
        data:[
            {title: 'Clientes', action: 'analisisClientes'},
            {title: 'Artículos', action: 'analisisArticulos'}
        ],
        modulo: 'informes'
    }
});