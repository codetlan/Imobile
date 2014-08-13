/**
 * @class Imobile.view.configuracion.InitializeContainer
 * @extends Ext.Container
 * Este es el contendor para la inicializacion del panel
 */
Ext.define('Imobile.view.configuracion.InitializeContainer', {
    extend: 'Ext.Container',
    xtype: 'initializecontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            flex: 3
        },
        items: [{
            xtype: 'container'
        }, {
            xtype: 'fieldset',
            instructions: 'Esta operación puede tomar algunos minutos',
            padding: 15,
            flex: 2,
            items: [{
                xtype: 'button',
                itemId: 'sincronizar',
                iconCls: 'download',
                ui: 'confirm',
                text: 'Inicializar Dispositivo'
            }]
        }, {
            xtype: 'container'
        }]
    }
});