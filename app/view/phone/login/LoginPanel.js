/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.view.phone.login.LoginPanel', {
    extend: 'Ext.Panel',
    xtype: 'loginpanel',
    requires: ['APP.view.phone.login.ConfiguracionForm'],
    config: {
        layout: 'card',
        activeItem: 0,
        items: [
            {
                xtype: 'container',
                baseCls: 'login-background',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'image',
                        id: 'configloginbutton',
                        src: 'resources/images/engine.png',
                        margin: '10 0 0 0',
                        width: 50,
                        right: 0,
                        height: 30
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                xtype: 'container'
                            },
                            {
                                xtype: 'loginform',
                                baseCls: '',
                                flex: 3
                            },
                            {
                                xtype: 'container'
                            }
                        ]
                    }
                ]

            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'configBackButton',
                        iconCls: 'arrow_left',
                        margin: '10 0 0 0',
                        right: 15
                    },
                    {
                        xtype: 'configuracionform'
                    }
                ]
            }
        ]
    }
});