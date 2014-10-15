Ext.define('APP.form.phone.productos.AgregarProductosForm', {
	extend: 'Ext.form.Panel',
	xtype: 'agregarproductosform',
	requires:[
		'Ext.form.FieldSet',
		'Ext.field.Text',
		'Ext.field.Number',
        'Ext.field.Spinner',
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
                itemId:'datos',
                title: APP.core.config.Locale.config.lan.AgregarProductosForm.titulo,
                instructions: APP.core.config.Locale.config.lan.AgregarProductosForm.instrucciones,
                defaults:{
                    //required:true,
                    disabled: true,
                    clearIcon:true,
                    autoCapitalize:true,
                    cls: 'factura',
                    labelWrap: true,
                    labelWidth: '40%'
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'CodigoArticulo',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.codigo,
                        itemId: 'codepro'                        
                    },{
                        xtype:'textfield',
                        name:'NombreArticulo',
                        label:APP.core.config.Locale.config.lan.AgregarProductosForm.descripcion,
                        itemId: 'descripcion'
                    },{
                        xtype:'numberfield',
                        name:'cantidad',
                        label: APP.core.config.Locale.config.lan.OrdenList.cantidad,
                        disabled: false,
                        minValue: 0.1,
                        itemId: 'cantidad'
                    },{
                        xtype:'textfield',
                        name:'Precio',
                        label:APP.core.config.Locale.config.lan.OrdenList.precio
                    },{
                        xtype:'textfield',
                        name:'moneda',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.moneda
                    },{
                        xtype:'textfield',
                        name:'PorcentajeDescuento',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.descuento
                    },{
                        xtype:'textfield',
                        name:'precioConDescuento',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.precioConDescuento
                    },{
                        xtype:'textfield',
                        name:'importe',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.importe
                    },{
                        xtype:'textfield',
                        name:'NombreAlmacen',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.almacen,
                        disabled: false,
                        itemId: 'almacenProducto'
                    },{
                        xtype: 'hiddenfield',
                        name: 'CodigoAlmacen'
                    },{
                        xtype:'textfield',
                        name:'Disponible',
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.disponible
                    }
                ]
            },{
                xtype: 'fieldset',
                padding: 10,
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'agregar',                        
                        ui: 'action',
                        text: APP.core.config.Locale.config.lan.ConfiguracionPanel.guardar
                    }
                ]
            }
        ]);

        me.callParent(arguments);
    }
});