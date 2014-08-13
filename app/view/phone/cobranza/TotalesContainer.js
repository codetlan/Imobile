Ext.define('APP.view.phone.cobranza.TotalesContainer', {
    extend: 'Ext.Container',
    xtype: 'totalescontainer',
    requires:['Ext.Label'],
    config: {
        layout: 'hbox',        
        //itemCls: 'factura',
        items: [{   
            xtype: 'container',
            flex: 1,
            itemId: 'aCobrar',  
            html: 'A cobrar',            
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
            html: 'Pagado',
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
            html: 'Pendiente',
            flex: 1,
            itemId: 'pendiente',
            style: {
                background: 'black',
                'color': 'red',
                'margin-righ': '1px',
                'text-align': 'center',
                'font-weight':'bold'
            }
/*            items:[{
                xtype: 'label',
                itemId: 'pendiente'
                //docked: 'bottom'
            }]*/
        }]
    }
});