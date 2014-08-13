Ext.define('APP.view.phone.login.ConfiguracionForm', {
    extend: 'Ext.form.Panel',
    xtype: 'configuracionform',
    config: {
        padding: 15,
        items: [
            {
                xtype: 'fieldset',
                title: 'Datos de Configuración',
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
                        label: 'Codigo de Sociedad'
                    },
                    {
                        xtype: 'textfield',
                        name: 'cod_dis',
                        label: 'Codigo de Dispositivo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'servidor',
                        label: 'Servidor'
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
                text: 'Guardar',
                itemId: 'saveConfiguration',
                margin: '0 auto',
                width: '50%'
            }
        ]
    }
});
