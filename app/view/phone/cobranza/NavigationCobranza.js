Ext.define('APP.view.phone.cobranza.NavigationCobranza', {
    extend: 'Ext.NavigationView',
    xtype: 'navigationcobranza',
    config: {
        navigationBar: {
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'logo'
                },
                {
                    xtype: 'button',
                    text:'Agregar',
                    align: 'left',
                    itemId: 'agregarPago'
                }
            ]
        },

        masked:{
            xtype: 'loadmask',
            message: 'Trabajando...',
            fullscreen: true,
            indicator: true
        },

        items: [{
            xtype: 'totalapagarcontainer'
        }]
    }
});