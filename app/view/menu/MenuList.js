/**
 * @class Imobile.view.menu.MenuList
 * @extends Ext.dataview.DataView
 * El dataview para llevar el control del menu
 */
Ext.define('Imobile.view.menu.MenuList', {
    extend: 'Ext.dataview.DataView',
    xtype:'menulist',
    config: {
        scrollable: true,
        //padding: 20,
        inline: true,
        //cls: 'dataview-inline',
        store: 'Menu',
        itemTpl: [
        	'<tpl for=".">',
	        	'<div class="menu-list">',
	        		'<div class="menu-list-image"><img src="resources/images/{icon}"/></div>',
	        		'<h2>{name}</h2>',
	        	'</div>',
	        '</tpl>'
        	//'<div style="clear:both"></div>'
        ].join('')
    }
});