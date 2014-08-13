Ext.define('APP.view.phone.ordenes.OrdenContainer', {
    extend: 'Ext.Container',
    xtype: 'ordencontainer',
    config: {
        layout: 'vbox',
        xtype: 'container',
        docked: 'bottom',
        items: {
            layout: 'hbox',
            items: [
                {
                    xtype: 'container',
                    html: 'Descuento',
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
                    html: 'Subtotal',
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
                    html: 'Impuesto',
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
                    html: 'Total',
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
        }
    }
});