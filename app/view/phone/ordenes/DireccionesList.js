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
        itemTpl: '{title}',
        //scrollable: null,
        data:[
            {title: 'Dirección de entrega', action: 'entrega'},
            {title: 'Dirección fiscal', action: 'fiscal'}
        ],
        loadingText: 'Cargando...'
    }
});