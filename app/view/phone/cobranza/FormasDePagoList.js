/**
 * @class Imobile.view.cobranzas.FormaDePagosList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente al seleccionar las facturas a cobrar
 */
Ext.define('APP.view.phone.cobranza.FormasDePagoList', {
    extend: 'Ext.dataview.List',
    xtype: 'formasdepagolist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{Nombre}',
        store: 'FormasDePago'
        /*data:[
            {title: 'Efectivo', action: 'efectivo'},
            {title: 'Tarjeta de Crédito', action: 'credito'},
            {title: 'Tarjeta de Regalo', action: 'regalo'}
        ]*/
    }
});