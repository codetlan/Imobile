/**
 * @class Imobile.view.ventas.DireccionesList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.ordenes.DireccionesList', {
    extend: 'Ext.dataview.List',
    xtype: 'direccioneslist',
    config: {
        striped: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },        
        itemTpl: '{title}'
    },

    initialize: function(){
        var me = this;

        me.setData([
            {title: APP.core.config.Locale.config.lan.DireccionesList.entrega, action: 'entrega'},
            {title: APP.core.config.Locale.config.lan.DireccionesList.fiscal, action: 'fiscal'}
        ]);

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);
        me.callParent(arguments);
    }        
});