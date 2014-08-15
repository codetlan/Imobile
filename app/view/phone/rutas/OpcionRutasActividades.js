/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.OpcionRutasActividades', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionrutasactividades',
    config: {
        itemTpl: '{title}',
        data:[
            {title: 'Rutas', action: 'rutas'},
            {title: 'Actividades', action: 'actividades'}
        ]
    }
});