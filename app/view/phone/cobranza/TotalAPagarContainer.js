/**
 * @class Imobile.view.cobranza.TotalAPagarContainer
 * @extends extendsClass
 * Description
 */
Ext.define('APP.view.phone.cobranza.TotalAPagarContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'totalapagarcontainer',
    config: {
        /*scrollable: {
            direction: 'vertical',
            directionLock: true
        },*/
        layout: 'vbox',
        //activeItem: 0,
        items: [{
            style:{
                background: 'gray'
            },
            xtype: 'totalapagarlist',
            flex: 5/*,

            layout: 'fit',
            items: [{
                docked: 'bottom',
                xtype: 'toolbar',
                items: [{
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text:'Agregar Orden',
                    itemId: 'agregarOrden'
                }, {
                    xtype: 'spacer'
                }]
            }]*/
        },{
            xtype: 'totalescontainer',
            flex: 1
        },{
            xtype: 'container',
            layout: 'hbox',
            items:[{
                xtype: 'button',
                text: 'Terminar',
                ui: 'confirm',
                itemId: 'terminar',
                margin: 10,
                flex: 1
            },{
                xtype: 'button',
                text: 'Cancelar',
                ui: 'decline',
                itemId: 'cancelar',
                margin: 10,
                flex: 1 
            }]
        }
        ]
    }
});