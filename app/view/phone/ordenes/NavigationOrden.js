Ext.define('APP.view.phone.ordenes.NavigationOrden', {
    extend: 'Ext.NavigationView',
    xtype: 'navigationorden',
    config: {
        navigationBar: {
            items:[{
                xtype: 'button',
                align: 'right',
                iconCls: 'logo'
            },{
                xtype: 'button',
                text:'Agregar',
                align: 'left',
                itemId: 'agregarProductos'
            }]
        },
        masked:{
            xtype: 'loadmask',
            message: 'Trabajando...',
            fullscreen: true,
            indicator: true
        },
        items: [{
            xtype: 'opcionesorden'
        }]
    }
});