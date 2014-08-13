/**
 * Created by th3gr4bb3r on 7/23/14.
 */
/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Clientes', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            clientesList:'clienteslist'
        },
        control: {
            'clienteslist #buscarClientes': {
                clearicontap: 'limpiaBusquedaClientes'
            },
            'clienteslist #btnBuscarClientes': {
                tap: 'onBuscaClientes'
            },
            'clienteslist':{
                activate: function(list){
                    list.getStore().resetCurrentPage();
                    list.getStore().load();
                }
            }
        }
    },



    onBuscaClientes: function (t, e){
        var store = this.getClientesList().getStore(),
            value = t.up('toolbar').down('#buscarClientes').getValue();
        store.resetCurrentPage();
        store.setParams({
            Criterio: value
        });
        store.load();
    },

    limpiaBusquedaClientes: function() {
        var store = this.getClientesList().getStore();
        store.resetCurrentPage();
        store.setParams({
            Criterio: ''
        });
        store.load();
    }
});