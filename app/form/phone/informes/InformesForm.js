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
        scrollable: 'vertical'
    },

    initialize: function(){
        var me = this;

        me.setItems([
            {
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.InformesForm.fecha,
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
                        label: APP.core.config.Locale.config.lan.InformesForm.desde,
                        itemId: 'fechaDesde',
                        value: new Date(Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1), "d-m-Y")) 
                    },{
                        xtype:'datepickerfield',
                        name:'fechaHasta',
                        label: APP.core.config.Locale.config.lan.InformesForm.hasta,
                        itemId: 'fechaHasta',
                        value: new Date(Ext.Date.format(new Date(), "d-m-Y"))
                    }
                ]
            },{            
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.InformesForm.codigo,
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
                        xtype:'textfield',
                        name:'codigoDesde',
                        label: APP.core.config.Locale.config.lan.InformesForm.desde,
                        itemId: 'codigoDesde',
                    },{
                        xtype:'textfield',
                        name:'codigoHasta',
                        label: APP.core.config.Locale.config.lan.InformesForm.hasta,
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
                        text: APP.core.config.Locale.config.lan.InformesForm.crearInforme
                    }
                ]
            }
        ]);

        me.callParent(arguments);
    }
});