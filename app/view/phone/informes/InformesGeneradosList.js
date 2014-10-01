Ext.define('APP.view.phone.informes.InformesGeneradosList', {
    extend: 'Ext.dataview.List',
    xtype: 'informesgeneradoslist',
    requires: [],
    config: {
        //itemCls: 'partida',
        store: 'Informes',
        disableSelection: true

//         itemTpl: ['<div class="factura">', '<div> <p>Código: <b>{codigo}</b> Total: <b>{cantidad}</b></div> <i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i>',
//                   '<div style="font-size: 90%"> <div><p>Fecha: <b>{FechaCreacion}</b> Vencimiento: <b>{FechaFin}</b> </div>',
// /*            '<p style="margin: 0px; color: red;">Quantity: <b>{cantidad}</b></p>',            */
//             '</div>'].join(''),
    },

    initialize: function (){
        var me = this;

        me.setItemTpl(['<div class="factura">', '<div> <p>' + APP.core.config.Locale.config.lan.InformesGeneradosList.codigo +
         ': <b>{codigo}</b><br> ' + APP.core.config.Locale.config.lan.InformesGeneradosList.total +  
         ': <b>{moneda} {importe}</b><br></div> <i style="font-size: 30px;float: right;margin-top: -25px;"></i>',
                  '<div style="font-size: 90%"> <div><p> ' + APP.core.config.Locale.config.lan.InformesGeneradosList.articulos + 
                  ' :<b>{cantidad}</b> </div>',
            '</div>'].join(''));

        me.setEmptyText('<div style="margin-top: 20px; text-align: center">' + 
            APP.core.config.Locale.config.lan.InformesGeneradosList.sinPendientes + '</div>');

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});