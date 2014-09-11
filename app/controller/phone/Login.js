/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Login', {
    extend: 'Ext.app.Controller',
    requires:['APP.core.config.Locale'],
    config: {
        refs: {
            loginForm: 'loginpanel loginform',
            servidorLogin: 'loginpanel loginform textfield[name=servidor]',
            idiomaLogin: 'loginpanel loginform textfield[name=idioma]',
            loginPanel: 'loginpanel',
            configuracionForm: 'configuracionform'
        },
        control: {
            'loginform button[action=login]': {
                tap: 'onLoginUser'
            },
            'loginpanel image[id=configloginbutton]': {
                tap: 'showConfigOptions'
            },
            'loginpanel': {
                show: 'showFormLogin'
            },
            'configuracionform #saveConfiguration': {
                tap: 'onSaveConfiguration'
            },
            'loginpanel container #configBackButton':{
                tap: 'onConfigBackButton'
            }
        }
    },


    onLoginUser: function (btn) {
        var form = this.getLoginForm(),
            almacenes,
            values = form.getValues();

        //localStorage.setItem("dirIP", values.servidor);
        //localStorage.setItem("idioma", values.idioma);

        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Accediendo'});

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_UsuarioiMobile/Login",
            params: {
                CodigoUsuario: values.usuario,
                CodigoSociedad: localStorage.getItem('CodigoSociedad'),
                CodigoDispositivo: localStorage.getItem('CodigoDispositivo'),
                Contrasenia: values.password,
                idioma: localStorage.getItem('idioma')
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    localStorage.setItem("Token", response.Token);
                    localStorage.setItem("CodigoUsuario", response.Usuario.Codigo);
                    localStorage.setItem("NombreUsuario", response.Usuario.Nombre);
                    localStorage.setItem("Contrasenia", response.Usuario.Contrasenia);
                    localStorage.setItem("NombreDispositivo", response.ConfiguracionDispositivo.Nombre);
                    //localStorage.setItem("Almacenes", response.ConfiguracionDispositivo.Almacenes);
                    //console.log(response.ConfiguracionDispositivo.Almacenes);
                    almacenes = response.ConfiguracionDispositivo.Almacenes;
                    Ext.Viewport.removeAll(true);
                    Ext.Viewport.add(Ext.create('APP.view.phone.MainCard'));                    
                    Ext.Viewport.getActiveItem().getAt(0).almacenes = almacenes;

                    APP.core.data.Store.ProxyUrlClient = localStorage.getItem("dirIP");

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
                Ext.Viewport.setMasked(false);
            },
            failure: function () {
                Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor', function () {
                    Ext.Viewport.setMasked(false);
                });
                Ext.Viewport.setMasked(false);
            },
            scope: this
        });
    },

    showConfigOptions: function (x) {
        var configForm = this.getConfiguracionForm();

        this.getLoginPanel().setActiveItem(1);

        configForm.setValues({
            cod_soc: localStorage.getItem('CodigoSociedad'),
            cod_dis: localStorage.getItem('CodigoDispositivo'),
            servidor: localStorage.getItem('dirIP'),
            idioma: localStorage.getItem('idioma')
        });

        /*var form = this.getLoginForm(),
            server = this.getServidorLogin(),
            idioma = this.getIdiomaLogin();

        if (server.isHidden()) {
            server.setHidden(false);
            idioma.setHidden(false);
        }
        else {
            server.setHidden(true);
            idioma.setHidden(true);
        }*/
    },

    showFormLogin: function () {
        var form = this.getLoginForm();

        form.setValues({
            'servidor': localStorage.getItem('dirIP'),
            'idioma': localStorage.getItem('idioma')
        })
    },

    onSaveConfiguration: function () {
        var me = this,
            configForm = me.getConfiguracionForm(),
            values = configForm.getValues();

        me.confirma('Configuración', 'Estas seguro que deseas cambiar la Configuración?', 300,
            function (buttonId) {
                if (buttonId == 'yes') {
                    localStorage.setItem('CodigoSociedad', values.cod_soc);
                    localStorage.setItem('CodigoDispositivo', values.cod_dis);
                    localStorage.setItem('dirIP', values.servidor);
                    localStorage.setItem('idioma', values.idioma);

                    me.getLoginPanel().setActiveItem(0);
                }
            }
        );
    },

    confirma: function (titulo, mensaje, ancho, funcion){
        Ext.Msg.show({
            title: titulo,
            message: mensaje,
            width: ancho,
            buttons: [{
                itemId : 'no',
                text   : 'No'
            },{
                itemId : 'yes',
                text   : 'Si',
                ui     : 'action'
            }],
            fn: funcion
        });
    },

    onConfigBackButton: function () {
        this.getLoginPanel().setActiveItem(0);
    },

/*    launch: function(){
        var me = this;        
        Ext.Ajax.request({
            url: 'app/core/data/Prueba.json',
            
            success: function(response){
                console.log(response);
                var text = response.responseText,
                    idiomas = Ext.decode(text);

                APP.core.config.Locale.languages = idiomas;
                console.log(idiomas);
                localStorage.setItem('idioma', 'es_MX');
//                APP.core.config.Locale.localize('en_US');
            },
            failure: function(response, opts) {
                Ext.Msg.alert("Error", "No se encontró el archivo de configuración de idioma");
            }
        });        
    }*/
});