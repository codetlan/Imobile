/**
 * Esta es la lista de las opciones de informes.
 */
Ext.define('APP.view.phone.informes.InformesList', {
    extend: 'Ext.dataview.List',
    xtype: 'informeslist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        itemTpl: '{title}',        
        modulo: 'informes'
    },

    initialize: function(){
        var me = this;

        me.setData([
            {title: APP.core.config.Locale.config.lan.InformesList.bitacoraVendedores, action: 'bitacoraVendedores'},
            {title: APP.core.config.Locale.config.lan.InformesList.analisisVentas, action: 'analisisVentas'}            
        ]);

        me.callParent(arguments);
    }
});