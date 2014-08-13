/**
 * @class Imobile.view.rutas.Calentario
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.RutasCalendario', {
    extend: 'Ext.ux.calendar.TouchCalendar',
    xtype: 'rutascalendario',
    config:{
        viewMode: 'month',
        weekStart: 0,

        viewConfig:{
            eventStore:Ext.create('APP.store.phone.RutasCalendario')
        },
        plugins: [new Ext.ux.calendar.TouchCalendarSimpleEvents()]
    }
});