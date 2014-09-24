Ext.define('APP.view.phone.cobranza.FacturasList', {
    extend: 'Ext.dataview.List',
    xtype: 'facturaslist',
    requires: [],
    config: {
        //itemCls: 'partida',
        store: 'Facturas',
        selectedCls: 'direc-selected',
        mode: 'MULTI'        
    },

    onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e); 
    },

    initialize: function (){
        var me = this;

        me.setItemTpl(['<div class="factura">', '<div> <p>' + APP.core.config.Locale.config.lan.FacturasList.numero +
         ': <b>{Folio}</b> ' + APP.core.config.Locale.config.lan.FacturasList.saldo +  
         ': <b>{saldoAMostrar}</b></div> <i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i>',
                  '<div style="font-size: 90%"> <div><p> ' + APP.core.config.Locale.config.lan.FacturasList.fecha + 
                  ' :<b>{FechaCreacion}</b> ' + APP.core.config.Locale.config.lan.FacturasList.vencimiento + 
                  ': <b>{FechaFin}</b> </div>',
            '</div>'].join(''));

        me.setEmptyText('<div style="margin-top: 20px; text-align: center">' + 
            APP.core.config.Locale.config.lan.FacturasList.noFacturasPendientes + '</div>');

        me.setLoadingText(APP.core.config.Locale.config.lan.ClientesList.cargando);

        me.callParent(arguments);
    }
});