/**
 * @class Imobile.view.cobranza.TotalAPagarList
 * @extends extendsClass
 * Description Lista de los tipos de pago que eligió el cliente
 */
Ext.define('APP.view.phone.cobranza.TotalAPagarList', {
    extend: 'Ext.dataview.List',
    requires: [],
    xtype: 'totalapagarlist',
    config: {
        itemCls: 'factura',
    	itemTpl: '{tipo}: <b>{monto}</b>',
        store: 'Totales'
    	/*onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },*/
    },

    initialze: function(){
        var me = this;

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});