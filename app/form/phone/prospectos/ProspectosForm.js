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
        modal: true
	},

    initialize: function (){
        var me = this;

        me.setItems([
            {
                xtype:'fieldset',
                itemId:'datos',
                title: APP.core.config.Locale.config.lan.ProspectosForm.titulo,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.fecha,
                        required:false,
                        disabled: true,
                        value: Ext.Date.format(new Date(), "d-m-Y"),
                        itemId: 'fecha'
                    },{
                        xtype:'textfield',
                        name:'CodigoSocio',
                        itemId: 'codigoSocio',
                        tabIndex: 1,
                        label: APP.core.config.Locale.config.lan.ProspectosForm.codigo
                    },{
                        xtype:'textfield',
                        name:'NombreSocio',
                        tabIndex: 2,
                        label: APP.core.config.Locale.config.lan.ProspectosForm.razon
                    },{
                        xtype:'selectfield',
                        name:'TipoPersona',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.tipoPersona,
                        options:[{
                                text: APP.core.config.Locale.config.lan.ProspectosForm.fisica,
                                value: 'F'
                            },{
                                text: APP.core.config.Locale.config.lan.ProspectosForm.moral,
                                value: 'M'
                            }],
                        tabIndex: 3,
                        autoSelect: false,
                        itemId: 'tipoPersona'
                    },{
                        xtype:'textfield',
                        name:'RFC',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.rfc,
                        tabIndex: 4,                        
                        itemId: 'rfc'
                    }
                ]
                },{
                    xtype:'fieldset',
                    itemId:'direccion',
                    title: APP.core.config.Locale.config.lan.ProspectosForm.direccion,
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
                            label: APP.core.config.Locale.config.lan.ProspectosForm.calle
                        },{
                            xtype:'textfield',
                            name:'NoExterior',
                            label: APP.core.config.Locale.config.lan.ProspectosForm.noExt,
                            tabIndex: 6,
                            required:false
                        },{
                            xtype:'textfield',
                            name:'NoInterior',
                            label: APP.core.config.Locale.config.lan.ProspectosForm.noInt,
                            tabIndex: 7,
                            required:false
                        },{
                            xtype:'textfield',
                            name:'Colonia',
                            tabIndex: 8,
                            label: APP.core.config.Locale.config.lan.ProspectosForm.colonia
                        },{
                            xtype:'textfield',
                            name:'Ciudad',
                            tabIndex: 9,
                            label: APP.core.config.Locale.config.lan.ProspectosForm.ciudad
                        },{
                            xtype:'textfield',
                            name:'Municipio',
                            tabIndex: 10,
                            label:APP.core.config.Locale.config.lan.ProspectosForm.municipio
                        },{
                            xtype:'textfield',
                            name:'CodigoPostal',
                            tabIndex: 11,
                            label: APP.core.config.Locale.config.lan.ProspectosForm.cp
                        },{
                            xtype:'selectfield',
                            name:'Pais',
                            tabIndex: 12,
                            label: APP.core.config.Locale.config.lan.ProspectosForm.pais,
                            itemId: 'pais'
                        },{
                            xtype:'selectfield',                            
                            name:'Estado',
                            label: APP.core.config.Locale.config.lan.ProspectosForm.estado,
                            tabIndex: 13,
                            itemId: 'estado'
                        }
                    ]
            },{
                xtype:'fieldset',
                itemId:'contactos1',
                title: APP.core.config.Locale.config.lan.ProspectosForm.encargado,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoNombre
                    },{
                        xtype:'numberfield',
                        name:'telOficinaEncargado',
                        tabIndex: 14,
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoTelOfi
                    },{
                        xtype:'numberfield',
                        name:'telMovilEncargado',
                        tabIndex: 15,
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoTelMov,
                        required:false
                    }
                ]
            },{
                xtype:'fieldset',
                title: APP.core.config.Locale.config.lan.ProspectosForm.productor
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.cultivos,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.superficie,
                        hidden: false
                    },{
                        xtype:'numberfield',
                        name:'campoAbierto',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.campoAbierto,
                        tabIndex: 16,
                        minValue: 0,
                        itemId: 'campoAbierto'
                    },{
                        xtype:'numberfield',
                        name:'invernadero',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.invernadero,
                        tabIndex: 17,
                        minValue: 0,
                        itemId: 'invernadero'
                    },{
                        xtype:'numberfield',
                        name:'macroTunel',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.macroTunel,
                        tabIndex: 18,
                        minValue: 0,
                        itemId: 'macroTunel'
                    },{
                        xtype:'numberfield',
                        name:'total',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.total,
                        itemId: 'total'
                    }
                ]
            },{
                xtype:'fieldset',
                itemId:'distribuidor',
                title: APP.core.config.Locale.config.lan.ProspectosForm.distribuidor,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.zonaDeInfluencia
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.comercializa,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoCompras,
                        hidden: false,
                        itemId: 'contactos2'
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoCompras',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoComprasNombre,
                        tabIndex: 20,
                        itemId: 'nombreEncargadoCompras'
                    },{
                        xtype:'numberfield',
                        name:'telEncargadoCompras',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoComprasTel,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoPagos,
                        hidden: false,
                        itemId: 'contactos3'
                    },{
                        xtype:'textfield',
                        name:'nombreEncargadoPagos',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoPagosNombre,
                        tabIndex: 22,
                        itemId: 'nombreEncargadoPagos'
                    },{
                        xtype:'numberfield',
                        name:'telEncargadoPagos',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.encargadoPagosTel,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.responsableTecnico,
                        hidden: false,
                        itemId: 'contactos4'
                    },{
                        xtype:'textfield',
                        name:'nombreResponsableTecnico',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.responsableNombre,
                        tabIndex: 24,
                        itemId: 'nombreResponsableTecnico'
                    },{
                        xtype:'numberfield',
                        name:'telResponsableTecnico',
                        label: APP.core.config.Locale.config.lan.ProspectosForm.responsableTel,
                        tabIndex: 25,
                        itemId: 'telResponsableTecnico'
                    }
                ]
            },{
                xtype:'fieldset',
                margin: '3 0 0 0',
                title: APP.core.config.Locale.config.lan.ProspectosForm.productosUtilizados
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.solubles,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.granulares,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.acidos,
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
                        label: APP.core.config.Locale.config.lan.ProspectosForm.otros,
                        itemId: 'otros6',
                        hidden: false
                    }
                ]
            },{
                xtype:'fieldset',                
                itemId:'comentarios',
                title: APP.core.config.Locale.config.lan.ProspectosForm.comentarios,
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
                        text: APP.core.config.Locale.config.lan.ProspectosForm.enviarProspecto
                    }
                ]
            }
        ]);
    
        me.callParent(arguments);
    }
});