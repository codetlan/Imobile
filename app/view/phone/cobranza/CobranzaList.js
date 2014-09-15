/**
 * @class Imobile.view.cobranzas.CobranzaList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente al seleccionar cobranza
 */
Ext.define('APP.view.phone.cobranza.CobranzaList', {
    extend: 'Ext.dataview.List',
    xtype: 'cobranzalist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}'
    },

    initialize: function(){
        var me = this;

        me.setData([
            {title: APP.core.config.Locale.config.lan.CobranzaList.cobranzaFacturas, action: 'cobranzaFacturas'},
            {title: APP.core.config.Locale.config.lan.CobranzaList.anticipoPedidos, action: 'anticipo'},
            {title: APP.core.config.Locale.config.lan.CobranzaList.visualizarCobranza, action: 'visualizarCobranza'}
        ]);

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});