/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('APP.form.phone.rutas.RutasForm', {
    extend: 'Ext.form.Panel',
    xtype: 'rutasform',
    config: {
        layout:'fit'
    },

    initialize: function(){
        var me = this;

        me.setItems ([{
            xtype:'fieldset',
            scrollable: {
                direction: 'vertical',
                directionLock: true
            },
            defaults:{
                labelWidth:'30%',
                required:true,
                labelCls: 'labels',
                inputCls: 'labels'
            },
            items:[{
                xtype:'hiddenfield',
                name:'CodigoRuta'
            },{
                xtype:'hiddenfield',
                name:'CodigoCliente'
            },{
                xtype:'hiddenfield',
                name:'TipoDireccion'
            },{
                xtype:'hiddenfield',
                name:'CodigoDireccion'
            },{
                xtype:'hiddenfield',
                name:'LatitudOrigen'
            },{
                xtype:'hiddenfield',
                name:'LongitudOrigen'
            },{
                xtype: 'textfield',
                name: 'Descripcion',
                label: APP.core.config.Locale.config.lan.Actividades.titulo
            },{
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.Actividades.empieza,
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[{
                    xtype:'datepickerfield',
                    border:0,
                    name:'FechaInicio',
                    dateFormat: "d/m/Y",
                    readOnly:true
                },{
                    xtype: 'timepickerfield',
                    name: 'HoraInicio',
                    value: Ext.Date.add(new Date(), Ext.Date.MINUTE, 5)
                }]
            },{
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.Actividades.termina,
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[{
                    xtype:'datepickerfield',
                    name:'FechaFin',
                    value: new Date(),
                    dateFormat: "d/m/Y"
                },{
                    xtype: 'timepickerfield',
                    name: 'HoraFin',
                    value: Ext.Date.add(Ext.Date.add(new Date(), Ext.Date.MINUTE, 5), Ext.Date.HOUR, 1)
                }]

            },{
                xtype: 'checkboxfield',
                name: 'Repetir',
                label: APP.core.config.Locale.config.lan.Actividades.repetir,
                required:false
            },{
                xtype:'fieldset',
                id:'rutasrepetir',
                hidden:true,
                defaults:{
                    labelWidth:'30%',
                    labelCls: 'labels',
                    inputCls: 'labels'
                },
                items:[{
                    xtype: 'checkboxfield',
                    name: 'Lunes',
                    label: APP.core.config.Locale.config.lan.Actividades.lunes
                },{
                    xtype: 'checkboxfield',
                    name: 'Martes',
                    label: APP.core.config.Locale.config.lan.Actividades.martes
                },{
                    xtype: 'checkboxfield',
                    name: 'Miercoles',
                    label: APP.core.config.Locale.config.lan.Actividades.miercoles
                },{
                    xtype: 'checkboxfield',
                    name: 'Jueves',
                    label: APP.core.config.Locale.config.lan.Actividades.jueves
                },{
                    xtype: 'checkboxfield',
                    name: 'Viernes',
                    label: APP.core.config.Locale.config.lan.Actividades.viernes
                },{
                    xtype: 'checkboxfield',
                    name: 'Sabado',
                    label: APP.core.config.Locale.config.lan.Actividades.sabado
                },{
                    xtype: 'checkboxfield',
                    name: 'Domingo',
                    label: APP.core.config.Locale.config.lan.Actividades.domingo
                }]
            },{
                xtype: 'textareafield',
                name: 'Notas',
                label: APP.core.config.Locale.config.lan.Actividades.notas,
                labelAlign:'top',
                required:false
            },{
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.Actividades.direccion,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                items:[{
                    xtype:'rutascalendariodirecciones'
                },{
                    xtype:'rutascalendariomapa'
                }]
            },{
                xtype:'container',
                itemId: 'btnGuardar',
                docked: 'bottom',

                items:[{
                    xtype:'button',
                    margin: 10,
                    text: APP.core.config.Locale.config.lan.Actividades.guardar,
                    action:'guardar'
                }]
            }]
        }]);

        me.callParent(arguments);
    }
});