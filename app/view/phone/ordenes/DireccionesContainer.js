/**
 * @class Imobile.view.ventas.DireccionesContainer
 * @extends extendsClass
 * Description
 */
Ext.define('APP.view.phone.ordenes.DireccionesContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'direccionescontainer',
    config: {
    	//scrollable: false,
        layout: 'fit',        
        items: [{
            xtype: 'direccioneslist'
        }]
    }
});