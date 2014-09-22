/**
 * @class Imobile.view.cobranza.CobranzaContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('APP.view.phone.cobranza.FacturasContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'facturascontainer',
    config: {
        /*scrollable: {
            direction: 'vertical',
            directionLock: true
        },*/
        layout: 'vbox'
    },

    initialize: function(){
        var me = this;

        me.setItems([{
            xtype: 'facturaslist',
            flex: 5
        },{
            xtype: 'button',
            text: APP.core.config.Locale.config.lan.FacturasContainer.aplicarPago,
            ui: 'confirm',
            itemId: 'aplicarPago',
            //iconCls: 'action',
            margin: 10
        }]);

        me.callParent(arguments)
    }
});