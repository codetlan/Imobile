/**
 * Created by th3gr4bb3r on 7/22/14.
 */
Ext.define('APP.view.phone.configuracion.ConfiguracionPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'configuracionpanel',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        padding: 10
    },

    initialize: function(){
        this.setItems ([
            {
                xtype: 'fieldset',
                title: APP.core.config.Locale.config.lan.ConfiguracionPanel.imagenEmpresa,
                flex: 1,
                items: [
                    {
                        xtype: 'component',
                        id: 'imagencmp',
                        height: 'auto'
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 auto',
                flex: 1,
                items: [
                    {
                        itemId: 'fileLoadBtn',
                        xtype: 'button',
                        text: APP.core.config.Locale.config.lan.ConfiguracionPanel.seleccionarImagen,
                        action: 'subirimagen',
                        width: '60%',
                        style: {
                            marginTop: '5%',
                            marginBottom: '5%'
                        }
                    },
                    {
                        xtype: 'spacer',
                        flex: 1
                    },
                    {
                        itemId: 'deleteImage',
                        xtype: 'button',
                        iconCls: 'delete',
                        flex: 1,
                        style: {
                            marginTop: '5%',
                            marginBottom: '5%'
                        }
                    }
                ]
            },
            {
                xtype: 'selectfield',
                name: 'idioma',
                label: APP.core.config.Locale.config.lan.ConfiguracionPanel.idioma,
                labelWidth: '40%',

                options: [
                    {
                        text: 'Español',
                        value: 'es-MX'
                    },
                    {
                        text: 'English',
                        value: 'en-US'
                    }
                ],

                value: APP.core.config.Locale.config.lan.Lenguaje.idioma
            },
            {
                xtype: 'fieldset',
                padding: 10,
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'guardar',
                        //iconCls: 'action',
                        ui: 'confirm',
                        text: APP.core.config.Locale.config.lan.ConfiguracionPanel.guardar
                    }
                ]
            }
        ]);
        this.callParent(arguments);
    }    
});