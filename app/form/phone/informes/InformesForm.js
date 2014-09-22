Ext.define('APP.form.phone.informes.InformesForm', {
    extend: 'Ext.form.Panel',
    xtype: 'informesform',
    requires:[
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Number',
        'Ext.picker.Date',
        'Ext.field.Hidden'
    ],
    config:{        
        padding:'0 15 15 15',
        scrollable: 'vertical',        
        items:[
            {
                xtype:'fieldset',
                title: 'Fecha',
                itemId:'fecha',                                
                defaults:{
                    //required:true,
                    //disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    cls: 'factura',
                    labelWrap: true,
                    labelWidth: '40%'                    
                },
                items:[
                    {
                        xtype:'datepickerfield',
                        name:'fechaDesde',
                        label: 'Desde',
                        itemId: 'fechaDesde',
                        value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1)
                    },{
                        xtype:'datepickerfield',
                        name:'fechaHasta',
                        label:'Hasta',
                        itemId: 'fechaHasta',
                        value: new Date()
                    }
                ]
            },{            
                xtype:'fieldset',
                title: 'Código',
                itemId:'codigo',                                
                defaults:{
                    //required:true,
                    //disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    cls: 'factura',
                    labelWrap: true,
                    labelWidth: '40%'                    
                },
                items:[
                    {
                        xtype:'selectfield',
                        name:'codigoDesde',
                        label: 'Desde',
                        itemId: 'codigoDesde',
                    },{
                        xtype:'selectfield',
                        name:'codigoHasta',
                        label:'Hasta',
                        itemId: 'codigoHasta',                        
                    }]
            },{
                xtype: 'fieldset',
                padding: 10,
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'crearInforme',                        
                        ui: 'action',
                        text: 'Crear Informe'
                    }
                ]
            }
        ]
    }
});