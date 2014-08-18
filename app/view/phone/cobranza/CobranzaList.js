/**
 * @class Imobile.view.cobranzas.CobranzaList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente al seleccionar cobranza
 */
Ext.define('APP.view.phone.cobranza.CobranzaList', {
    extend: 'Ext.dataview.List',
    xtype: 'cobranzalist',
    config: {
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);            
        },
        itemTpl: '{title}',
        data:[
            {title: 'Cobranza de facturas', action: 'cobranzaFacturas'},
            {title: 'Anticipo de pedido', action: 'anticipo'},
            {title: 'Visualizar cobranzas', action: 'visualizarCobranza'}
        ],
        loadingText: 'Cargando...'
    }
});