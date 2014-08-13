/**
 * @class Imobile.view.cobranza.MontoAPagarFormContainer
 * @extends extendsClass
 * Description
 */
Ext.define('APP.view.phone.cobranza.MontoAPagarFormContainer', {
    extend: 'Ext.Container',
    requires: [],
    xtype: 'montoapagarformcontainer',
    config: {
        layout: {
            type: 'vbox'
            //pack: 'center',
            //align: 'center'
        },
        items: [{
            xtype: 'montoapagarform',
            flex: 1
        }]
    }
});