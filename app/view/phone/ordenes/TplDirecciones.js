/**
 * @class Imobile.view.ventas.TplDirecciones
 * @extends Ext.dataview.List
 * Esta es la lista para listar las direcciones
 */
Ext.define('APP.view.phone.ordenes.TplDirecciones', {
    extend: 'Ext.dataview.List',
    xtype: 'tpldirecciones',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.MessageBox'],
    config: {
        //indexBar: true,
        pinHeaders: false,
        itemTpl: ['<tpl for="."><tpl if="Predeterminado == true"><div class="imobile-cliente-tpl direc-selected"><tpl else><div class="imobile-cliente-tpl"></tpl>', '<span><p>{Calle} {NoExterior} {NoInterior} {Colonia} {Municipio} </p></span>', '<span><b>{cp} {Ciudad} {Estado} {CodigoPostal}</b></span> </br>', '<span style="color: red;">{Pais} </span>', '<i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i></div></tpl>'].join(''),
        store: 'Direcciones',
        mode: 'SINGLE',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay direcciones con esos datos</div>',
        //disableSelection: true,
        /*onItemDisclosure: function (record, listItem, index, e) {
            this.fireEvent("tap", record, listItem, index, e);
        },*/
        selectedCls: 'direc-selected'
    }
});