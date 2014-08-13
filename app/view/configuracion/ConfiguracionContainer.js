/**
 * @class Imobile.view.configuracion.ConfiguracionContainer
 * @extends Ext.Container
 * Este es para las configuraciones de imobile
 */
Ext.define('Imobile.view.configuracion.ConfiguracionContainer', {
    extend: 'Ext.Container',
    requires: ['Ext.Img', 'Ext.field.Select', 'Ext.field.Toggle'/*, 'Ext.ux.Fileup'*/],

    xtype: 'configuracioncontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                xtype: 'fieldset',
                title: 'Imagen de la empresa',
                padding: 10,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    flex: 1
                },
                items: [
                    {xtype: 'component'}
                    /*{
                        itemId: 'loadedImage',
                        xtype: 'img',
                        width: '200px',
                        height: '200px',
                        style: 'margin-top:15px;',
                        src: localStorage.getItem('image')
                    },
                    {xtype: 'component'}*/
                ]
            },
            {
                itemId: 'fileLoadBtn',
                xtype: 'fileupload',
                autoUpload: true,
                loadAsDataUrl: true,
                states: {
                    browse: {
                        text: 'Browse and load'
                    },
                    ready: {
                        text: 'Load'
                    },

                    uploading: {
                        text: 'Loading',
                        loading: true
                    }
                }

                // For success and failure callbacks setup look into controller
            },
            {
                xtype: 'formpanel',
                height: 132,
                autoHeight: true,
                defaults: {
                    labelWidth: '55%'
                },
                items: [
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
                        xtype: 'togglefield',
                        label: 'Opcion 1'
                    },
                    {
                        xtype: 'togglefield',
                        label: 'Opcion 2'
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
                        iconCls: 'action',
                        ui: 'confirm',
                        text: 'Guardar Cambios'
                    }
                ]
            }
        ]
    }
});