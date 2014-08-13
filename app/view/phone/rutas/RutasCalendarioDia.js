/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.RutasCalendarioDia', {
    extend: 'Ext.dataview.List',
    xtype: 'rutascalendariodia',
    config: {
        itemTpl:new Ext.XTemplate(
            '<tpl>',
            '<div style="padding:0 3px;">{[this.dateParser(values.start)]} - {[this.dateParser(values.end)]} {title}</div>',
            '</tpl>',{
                dateParser: function(data){
                    console.log(data);
                    return Ext.util.Format.date(data,"H:i");
                }
            }
        ),
        store: new Ext.data.Store({
            model: 'APP.model.phone.RutaCalendario',
            data: []
        })
    }
});