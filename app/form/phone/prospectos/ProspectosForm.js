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
                itemId:'cultivos',                    
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%',
                    hidden: true
                },
                items:[
                    /*{
                        xtype:'textfield',
                        name:'cultivos',
                        label:'Cultivos'
                    },*/
                    {
                        xtype: 'checkboxfield',
                        name: 'cultivos',
                        label: 'Cultivos',
                        hidden: false,
                        itemId: 'cultivos'
                    }/*,{
                        xtype:'textfield',
                        name:'superficie',
                        label:'Superficie',                    
                    }*/
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
                        name: 'superficie',
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
                    labelWidth: '65%'                
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'zonaDeInfluencia',
                        label:'Zona de influencia'
                    },{
                        xtype:'textfield',
                        name:'comercializa',
                        label:'Comercializa'
                    },{
                        xtype:'textfield',
                        name:'encargadoCompras',
                        label:'Encargado de compras'
                    },{
                        xtype:'textfield',
                        name:'encargadoPagos',
                        label:'Encargado de pagos'
                    },{
                        xtype:'textfield',
                        name:'responsableTecnico',
                        label:'Responsable Técnico'
                    }
                ]
            },{
                xtype:'fieldset',
                itemId:'productosUtilizados',
                title:'Productos utilizados',
                defaults:{
                    cls: 'factura',
                    labelWrap: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWidth: '45%'                
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'productos',
                        label:'Productos'
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
                        xtype:'textareafield'
                        //name:'productos',
                        //label:'Productos'
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