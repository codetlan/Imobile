Ext.define('APP.form.phone.pedidos.EditarPedidoForm', {
	extend: 'Ext.form.Panel',
	xtype: 'editarpedidoform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number'
	],
	config:{
		//padding:'15 15 15 15',

	},

    initialize: function(){
        var me = this;
        me.setItems([
            {
                xtype:'fieldset',
                itemId:'datos',                
                instructions: APP.core.config.Locale.config.lan.EditarPedidoForm.instrucciones,
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
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.codigoCliente,
                        itemId: 'codepro'                        
                    },{
                        xtype:'textfield',
                        name:'NombreSocio',
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.nombreCliente
                    },{
                        xtype:'textfield',
                        name:'LimiteCredito',
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.limiteCredito
                    },{
                        xtype:'textfield',
                        name:'NombreCondicionPago',
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.condicionCredito
                    },{
                        xtype:'textfield',
                        name:'Saldo',
                        label: APP.core.config.Locale.config.lan.ClienteForm.saldo
                    },{
                        xtype:'textfield',
                        name:'NombreListaPrecio',
                        label: APP.core.config.Locale.config.lan.ClienteForm.listaPrecios
                    },{
                        xtype:'textfield',
                        name:'NombreVendedor',
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.vendedor
                    },{
                        xtype:'textfield',
                        name:'descuento',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.descuento
                    },{
                        xtype:'textfield',
                        name:'CodigoMoneda',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.moneda,
                        disabled: false,
                        itemId: 'moneda',                        
                        inputCls: 'fa-check'
                    },{
                        xtype:'textfield',
                        name:'tipoCambio',
                        label: APP.core.config.Locale.config.lan.EditarPedidoForm.tipoCambio
                    }
                ]
            }
        ]);

        me.callParent(arguments);
    }
});