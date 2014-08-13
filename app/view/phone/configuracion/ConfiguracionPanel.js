/**
 * Created by th3gr4bb3r on 7/22/14.
 */
Ext.define('APP.view.phone.configuracion.ConfiguracionPanel', {
    extend: 'Ext.Panel',
    xtype: 'configuracionpanel',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
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
            items: [{
                xtype: 'component',
                id:'imagencmp'
            }]
        },{
            itemId: 'fileLoadBtn',
            xtype: 'button',
            text:'Seleccionar imagen',
            action:'subirimagen'
        },{
            xtype: 'formpanel',
            height: 132,
            autoHeight: true,
            defaults: {
                labelWidth: '55%'
            },
            items: [{
                xtype: 'selectfield',
                name: 'idioma',
                label: 'Idioma',
                options: [{
                    text: 'Español',
                    value: 'es'
                },{
                    text: 'Inglés',
                    value: 'en'
                },{
                    text: 'Portugués',
                    value: 'pes'
                }]
            },{
                    xtype: 'togglefield',
                    label: 'Opcion 1'
            },{
                xtype: 'togglefield',
                label: 'Opcion x'
            }]
        },{
            xtype: 'fieldset',
            padding: 10,
            docked: 'bottom',
            items: [{
                xtype: 'button',
                itemId: 'guardar',
                iconCls: 'action',
                ui: 'confirm',
                text: 'Guardar Cambios'
            }]
        }]
    }
});