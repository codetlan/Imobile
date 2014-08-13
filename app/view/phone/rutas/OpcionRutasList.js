/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.OpcionRutasList', {
    extend: 'Ext.dataview.List',
    xtype: 'opcionrutaslist',
    config: {
        itemTpl: '{title}',
        data:[
            {title: 'Calendario', action: 'calendario'},
            {title: 'Registrar visita', action: 'registrar'}
        ]
    }
});