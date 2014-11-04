/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.OpcionRutasActividades', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionrutasactividades',
    config: {
        itemTpl: '{title}'
    },

    initialize: function (){
    	var me = this;

        me.setData([        			
            {title: APP.core.config.Locale.config.lan.Actividades.rutas, action: 'rutas'},
            {title: APP.core.config.Locale.config.lan.Actividades.actividades, action: 'actividades'}            
        ]);

        me.callParent(arguments);
    }
});