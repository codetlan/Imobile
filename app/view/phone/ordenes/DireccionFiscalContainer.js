/**
 * @class Imobile.view.ventas.DireccionFiscalContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('APP.view.phone.ordenes.DireccionFiscalContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'direccionfiscalcontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'fit',
        items: [{
            xtype: 'direccionfiscallist'
        }]
    }
});