/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.RutasCalendarioCont', {
    extend: 'Ext.Container',
    xtype: 'rutascalendariocont',
    initialize : function() {
        this.callParent();
        this.setItems([{
            xtype:'button',
            action:'agregar',
            text: 'Agregar'
        },{
            xtype:'container',
            html:"<div style='text-align:center; padding:3px; color:#1F83FB;'>" + Ext.util.Format.date(this.nd,"l d/m/y") + "</div>"
        },{
            xtype:'rutascalendariodia',
            flex:1
        }]);


    },
    config:{
        layout:{
            type:'vbox',
            align:'stretch'
        }
    }
});