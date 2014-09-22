/**
 * @class Imobile.view.cobranza.TotalAPagarContainer
 * @extends extendsClass
 * Description
 */
Ext.define('APP.view.phone.cobranza.TotalAPagarContainer', {
    extend: 'Ext.Container',    
    xtype: 'totalapagarcontainer',
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
            style:{
                background: 'gray'
            },
            xtype: 'totalapagarlist',
            flex: 5,

            },{
                xtype: 'totalescontainer',
                flex: 1
            },{
                xtype: 'container',
                layout: 'hbox',
                items:[{
                    xtype: 'button',
                    text: APP.core.config.Locale.config.lan.TotalAPagarContainer.terminar,
                    ui: 'confirm',
                    itemId: 'terminar',
                    margin: 10,
                    flex: 1
                },{
                    xtype: 'button',
                    text: APP.core.config.Locale.config.lan.TotalAPagarContainer.cancelar,
                    ui: 'decline',
                    itemId: 'cancelar',
                    margin: 10,
                    flex: 1 
                }]
            }]);

        me.callParent(arguments);
    }
});