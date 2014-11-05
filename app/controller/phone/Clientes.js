/**
 * Created by th3gr4bb3r on 7/23/14.
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

    /**
    * Realiza una búsqueda de cliente basado en la cadena que le pasan
    * @param t Éste textfield
    * @param e El evento
    */
    onBuscaClientes: function (t, e){
        var store = this.getClientesList().getStore(),
            value = t.up('toolbar').down('#buscarClientes').getValue();
        store.resetCurrentPage();
        store.setParams({
            Criterio: value
        });
        store.load();
    },

    /**
    * Limpia el textfield. 
    */
    limpiaBusquedaClientes: function() {
        var store = this.getClientesList().getStore();
        store.resetCurrentPage();
        store.setParams({
            Criterio: ''
        });
        store.load();
    }
});