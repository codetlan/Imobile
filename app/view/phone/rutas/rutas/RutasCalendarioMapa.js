/**
 * @class Imobile.view.rutas.Calentario
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */

Ext.define('APP.view.phone.rutas.rutas.RutasCalendarioMapa', {
    extend: 'Ext.Map',
    xtype: 'rutascalendariomapa',
   	nd: undefined,
    config:{
        height:350,
        mapOptions:{
            center:{lat: 19.43261, lng: -99.13321}
        },
        margin:'10px 0'
    }
});