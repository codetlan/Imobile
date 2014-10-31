/**
 * Created by th3gr4bb3r on 7/21/14.
 */

Ext.define('APP.view.phone.menu.MenuList', {
    extend: 'Ext.dataview.DataView',
    xtype:'menulist',
    config: {
        scrollable: true,        
        inline: true,
        store: 'Menu',
        itemTpl: [
            '<tpl for=".">',
            '<div class="menu-list">',
            '<div class="menu-list-image"><img src="resources/images/{icon}"/></div>',
            '<h2>{name}</h2>',
            '</div>',
            '</tpl>'
            //'<div style="clear:both"></div>'
        ].join(''),
        loadingText: 'Cargando...'
    }
});