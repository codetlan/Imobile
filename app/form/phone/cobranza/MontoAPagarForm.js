Ext.define('APP.form.phone.cobranza.MontoAPagarForm', {
    extend: 'Ext.form.Panel',
    xtype: 'montoapagarform',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.field.Password'],
    config: {
        padding: '0 15 15 15'

        
/*        defaults: {
            required: true,
            clearIcon: true
        },*/
        //centered: true,

    },

    initialize: function(){
        var me = this;

        me.setItems([{
            xtype: 'fieldset',
            title: 'Title',
            defaults:{
                labelWidth: '40%',
                required:true,
                labelCls: 'labels',
                inputCls: 'labels'
            },
            items:[{
                xtype: 'numberfield',
                name: 'monto',
                placeHolder: APP.core.config.Locale.config.lan.MontoAPagarForm.monto,
                label: APP.core.config.Locale.config.lan.MontoAPagarForm.etiquetaMonto
            }]
        },{
            xtype:'component',
            height:10
        }, {
            xtype: 'button',
            text: APP.core.config.Locale.config.lan.MontoAPagarForm.pagar,
            ui: 'action',
            itemId: 'pagar'
        }/*,  {
            xtype:'component',
            height:10
        }, {
            xtype:'component',
            height:20
        },  {
            xtype:'component',
            cls:'imobile-version',
            html:'<i class="icon-help-circled"></i>'
        }*/]);

        me.callParent(arguments);
    }
});