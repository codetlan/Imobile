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
        items: [{
            xtype: 'menulist'
        }]
    }
});