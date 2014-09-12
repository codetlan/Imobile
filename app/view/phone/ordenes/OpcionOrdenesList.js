/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.ordenes.OpcionOrdenesList', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionordeneslist',
    config: {
        itemTpl: '{title}'
    },

    initialize: function(){
        this.setData([                                                  
            {title: APP.core.config.Locale.config.lan.OpcionOrdenesList.ordenDeVenta, action: 'orden'},
            {title: APP.core.config.Locale.config.lan.OpcionOrdenesList.visualizarTransacciones, action: 'visualizar'}
        ]);

        this.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);
        this.callParent(arguments);
    }
});