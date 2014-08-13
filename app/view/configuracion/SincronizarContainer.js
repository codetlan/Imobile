/**
 * @class Imobile.view.configuracion.SincronizarContainer
 * @extends Ext.Container
 * Este es el panel para sincronizar la aplicacion imobile
 */
Ext.define('Imobile.view.configuracion.SincronizarContainer', {
    extend: 'Ext.Container',
    xtype: 'sincronizarcontainer',
    config: {
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        //padding: 10,
        items: [{
            xtype: 'component',
            cls: 'imobile-sincronization-info',
            html: ' Para activar la sincronización es recomendable que este conectado a una red WI-FI.<br><br>'
        }, {
            xtype: 'fieldset',
            cls: 'imobile-status-sincronization',
            padding: 10,
            data: [{
                service: 'Productos',
                num: 4
            }, {
                service: 'Ventas',
                num: 8
            }, {
                service: 'Transacciones',
                num: 24
            }],
            tpl: [
            	'<div class="pending">',
            		'<h2>Pendientes</h2>',
            		'<ul>',
	            		'<tpl for=".">',
	            			'<li>{service}: <b>{num}</b> </li>',
	            		'</tpl>',
            		'</ul>',
            	'</div>'].join('')
        }, {
            xtype: 'component',
            cls: 'imobile-sincronization-info-last',
            html: '<em>Última sincronización <br> <b> 08 de abril de 2014 17:06</b></em>'
        }, {
            xtype: 'fieldset',
            instructions: 'Esta operación puede tomar algunos minutos',
            padding: 10,
            items: [{
                xtype: 'button',
                itemId: 'sincronizar',
                iconCls: 'download',
                ui: 'confirm',
                text: 'Sincronizar Datos'
            }]
        }]
    }
});