Ext.define('APP.view.phone.ordenes.OrdenContainer', {
    extend: 'Ext.Container',
    xtype: 'ordencontainer',
    config: {
        layout: 'vbox',
        xtype: 'container',
        docked: 'bottom'
    },

    initialize: function(){
        this.setItems({
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    html: APP.core.config.Locale.config.lan.OrdenContainer.descuento,
                    flex: 1.2,
                    height: 50,
                    itemId: 'descuento',
                    style: {
                        background: '#696969',
                        'color': 'white',
                        'margin-right': '1px',
                        'text-align': 'center',
                        'font-weight': 'bold',
                        'vertical-align': 'middle',
                        'font-size': '12px'
                    }
                },
                {
                    xtype: 'container',
                    html: APP.core.config.Locale.config.lan.OrdenContainer.subTotal,
                    flex: 1,
                    itemId: 'subtotal',
                    style: {
                        background: '#696969',
                        'color': 'white',
                        'margin-right': '1px',
                        'text-align': 'center',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },
                {
                    xtype: 'container',
                    html: APP.core.config.Locale.config.lan.OrdenContainer.impuesto,
                    flex: 1,
                    itemId: 'tax',
                    style: {
                        background: '#696969',
                        'color': 'white',
                        'margin-right': '1px',
                        'text-align': 'center',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },
                {
                    xtype: 'container',
                    html: APP.core.config.Locale.config.lan.OrdenContainer.total,
                    flex: 1,
                    itemId: 'total',
                    style: {
                        background: '#A9A9A9',
                        'color': 'black',
                        'margin-right': '1px',
                        'text-align': 'center',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }
            ]
        });
        this.callParent(arguments);
    }
});