/**
 * @class APP.view.phone.rutas.actividades.ActividadesCalendarioDia
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.actividades.ActividadesCalendarioDia', {
    extend: 'Ext.dataview.List',
    xtype: 'actividadescalendariodia',
    config: {
        itemTpl:new Ext.XTemplate(
            '<tpl>',

            '<div style="border-left:5px solid {[this.backColor(values.Estatus,values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin)]}; padding-left:5px;">',
                '<div style="text-align: right; color:#999999; font-size:14px;">',
                   '{FechaInicio} {[this.dateParser(values.HoraInicio)]} - {FechaFin} {[this.dateParser(values.HoraFin)]}',
                '</div>',
                '<div>{title}</div>',
            '</div>',
            '</tpl>',{
                dateParser: function(data){
                    return data.substr(0,data.length - 3);
                },
                backColor:function(status){
                    console.log(status);
                    switch(status){
                        case 0:
                            return "#F90000";//"lightred";
                            break;
                        case 1:
                            return "#1D7A28";//"lightblue";
                            break;
                        case 2:
                            return "#FFFF00"//"lightgreen";
                            break;
                        case 3:
                            return "#C0C0C0";
                            break;

                    }
                }
            }
        ),
        store: new Ext.data.Store({
            model: 'APP.model.phone.ActividadCalendario',
            data: []
        })
    },

    initialize: function(){
        var me = this;

        me.setEmptyText(APP.core.config.Locale.config.lan.Actividades.sinActividades);

        me.callParent(arguments);
    }
});