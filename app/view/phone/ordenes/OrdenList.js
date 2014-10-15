Ext.define('APP.view.phone.ordenes.OrdenList', {
    extend: 'Ext.dataview.List',
    xtype: 'ordenlist',
    requires: [],
    config: {
        styleHtmlContent:true,
        styleHtmlCls:'testHtml',
        overItemCls:'testOver',
        selectedItemCls:'testSelect',
        pressedCls:'testPress',
        itemCls: 'partida',
        height:"100%",
        store: 'Ordenes'
    },

    initialize: function(){
        this.setItemTpl(['<section>',
            '<span id="imagen"><img src="{Imagen}" width="60px" height="60px"></span>',
            '<span>',
            '<p style="margin: 0px;">{CodigoArticulo}</p>',
            '<p style="margin: 0px;"><b>{nombreMostrado}</b></p>',
            '<p style="margin: 0px; color: red;">' + APP.core.config.Locale.config.lan.OrdenList.cantidad +' <b>{cantidad}</b></p>',
            '</span>',
            '<span>',
            '<p style="margin: 0px;">' + APP.core.config.Locale.config.lan.OrdenList.precio + ' {precioConDescuento} </p>',
            '<p style="margin: 0px;">' + APP.core.config.Locale.config.lan.OrdenList.descuento + ' {PorcentajeDescuento}</p>',
            '<p style="margin: 0px;"><b>' + APP.core.config.Locale.config.lan.OrdenList.total + ' {importe}</b></p>',
            '</span></section>'].join(''));

        this.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);
        this.callParent(arguments);
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
    }
});