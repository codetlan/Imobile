/**
 * @class Imobile.view.configuracion.ConfiguracionList
 * @extends Ext.dataview.List
 * Esta es la lista para mostrar las opciones de configuración
 */
Ext.define('Imobile.view.configuracion.ConfiguracionList', {
    extend: 'Ext.dataview.List',
    xtype: 'configuracionlist',
    //requires: ['Ext.field.Search', 'Ext.plugin.ListPaging', 'Ext.SegmentedButton'],
    config: {
        //indexBar: true,
        //pinHeaders: false,
        // itemTpl: ['<div class="imobile-cliente-tpl">', '<p>{code}</p>', '<span style="color: cadetblue;"><b>{name}</b></span>', '</div>'].join(''),
        // store: 'Clientes',
        //useSimpleItems: true,
        // emptyText: '<div style="margin-top: 20px; text-align: center">No hay clientes con esos datos</div>',
        //disableSelection: true,
        // onItemDisclosure: function (record, listItem, index, e) {
        //     this.fireEvent("tap", record, listItem, index, e);
        // },
        fullscreen: true,        
        itemTpl: '<i class="{icon}"> </i>{title}',
        data: [
            { title: 'Conectividad del Servidor', action: 'servidor', icon: 'icon-cloud'},
//            { title: 'Inicialización del dispositivo', action: 'inicializacion', icon: 'icon-mobile'},
//            { title: 'Sincronización', action: 'sincronizacion', icon: 'icon-arrows-cw'},
            { title: 'Configuración', action: 'configuracion', icon: 'icon-cog-alt'}
        ]
        // plugins: [{
        //     xclass: 'Ext.plugin.ListPaging',
        //     autoPaging: true
        // }]
    }
});