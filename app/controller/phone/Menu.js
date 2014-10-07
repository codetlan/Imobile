/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Menu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginForm: 'menunav menulist',
            menuNav: 'menunav',
            clientesList: 'clienteslist',
            mainCard: 'maincard'
        },
        control: {
            'menunav': {
                back: 'onBackMenu'
            },

            'menunav menulist': {
                itemsingletap: 'onMenuTap'
            }

        }
    },
    onMenuTap: function (list, index, target, record) {

        var action = record.data.action;
        switch (action) {
            case 'ordenes':
                this.getMenuNav().push({
                    xtype: 'container',
                    layout: 'fit',
                    id: 'ordenescont',
                    items: [
                        {
                            xtype: 'clienteslist',
                            title: APP.core.config.Locale.config.lan.menu.Orden
                        }
                    ]

                });
                break;
            case 'rutas':
                this.getMenuNav().push({
                    xtype: 'container',
                    layout: 'fit',
                    id: 'rutasactividadescont',
                    items: [{
                        xtype: 'opcionrutasactividades',
                        title: APP.core.config.Locale.config.lan.menu.Rutas
                    }]
                });
                break;
            case 'cobranza':
                this.getMenuNav().push({
                    xtype: 'container',
                    layout: 'fit',
                    id: 'cobranzacont',
                    items: [
                        {
                            xtype: 'clienteslist',
                            title: APP.core.config.Locale.config.lan.menu.Cobranza
                        }
                    ]
                });
                break;
            case 'informes':
                this.getMenuNav().push({
                    title: APP.core.config.Locale.config.lan.menu.Informes,
                    xtype: 'informeslist'
                });
                break;
            case 'configuracion':
                this.getMenuNav().push({
                    xtype: 'configuracionpanel',
                    title: APP.core.config.Locale.config.lan.menu.Configuracion
                });
                break;
            case 'prospectos':
                this.getMenuNav().push({
                    xtype: 'prospectoslist',
                    title: APP.core.config.Locale.config.lan.menu.Prospectos
                });
                
                var store = Ext.getStore('Prospectos');
                
                store.resetCurrentPage();
                store.setParams({
                    Criterio: ''
                });

                store.load();
                //this.agregaOpciones();
                break;
            case 'favoritos':
                this.getMenuNav().push({
                    title: 'favoritos',
                    html: 'favoritos'
                });
                break;
            case 'salir':
                Ext.Viewport.removeAll(true);
                Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));
/*                Ext.Viewport.removeAll();
                Ext.Viewport.add('APP.view.phone.login.LoginPanel');*/
                break;

        }
    },

    onShowMenu: function () {
        var me = this;
        me.getMainCard().setActiveItem(0);
        //back button logic
        document.addEventListener("backbutton", function () {
            me.getMainCard().setActiveItem(0);
            alert(me.getMainCard().getActiveItem());
        }, true);
        console.log(document, 'entra document');
    },

    onBackMenu: function (navigationview) {

        var me = this,
            store,
            view = this.getMenuNav(),
            titulo,

            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token")
            };

        if (navigationview.getActiveItem().getId() == 'ordenescont' ||
            navigationview.getActiveItem().getId() == 'cobranzacont' ||
            navigationview.getActiveItem().getId() == 'rutasccont'
            ) {
            store = this.getClientesList().getStore()
            titulo = view.down('toolbar');

            view.remove(titulo, true);

            store.getProxy().setUrl("http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerListaSociosiMobile");
            store.setParams(params);
            store.load();            
        }
    },

    agregaOpciones: function(){
        if(this.getMenuNav().estados == undefined){
            var me = this,
                url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Catalogos/ObtenerListaEstados",
                params = {
                    CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                    CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                    CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                    Token: localStorage.getItem("Token")
                };

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.ClientesList.cargando);
        Ext.Viewport.setMasked(true);

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {

                    if (response.Procesada) {
                        var opciones = new Array(),
                            datos = response.Data,
                            i;

                        for (i = 0; i < datos.length; i++){
                            opciones[i] = {
                                text: datos[i].NombreEstado,
                                value: datos[i].CodigoEstado
                            };
                        }                    

                        me.getMenuNav().estados = opciones;
                        Ext.Viewport.setMasked(false);
                    } else {                    
                        Ext.Msg.alert("No se pudieron obtener los estados", "Se presentó un problema al intentar obtener los estados: " + response.Descripcion);
                        Ext.Viewport.setMasked(false);
                    }
                }
            });
        }
    }
});