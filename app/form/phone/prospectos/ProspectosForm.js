Ext.define('APP.form.phone.prospectos.ProspectosForm', {
	extend: 'Ext.form.Panel',
	xtype: 'prospectosform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number'
        //'Ext.field.Spinner'
	],
	config:{
		padding:'0 15 15 15',
        scrollable: 'vertical', 
		items:[
            {
                xtype:'fieldset',
                itemId:'datos',
                title:'Agregar prospecto',
                //instructions: '* Datos obligatorios',
                defaults:{
                    required:true,
                    //disabled: true,
                    clearIcon:true,
                    cls: 'factura',
                    labelWrap: true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'fecha',
                        label: 'Fecha',
                        required:false,
                        disabled: true,
                        value: Ext.Date.format(new Date(), "d-m-Y")
                    },{
                        xtype:'textfield',
                        name:'codigo',
                        label:'Código'
                    },{
                        xtype:'textfield',
                        name:'razonSocial',
                        label:'Razón Social'
                    },{
                        xtype:'textfield',
                        name:'tipoPersona',
                        label:'Tipo de persona'
                    },{
                        xtype:'textfield',
                        name:'rfc',
                        label:'RFC',
                        required:false
                    }
                ]
                },{
                    xtype:'fieldset',
                    itemId:'direccion',
                    title:'Dirección',                    
                    defaults:{
                        required:true,
                        cls: 'factura',
                        labelWrap: true,                        
                        clearIcon:true,
                        autoCapitalize:true,
                        labelWidth: '45%'
                    },
                    items:[
                        {
                            xtype:'textfield',
                            name:'calle',
                            label:'Calle'
                        },{
                            xtype:'textfield',
                            name:'noExt',
                            label:'No. Ext',
                            required:false
                        },{
                            xtype:'textfield',
                            name:'noInt',
                            label:'No.Int',
                            required:false
                        },{
                            xtype:'textfield',
                            name:'colonia',
                            label:'Colonia'
                        },{
                            xtype:'textfield',
                            name:'ciudad',
                            label:'Ciudad'  
                        },{
                            xtype:'textfield',
                            name:'municipio',
                            label:'Municipio' 
                        },{
                            xtype:'textfield',
                            name:'cp',
                            label:'C.P.' 
                        },{
                            xtype:'textfield',
                            name:'estado',
                            label:'Estado' 
                        }
                    ]
            },{
                xtype:'fieldset',
                itemId:'encargado',
                title:'Encargado',                    
                defaults:{
                    required:true,
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'                
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'nombreEncargado',
                        label:'Nombre'
                    },{
                        xtype:'textfield',
                        name:'telOficinaEncargado',
                        label:'Tel. Oficina'                    
                    },{
                        xtype:'textfield',
                        name:'telMovilEncargado',
                        label:'Tel. Móvil',
                        required:false
                    }
                ]
            },{
                xtype:'fieldset',
                title:'Productor'
            },{
                xtype:'fieldset',
                itemId: 'conceptos1',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%',
                    hidden: true
                },
                items:[                    
                    {
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Cultivos',
                        itemId: 'cultivos1',
                        hidden: false
                    }
                ]
            },{
                xtype:'fieldset',
                itemId: 'superficie',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '70%',
                    hidden: true
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'este',
                        itemId: 'superficie',
                        label: 'Superficie',
                        hidden: false
                    },{
                        xtype:'numberfield',
                        name:'campoAbierto',
                        label:'Campo Abierto',
                        itemId: 'campoAbierto'
                    },{
                        xtype:'numberfield',
                        name:'invernadero',
                        label:'Invernadero',
                        itemId: 'invernadero'
                    },{
                        xtype:'numberfield',
                        name:'macroTunel',
                        label:'Macro Túnel',
                        itemId: 'macroTunel'
                    },{
                        xtype:'numberfield',
                        name:'total',
                        label:'Total',
                        itemId: 'total'
                    }
                ]
            },{
                xtype:'fieldset',
                itemId:'distribuidor',
                title:'Distribuidor',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '50%'                
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'zonaDeInfluencia',
                        label:'Zona de influencia'
                    }
                ]
            },{
                xtype:'fieldset',
                itemId: 'conceptos2',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '80%'                
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Comercializa',
                        itemId: 'comercializa2',
                        hidden: false
                    }
                ]
            },{
                xtype:'fieldset',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%',
                    hidden: true
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'este',
                        label: 'Encargado de compras',
                        hidden: false,
                        itemId: 'encargadoDeCompras',
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoCompras',
                        label:'Nombre',
                        itemId: 'nombreEncargadoCompras'
                    },{
                        xtype:'textfield',
                        name:'telEncargadoCompras',
                        label:'Teléfono',
                        itemId: 'telEncargadoCompras'
                    }
                ] 
            },{
                xtype:'fieldset',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%',
                    hidden: true
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'este',
                        label: 'Encargado de pagos',
                        hidden: false,
                        itemId: 'encargadoDePagos',
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoPagos',
                        label:'Nombre',
                        itemId: 'nombreEncargadoPagos'
                    },{
                        xtype:'textfield',
                        name:'telEncargadoPagos',
                        label:'Teléfono',
                        itemId: 'telEncargadoPagos'
                    }
                ] 
            },{
                xtype:'fieldset',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%',
                    hidden: true
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'este',
                        label: 'Responsable técnico',
                        hidden: false,
                        itemId: 'responsableTecnico',
                    },{
                        xtype:'textfield',
                        name:'nombreResponsableTecnico',
                        label:'Nombre',
                        itemId: 'nombreResponsableTecnico'
                    },{
                        xtype:'textfield',
                        name:'telResponsableTecnico',
                        label:'Teléfono',
                        itemId: 'telResponsableTecnico'
                    }
                ]
            },{
                xtype:'fieldset',                
                title:'Productos utilizados',
            },{
                xtype:'fieldset',
                itemId: 'conceptos3',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '80%'                
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Solubles',
                        itemId: 'solubles3',
                        hidden: false
                    }
                ]
            },{
                xtype:'fieldset',
                itemId: 'conceptos4',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '80%'                
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Granulares',
                        itemId: 'granulares4',
                        hidden: false
                    }
                ] 
            },{
                xtype:'fieldset',
                itemId: 'conceptos5',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '80%'                
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Ácidos',
                        itemId: 'acidos5',
                        hidden: false                        
                    }
                ]
            },{
                xtype:'fieldset',
                itemId: 'conceptos6',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '80%'                
                },
                items:[{
                        xtype: 'checkboxfield',
                        name: 'servicio',
                        label: 'Otros',
                        itemId: 'otros6',
                        hidden: false                        
                    }
                ]
            },{
                xtype:'fieldset',                
                itemId:'comentarios',
                title:'Comentarios',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'textareafield',
                        name:'comentarios'                     
                    }
                ]
            },{
                xtype: 'fieldset',
                padding: 10,
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'agregarProspecto', 
                        ui: 'action',
                        text: 'Agregar prospecto'
                    }
                ]
            }
        ]
	}
});