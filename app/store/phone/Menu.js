/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.store.phone.Menu',{
    extend:'Ext.data.Store',
    config:{
        autoload: true,
        model:'APP.model.phone.Menu',
        data: [
            {name: 'Ordenes de venta',  icon: 'package.png', action: 'ordenes'},
            {name: 'Rutas y Actividades',   icon: 'map.png', action: 'rutas'},
            {name: 'Cobranza', icon: 'briefcase.png', action: 'cobranza'},
            {name: 'Informes', icon: 'graph.png', action: 'informes'},
            {name: 'Configuración',   icon: 'settings.png', action: 'configuracion'},
            {name: 'Prospectos',   icon: 'man.png', action: 'prospectos'},
//            {name: 'Favoritos',   icon: 'target.png', action: 'favoritos'},
            {name: 'Salir',   icon: 'browser.png', action: 'salir'}
        ]
    }
});
