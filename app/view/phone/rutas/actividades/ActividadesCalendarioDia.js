/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.actividades.ActividadesCalendarioDia', {
    extend: 'Ext.dataview.List',
    xtype: 'actividadescalendariodia',
    config: {
        itemTpl:new Ext.XTemplate(
            '<tpl>',
            '<div style="text-align: right; color:#999999; font-size:12px;">{[this.dateParser(values.HoraInicio)]} - {[this.dateParser(values.HoraFin)]}</div><div>{title}</div>',
            '</tpl>',{
                dateParser: function(data){
                    return data.substr(0,data.length - 3);
                }
            }
        ),
        store: new Ext.data.Store({
            model: 'APP.model.phone.ActividadCalendario',
            data: []
        })
    }
});