/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.rutas.RutasCalendarioDia', {
    extend: 'Ext.dataview.List',
    xtype: 'rutascalendariodia',
    nd:undefined,
    idCliente:undefined,
    direcciones:undefined,
    config: {
        emptyText:'No tiene rutas este día',
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

                    switch(status){
                        case 0:
                            return "lightred";
                            break;
                        case 1:
                            return "lightblue";
                            break;
                        case 2:
                            return "lightgreen";
                            break;
                        case 3:
                            return "#ff6600";
                            break;

                    }
                }
            }
        ),
        store: new Ext.data.Store({
            model: 'APP.model.phone.RutaCalendario',
            data: []
        })
    }
});