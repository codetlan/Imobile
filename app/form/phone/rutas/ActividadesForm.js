/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('APP.form.phone.rutas.ActividadesForm', {
    extend: 'Ext.form.Panel',
    xtype: 'actividadesform',
    config: {
        layout:'fit'
    },

    initialize: function(){
        var me = this;

        me.setItems([{
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
                name:'CodigoActividad'
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
                    dateFormat: "d/m/Y",
                    value:new Date()
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
                id:'actividadesrepetir',
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
                xtype:'container',
                items:[{
                    xtype:'button',
                    margin:'10',
                    text:'Guardar',
                    action:'guardar'
                }]
            }]
        }]);

        me.callParent(arguments);
    }
});