/**
 * @class Imobile.view.ventas.ClienteContainer
 * @extends Ext.Container
 * Description
 */
Ext.define('APP.view.phone.ordenes.ClienteContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'clientecontainer',
    config: {
        layout: 'fit',
        items: [{
            padding: 7,
            xtype: 'clienteform',
            flex: 1
        }]
    }
});