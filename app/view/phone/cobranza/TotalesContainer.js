Ext.define('APP.view.phone.cobranza.TotalesContainer', {
    extend: 'Ext.Container',
    xtype: 'totalescontainer',
    requires:['Ext.Label'],
    config: {
        layout: 'hbox'
        //itemCls: 'factura',
    },

    initialize: function(){
        var me = this;

        me.setItems([{   
            xtype: 'container',
            flex: 1,
            itemId: 'aCobrar',  
            html: APP.core.config.Locale.config.lan.TotalesContainer.aCobrar,
            cls: 'aCobrar2'
            /*style: {
                background: 'black',
                'color': 'yellow',
                'margin-right': '1px',
                'text-align': 'center',
                'font-weight':'bold',
                'vertical-align':'middle'
            }*/
        },{
            xtype: 'container',
            html: APP.core.config.Locale.config.lan.TotalesContainer.pagado,
            flex: 1,
            itemId: 'pagado',
            style: {
                background: 'black',
                'color': 'green',
                'margin-right': '1px',
                'text-align': 'center',
                'font-weight':'bold'
            }
        },{
            xtype: 'container',
            html: APP.core.config.Locale.config.lan.TotalesContainer.pendiente,
            flex: 1,
            itemId: 'pendiente',
            style: {
                background: 'black',
                'color': 'red',
                'margin-righ': '1px',
                'text-align': 'center',
                'font-weight':'bold'
            }
        }]);

    me.callParent(arguments);
    }
});