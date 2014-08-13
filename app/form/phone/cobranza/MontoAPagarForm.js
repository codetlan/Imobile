Ext.define('APP.form.phone.cobranza.MontoAPagarForm', {
    extend: 'Ext.form.Panel',
    xtype: 'montoapagarform',
    //requires: ['Ext.form.FieldSet', 'Ext.field.Email', 'Ext.field.Password'],
    config: {
        padding: '0 15 15 15',        

        
/*        defaults: {
            required: true,
            clearIcon: true
        },*/
        //centered: true,
        items: [{
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
                placeHolder: 'Ingrese el monto a pagar',
                label: 'Monto'
            }]
        },{
            xtype:'component',
            height:10
        }, {
            xtype: 'button',
            text: 'Pagar',
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
        }*/]
    }
});