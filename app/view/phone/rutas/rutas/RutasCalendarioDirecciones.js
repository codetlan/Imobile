/**
 * @class Imobile.view.rutas.Calentario
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */

Ext.define('APP.view.phone.rutas.rutas.RutasCalendarioDirecciones', {
    extend: 'Ext.dataview.List',
    xtype: 'rutascalendariodirecciones',
    config:{
        height:120,
        itemTpl:new Ext.XTemplate(
            '<tpl>',
                '<div style="font-size:10px;">{Calle} {NoExterior} {NoInterior} {Colonia} {Ciudad} {Municipio} {Estado} </div>',
            '</tpl>'
        ),
        store: new Ext.data.Store({
            model:'APP.model.phone.RutaCalendarioDirecciones',
            data: []
        })
    }
});