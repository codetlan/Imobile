/**
 * @class Imobile.view.ventas.PartidaContainer
 * @extends extendsClass
 * Description
 */
Ext.define('APP.view.phone.ordenes.PartidaContainer', {
    extend: 'Ext.Container',
    xtype: 'partidacontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                flex: 7,
                style: {
                    backgroundColor: 'gray'
                },
                items: {
                    xtype: 'ordenlist',
                    flex: 1,
                    layout: 'fit'
                }
            },
            {
                xtype: 'ordencontainer',
                flex: 1
            }
        ]
    }
});