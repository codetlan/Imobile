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
                xtype:'container',
                layout:{
                    type:'hbox',
                    align:'stretch'
                },
                items:[{
                    xtype:'button',
                    action:'showrutasform',
                    text:'Rutas',
                    flex:1
                },{
                    xtype:'button',
                    action:'showactividadesform',
                    text:'Actividades',
                    flex:1
                }]
            },{
                xtype: 'textfield',
                name: 'titulo',
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
                    value:new Date(),
                    border:0,
                    name:'empiezafecha',
                    readOnly:true
                },{
                    xtype: 'timepickerfield',
                    name: 'empiezahora',
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
                    value:new Date(),
                    name:'terminafecha'
                },{
                    xtype: 'timepickerfield',
                    name: 'terminahora',
                    value: new Date()
                }]

            },{
                xtype: 'checkboxfield',
                name: 'repetir',
                label: 'Repetir'
            },{
                xtype:'container',
                id:'rutasrepetir',
                hidden:true,
                items:[{
                    xtype: 'checkboxfield',
                    name: 'lunes',
                    label: 'Lunes'
                },{
                    xtype: 'checkboxfield',
                    name: 'martes',
                    label: 'Martes'
                },{
                    xtype: 'checkboxfield',
                    name: 'miercoles',
                    label: 'Miercoles'
                },{
                    xtype: 'checkboxfield',
                    name: 'jueves',
                    label: 'Jueves'
                },{
                    xtype: 'checkboxfield',
                    name: 'viernes',
                    label: 'Viernes'
                },{
                    xtype: 'checkboxfield',
                    name: 'sabado',
                    label: 'Sabado'
                },{
                    xtype: 'checkboxfield',
                    name: 'domingo',
                    label: 'Domingo'
                }]
            },{
                xtype: 'textareafield',
                name: 'notas',
                label: 'Notas',
                labelAlign:'top'
            },{
                xtype:'rutasmapa',
                useCurrentLocation: true,
                height:400,
                width:'98%'
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