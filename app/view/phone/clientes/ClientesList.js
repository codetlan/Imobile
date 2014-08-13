/**
 * @class Imobile.view.clientes.ClientesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('APP.view.phone.clientes.ClientesList', {
    extend: 'Ext.dataview.List',
    xtype: 'clienteslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.SegmentedButton'],
    config: {
        itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{CodigoSocio}</p>', '<span style="color: cadetblue;"><b>{NombreSocio}</b></span>', '</div>'].join(''),
        store: 'Clientes',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay clientes con esos datos</div>',
        disableSelection: true,
        onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            layout:'hbox',
            items: [{
                xtype: 'searchfield',
                itemId: 'buscarClientes',
                placeHolder: ' Buscar cliente...',
                flex: 8
            },{
                xtype: 'button',
                iconCls: 'search',
                itemId: 'btnBuscarClientes',
                flex: 0.5
            }]
        }],
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true,
            loadMoreText: 'Ver Más...'
        }],
        masked: {
            xtype: 'loadmask',
            message: 'Cargando...'
        }
    }
});