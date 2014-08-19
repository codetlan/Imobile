Ext.define('APP.form.phone.pedidos.EditarPedidoForm', {
	extend: 'Ext.form.Panel',
	xtype: 'editarpedidoform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number'
        //'Ext.field.Spinner'
	],
	config:{
		//padding:'15 15 15 15',
		items:[/*{        
                xtype:'container',
                padding: '0 0 0 200',
                defaults:{
                    xtype:'button',
                    style: 'margin: .5em',
                    flex: 1
                },
                layout:{
                    type:'hbox'
                },
                items:[
                    {                        
                        itemId:'guardar',
                        text:'Guardar',
                        ui: 'confirm'
                        //ui:'btn-login-ui',
                        // handler:function(btn){
                        //     var form = btn.up('formpanel');
                        //     form.fireEvent('logged', form);
                        // }
                    }
                ]
            },*/
            {
                xtype:'fieldset',
                itemId:'datos',                
                instructions: 'Editar pedido',
                defaults:{
                    //required:true,
                    disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    labelWrap: true,
                    labelWidth: '45%'
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'CodigoSocio',
                        label: 'Código de Cliente',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'NombreSocio',
                        label:'Nombre de Cliente'
                    },{
                        xtype:'textfield',
                        name:'LimiteCredito',
                        label:'Límite de Crédito'
                    },{
                        xtype:'textfield',
                        name:'NombreCondicionPago',
                        label:'Condición de Crédito'
                    },{
                        xtype:'textfield',
                        name:'Saldo',
                        label:'Saldo'
                    },{
                        xtype:'textfield',
                        name:'NombreListaPrecio',
                        label:'Lista de Precios'
                    },{
                        xtype:'textfield',
                        name:'NombreVendedor',
                        label:'Vendedor'
                    },{
                        xtype:'textfield',
                        name:'descuento',
                        label:'Descuento'
                    },{
                        xtype:'textfield',
                        name:'CodigoMoneda',
                        label:'Moneda',
                        disabled: false,
                        itemId: 'moneda',                        
                        inputCls: 'fa-check'
                    },{
                        xtype:'textfield',
                        name:'tipoCambio',
                        label:'Tipo de Cambio'  
                    }
                ]
            }
        ]
	}
});