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
        scrollable: 'vertical',        
		items:[
/*            {
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
                        itemId:'agregar',
                        text:'Guardar',
                        ui: 'confirm'
                    }
                ]

            },*/
            {
                xtype:'fieldset',
                itemId:'datos',
                title:'Agregar Productos',
                instructions: 'Ingrese los datos',                
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
                        label: 'Código',
                        itemId: 'codepro'
                        //value: 12345
                    },{
                        xtype:'textfield',
                        name:'NombreArticulo',
                        label:'Descripción',
                        itemId: 'descripcion'
                    },{
                        xtype:'numberfield',
                        name:'cantidad',
                        label:'Cantidad',
                        disabled: false,
                        minValue: 0.1,
                        itemId: 'cantidad'
                        //maxValue: 100,
                        //stepValue: .1
                        //ui: 'spinner'
                    },{
                        xtype:'textfield',
                        name:'Precio',
                        label:'Precio'
                    },{
                        xtype:'textfield',
                        name:'moneda',
                        label:'Moneda'
                        //itemId: 'moneda'
                    },{
                        xtype:'textfield',
                        name:'PorcentajeDescuento',
                        label:'Descuento'
                    },{
                        xtype:'textfield',
                        name:'precioConDescuento',
                        label:'Precio con Descuento'
                    },{
                        xtype:'textfield',
                        name:'importe',
                        label:'Importe'
                    },{
                        xtype:'textfield',
                        name:'NombreAlmacen',
                        label:'Almacen',
                        disabled: false,
                        itemId: 'almacenProducto'
                    },{
                        xtype: 'hiddenfield',
                        name: 'CodigoAlmacen'
                    },{
                        xtype:'textfield',
                        name:'Disponible',
                        label:'Disponible'
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
                        text: 'Guardar Cambios'
                    }
                ]
            }
        ]
	}
});