Ext.define('APP.view.phone.cobranza.FacturasList', {
    extend: 'Ext.dataview.List',
    xtype: 'facturaslist',
    requires: [],
    config: {
        //itemCls: 'partida',
        itemTpl: ['<div class="factura">', '<div> <p>Número: <b>{Folio}</b> Saldo: <b>{saldoAMostrar}</b></div> <i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i>',
                  '<div style="font-size: 90%"> <div><p>Fecha: <b>{FechaCreacion}</b> Vencimiento: <b>{FechaFin}</b> </div>',
/*            '<p style="margin: 0px; color: red;">Quantity: <b>{cantidad}</b></p>',            */
            '</div>'].join(''),
        store: 'Facturas',
        selectedCls: 'direc-selected',
        mode: 'MULTI',
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay facturas pendientes</div>',
        loadingText: 'Cargando...'
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
    }
});