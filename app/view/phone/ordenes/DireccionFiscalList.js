/**
 * @class Imobile.view.ventas.DireccionFiscalList
 * @extends Ext.dataview.List
 * Description Lista de las direcciones fiscales de los clientes
 */
Ext.define('APP.view.phone.ordenes.DireccionFiscalList', {
    extend: 'Ext.dataview.List',            
    requires: [],
    xtype: 'direccionfiscallist',
    config: { 
    	itemTpl: '{calle}, {colonia}',
        store: 'DireccionesFiscales',
    	onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        loadingText: 'Cargando...'
    }
});