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
        modal: true,
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
                        value: Ext.Date.format(new Date(), "d-m-Y"),
                        itemId: 'fecha'
                    },{
                        xtype:'textfield',
                        name:'CodigoSocio',
                        itemId: 'codigoSocio',
                        tabIndex: 1,
                        label:'Código'
                    },{
                        xtype:'textfield',
                        name:'NombreSocio',
                        tabIndex: 2,
                        label:'Razón Social'
                    },{
                        xtype:'selectfield',
                        name:'TipoPersona',
                        label:'Tipo de persona',
                        options:[{
                                text: 'Física',
                                value: 'F'
                            },{
                                text: 'Moral',
                                value: 'M'
                            }],
                        tabIndex: 3,
                        autoSelect: false,
                        itemId: 'tipoPersona'
                    },{
                        xtype:'textfield',
                        name:'RFC',
                        label:'RFC',
                        tabIndex: 4,                        
                        itemId: 'rfc'
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
                            name:'Calle',
                            tabIndex: 5,
                            label:'Calle'
                        },{
                            xtype:'textfield',
                            name:'NoExterior',
                            label:'No. Ext',
                            tabIndex: 6,
                            required:false
                        },{
                            xtype:'textfield',
                            name:'NoInterior',
                            label:'No.Int',
                            tabIndex: 7,
                            required:false
                        },{
                            xtype:'textfield',
                            name:'Colonia',
                            tabIndex: 8,
                            label:'Colonia'
                        },{
                            xtype:'textfield',
                            name:'Ciudad',
                            tabIndex: 9,
                            label:'Ciudad'  
                        },{
                            xtype:'textfield',
                            name:'Municipio',
                            tabIndex: 10,
                            label:'Municipio' 
                        },{
                            xtype:'textfield',
                            name:'CodigoPostal',
                            tabIndex: 11,
                            label:'C.P.' 
                        },{
                            xtype:'selectfield',
                            name:'Pais',
                            tabIndex: 12,
                            label:'País',
                            itemId: 'pais'
                        },{
                            xtype:'selectfield',                            
                            name:'Estado',
                            label:'Estado',
                            tabIndex: 13,
                            itemId: 'estado'
                        }
                    ]
            },{
                xtype:'fieldset',
                itemId:'contactos1',
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
                        tabIndex: 13,
                        label:'Nombre'
                    },{
                        xtype:'numberfield',
                        name:'telOficinaEncargado',
                        tabIndex: 14,
                        label:'Tel. Oficina'                    
                    },{
                        xtype:'numberfield',
                        name:'telMovilEncargado',
                        tabIndex: 15,
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
                margin: '3 0 0 0',
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
                        itemId: 'superficieCheck',
                        label: 'Superficie',
                        hidden: false
                    },{
                        xtype:'numberfield',
                        name:'campoAbierto',
                        label:'Campo Abierto',
                        tabIndex: 16,
                        minValue: 0,
                        itemId: 'campoAbierto'
                    },{
                        xtype:'numberfield',
                        name:'invernadero',
                        label:'Invernadero',
                        tabIndex: 17,
                        minValue: 0,
                        itemId: 'invernadero'
                    },{
                        xtype:'numberfield',
                        name:'macroTunel',
                        label:'Macro Túnel',
                        tabIndex: 18,
                        minValue: 0,
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
                        tabIndex: 19,
                        label:'Zona de influencia'
                    }
                ]
            },{
                xtype:'fieldset',
                itemId: 'conceptos2',
                margin: '3 0 0 0',
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
                margin: '3 0 0 0',
                itemId: 'campo2',
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
                        itemId: 'contactos2'
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoCompras',
                        label:'Nombre',
                        tabIndex: 20,
                        itemId: 'nombreEncargadoCompras'
                    },{
                        xtype:'numberfield',
                        name:'telEncargadoCompras',
                        label:'Teléfono',
                        tabIndex: 21,
                        itemId: 'telEncargadoCompras'
                    }
                ] 
            },{
                xtype:'fieldset',
                margin: '3 0 0 0',
                itemId: 'campo3',
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
                        itemId: 'contactos3',
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoPagos',
                        label:'Nombre',
                        tabIndex: 22,
                        itemId: 'nombreEncargadoPagos'
                    },{
                        xtype:'numberfield',
                        name:'telEncargadoPagos',
                        label:'Teléfono',
                        tabIndex: 23,
                        itemId: 'telEncargadoPagos'
                    }
                ] 
            },{
                xtype:'fieldset',
                margin: '3 0 0 0',
                itemId: 'campo4',
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
                        itemId: 'contactos4',
                    },{
                        xtype:'textfield',
                        name:'nombreResponsableTecnico',
                        label:'Nombre',
                        tabIndex: 24,
                        itemId: 'nombreResponsableTecnico'
                    },{
                        xtype:'numberfield',
                        name:'telResponsableTecnico',
                        label:'Teléfono',
                        tabIndex: 25,
                        itemId: 'telResponsableTecnico'
                    }
                ]
            },{
                xtype:'fieldset',
                margin: '3 0 0 0',
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
                margin: '3 0 0 0',
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
                margin: '3 0 0 0',
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
                margin: '3 0 0 0',
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
                        tabIndex: 26,
                        name:'comentarios'                     
                    }
                ]
            },{
                xtype: 'fieldset',
                itemId: 'fieldButton',
                padding: 10,
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'agregarProspecto', 
                        ui: 'action',
                        text: 'Enviar prospecto'
                    }
                ]
            }
        ]
	}
});