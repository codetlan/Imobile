/**
 * @class Imobile.view.phone.Main
 * @extends Imobile.view.Main
 * La vista principal de nuestra version de telefono
 * @oswaldo@codetlan.com
 */

Ext.define('APP.view.phone.MainCard',{
    extend:'Ext.Panel',
    xtype:'maincard',
    config: {
        layout:'card',
        activeItem:0,

        items: [{
            xtype: 'menunav'
        },{
            xtype: 'navigationorden'
        },{
            xtype: 'navigationcobranza'
        }]
    }

/*    initialize: function(){        
        this.setItems([{
            xtype: 'menunav'
        },{
            xtype: 'navigationorden'
        },
        {
            xtype: 'navigationcobranza'
        }]);

        this.callParent(arguments);
        console.log('MainCard');
    }*/
});