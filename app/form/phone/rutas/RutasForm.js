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
                label:'Título'
            },{
                xtype:'fieldset',
                title:'Empieza',
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
                title:'Termina',
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
                label: 'Repetir',
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
                    label: 'Lunes'
                },{
                    xtype: 'checkboxfield',
                    name: 'Martes',
                    label: 'Martes'
                },{
                    xtype: 'checkboxfield',
                    name: 'Miercoles',
                    label: 'Miercoles'
                },{
                    xtype: 'checkboxfield',
                    name: 'Jueves',
                    label: 'Jueves'
                },{
                    xtype: 'checkboxfield',
                    name: 'Viernes',
                    label: 'Viernes'
                },{
                    xtype: 'checkboxfield',
                    name: 'Sabado',
                    label: 'Sabado'
                },{
                    xtype: 'checkboxfield',
                    name: 'Domingo',
                    label: 'Domingo'
                }]
            },{
                xtype: 'textareafield',
                name: 'Notas',
                label: 'Notas',
                labelAlign:'top',
                required:false
            },{
                xtype:'fieldset',
                title:'Seleccione una dirección',
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
                    text:'Guardar',
                    action:'guardar'
                }]
            }]
        }]);

        me.callParent(arguments);
    }
});