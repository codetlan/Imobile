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
        itemTpl: ['<section>',
            '<span id="imagen"><img src="{Imagen}" width="60px" height="60px"></span>',
            '<span>',
            '<p style="margin: 0px;">{CodigoArticulo}</p>',
            '<p style="margin: 0px;"><b>{nombreMostrado}</b></p>',
            '<p style="margin: 0px; color: red;">Cantidad: <b>{cantidad}</b></p>',
            '</span>',
            '<span>',
            '<p style="margin: 0px;">Precio: {precioConDescuento} </p>',
            '<p style="margin: 0px;">Desc: {PorcentajeDescuento}</p>',
            '<p style="margin: 0px;"><b>Total: {importe}</b></p>',
            '</span></section>'].join(''),
        store: 'Ordenes'
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
    }
});