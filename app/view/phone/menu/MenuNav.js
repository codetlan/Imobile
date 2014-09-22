/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.view.phone.menu.MenuNav', {
    extend: 'Ext.NavigationView',
    xtype: 'menunav',
    config: {
        navigationBar: {
            items:[{
                xtype: 'button',
                align: 'right',
                iconCls: 'logo'
            }]
        },
/*         masked:{
            xtype: 'loadmask',
            message: 'Trabajando...',
            fullscreen: true,
            indicator: true
        },*/
        items: [{
            xtype: 'menulist'
        }]
    }
});