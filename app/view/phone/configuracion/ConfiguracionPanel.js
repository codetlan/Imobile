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
        padding: 10,
        items: [
            {
                xtype: 'fieldset',
                title: 'Imagen de la empresa',
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
                        text: 'Seleccionar imagen',
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
                label: 'Idioma',
                options: [
                    {
                        text: 'Español',
                        value: 'es'
                    },
                    {
                        text: 'Inglés',
                        value: 'en'
                    },
                    {
                        text: 'Portugués',
                        value: 'pes'
                    }
                ]
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
                        text: 'Guardar Cambios'
                    }
                ]
            }
        ]
    }
});