Ext.define('Imobile.view.menu.Menu', {
    extend: 'Ext.NavigationView',
    xtype: 'menu',
    requires: [
        'Imobile.view.menu.MenuList'
    ],
    config: {
        navigationBar: {            
            items:[
                {
                    xtype: 'button',
                    align: 'right',
                    iconCls: 'logo'
                }]
        },
        items: [
            {
                xtype: 'menulist'
            }
        ]
    }
});