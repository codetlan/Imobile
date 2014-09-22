Ext.define('APP.view.phone.login.ConfiguracionForm', {
    extend: 'Ext.form.Panel',
    xtype: 'configuracionform',
    config: {
        padding: 15,
    },

    initialize: function (){
        var me = this;

        me.setItems([
            {
                xtype: 'fieldset',
                title: APP.core.config.Locale.config.lan.ConfiguracionForm.titulo,
                defaults: {
                    clearIcon: true,
                    autoCapitalize: true,
                    labelWidth: '55%'
                },
                style: {
                    fontSize: '13px',
                    marginTop: '70px',
                    marginBottom: '20px'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'cod_soc',
                        label: APP.core.config.Locale.config.lan.ConfiguracionForm.codigoSociedad
                    },
                    {
                        xtype: 'textfield',
                        name: 'cod_dis',
                        label: APP.core.config.Locale.config.lan.ConfiguracionForm.codigoDispositivo
                    },
                    {
                        xtype: 'textfield',
                        name: 'servidor',
                        label: APP.core.config.Locale.config.lan.ConfiguracionForm.servidor
                    }/*,
                    {
                        xtype: 'selectfield',
                        name: 'idioma',
                        label: 'Idioma',
                        options: [
                            {
                                text: 'Español',
                                value: 'es'
                            },
                            {
                                text: 'Inglés',
                                value: 'en'
                            }
                        ]
                    }*/
                ]
            },
            {
                xtype: 'button',
                text: APP.core.config.Locale.config.lan.ConfiguracionForm.guardar,
                itemId: 'saveConfiguration',
                margin: '0 auto',
                width: '50%'
            }
        ]);

        me.callParent(arguments);
    }
});
