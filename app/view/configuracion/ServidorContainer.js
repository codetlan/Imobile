/**
 * @class Imobile.view.configuracion.ServidorContainer
 * @extends Ext.Container
 * Este es el contenedor para sincronizar la aplicacion con el servidor
 */
Ext.define('Imobile.view.configuracion.ServidorContainer', {
    extend: 'Ext.Container',
    xtype: 'servidorcontainer',

    requires:['Ext.field.Url','Ext.field.Url'],

    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        //padding: 10,
        items: [{
            xtype: 'fieldset',
            padding: 10,
            title: 'URL del Servidor Central',
            items:[{
                xtype:'urlfield',
                name:'url',
                placeHolder: 'http://corpotek.com',
                clearIcon: true
            }]
        },{
            xtype: 'fieldset',
            padding: 10,
            title: 'Código de Razón Social',
            items:[{
                xtype:'textfield',
                placeHolder: 'AFG234GG'
            }]
        }, {
            xtype: 'fieldset',
            //instructions: 'Esta operación puede tomar varios minutos',
            padding: 10,
            margin:'10 0 0 0',
            items: [{
                xtype: 'button',
                itemId: 'guardar',
                iconCls: 'action',
                ui: 'confirm',
                text: 'Guardar Datos'
            }]
        }]
    }
});