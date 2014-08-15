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
    initialize : function() {
        this.callParent();
        this.setItems([{
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
                    value:this.nd,
                    border:0,
                    name:'FechaInicio',
                    readOnly:true
                },{
                    xtype: 'timepickerfield',
                    name: 'HoraInicio',
                    value: new Date()
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
                    value:this.nd,
                    name:'FechaFin'
                },{
                    xtype: 'timepickerfield',
                    name: 'HoraFin',
                    value: new Date()
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
    },
    config: {
        layout:'fit'
    }
});