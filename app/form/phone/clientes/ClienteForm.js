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
    },

    initialize: function(){
        var me = this;

        me.setItems([
            {
                xtype: 'fieldset',
                itemId: 'datosCliente',
                instructions: APP.core.config.Locale.config.lan.ClienteForm.instrucciones,
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
                        label: APP.core.config.Locale.config.lan.AgregarProductosForm.codigo
                    },
                    {
                        xtype: 'textfield',
                        name: 'NombreSocio',
                        label: APP.core.config.Locale.config.lan.ClienteForm.nombre
                    },
                    {
                        xtype: 'textfield',
                        name: 'RFC',
                        label: APP.core.config.Locale.config.lan.ClienteForm.rfc
                    },
                    {
                        xtype: 'numberfield',
                        name: 'Telefono',
                        label: APP.core.config.Locale.config.lan.ClienteForm.telefono
                    },
                    {
                        xtype: 'emailfield',
                        name: 'Correo',
                        label: APP.core.config.Locale.config.lan.ClienteForm.correo
                    },
                    {
                        xtype: 'textfield',
                        name: 'NombreListaPrecio',
                        label: APP.core.config.Locale.config.lan.ClienteForm.listaPrecios
                    },
                    {
                        xtype: 'textfield',
                        name: 'LimiteCredito',
                        label: APP.core.config.Locale.config.lan.ClienteForm.credito
                    },
                    {
                        xtype: 'textfield',
                        name: 'Saldo',
                        label: APP.core.config.Locale.config.lan.ClienteForm.saldo
                    },
                    {
                        xtype: 'direccioneslist',
                        height: 80
                    }
                ]
            }
        ]);

        me.callParent(arguments);
    }
});