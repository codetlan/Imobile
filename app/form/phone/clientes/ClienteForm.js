/**
 * Created with JetBrains PhpStorm.
 * User: Waldix
 * Date: 16/04/14
 * Time: 12:23
 * To change this template use File | Settings | File Templates.
 */
Ext.define('APP.form.phone.clientes.ClienteForm', {
    extend: 'Ext.form.Panel',
    xtype: 'clienteform',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Number'
    ],
    config: {
        //padding:'0 0 15 0',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'datosCliente',
                instructions: 'Datos del Cliente',
                defaults: {
                    disabled: true,
                    clearIcon: true,
                    autoCapitalize: true,
                    labelWidth: '45%'
                },
                layout : {
                    type  : 'vbox',
                    align : 'stretch'
                },
                flex: 1,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'CodigoSocio',
                        label: 'Código'
                    },
                    {
                        xtype: 'textfield',
                        name: 'NombreSocio',
                        label: 'Nombre'
                    },
                    {
                        xtype: 'textfield',
                        name: 'RFC',
                        label: 'RFC'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'Telefono',
                        label: 'Teléfono'
                    },
                    {
                        xtype: 'emailfield',
                        name: 'Correo',
                        label: 'Correo'
                    },
                    {
                        xtype: 'textfield',
                        name: 'NombreListaPrecio',
                        label: 'Lista de Precios'
                    },
                    {
                        xtype: 'textfield',
                        name: 'LimiteCredito',
                        label: 'Crédito'
                    },
                    {
                        xtype: 'textfield',
                        name: 'Saldo',
                        label: 'Saldo'
                    },
                    {
                        xtype: 'direccioneslist',
                        height: 80
                    }
                ]
            }
        ]
    }
});