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
                text: APP.core.config.Locale.config.lan.NavigationOrden.agregar,
                align: 'left',
                itemId: 'agregarProductos'
            }]
        },
/*        masked:{
            xtype: 'loadmask',
            message: 'Trabajando...',
            fullscreen: true,
            indicator: true
        },*/
        items: [{
            xtype: 'opcionesorden'
        }]
    }

//     initialize: function(){
//         console.log('NavigationOrden');
//         var me = this;

//         // me.setNavigationBar({
//         //     items:[{
//         //         xtype: 'button',
//         //         align: 'right',
//         //         iconCls: 'logo'
//         //     },{
//         //         xtype: 'button',
//         //         text: APP.core.config.Locale.config.lan.NavigationOrden.agregar,
//         //         align: 'left',
//         //         itemId: 'agregarProductos'
//         //     }]
//         // });

//         //console.log(this.config.items);
        
//         me.config.navigationBar.items[1].text=APP.core.config.Locale.config.lan.NavigationOrden.agregar;
//         // me.config.navigationBar.items.push({
//         //     xtype: 'button',
//         //     text: APP.core.config.Locale.config.lan.NavigationOrden.agregar,
//         //     align: 'left',
//         //     itemId: 'agregarProductos'
//         // });
//         console.log(me.config.navigationBar);
        
        
//         /*({
//                 xtype: 'button',
//                 text: APP.core.config.Locale.config.lan.NavigationOrden.agregar,
//                 align: 'left',
//                 itemId: 'agregarProductos'
//             });*/

        
// /*        me.setNavigationBar({
//             items:[{
//                 xtype: 'button',
//                 align: 'right',
//                 iconCls: 'logo'
//             },{
//                 xtype: 'button',
//                 text: APP.core.config.Locale.config.lan.NavigationOrden.agregar,
//                 align: 'left',
//                 itemId: 'agregarProductos'
//             }]
//         });*/

//         // this.setItems([{
//         //     xtype: 'opcionesorden'
//         // }]);
//         // console.log(me.config.navigationBar)
//          me.callParent(arguments);
//     }
});