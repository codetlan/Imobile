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
            me = this,
            values = form.getValues();            

        //localStorage.setItem("dirIP", values.servidor);
        //localStorage.setItem("idioma", values.idioma);
        localStorage.setItem("idioma", APP.core.config.Locale.config.lan.Lenguaje.idioma);

        Ext.Viewport.setMasked({xtype: 'loadmask', message: APP.core.config.Locale.config.lan.Login.accediendo});

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
                    Ext.Viewport.getActiveItem().getAt(0).task = Ext.create('Ext.util.DelayedTask', {
                                                                                fn: function() {
                                                                                    console.log('Calendariza');
                                                                                }
                                                                            });
                    Ext.Viewport.getActiveItem().getAt(0).overlay = new Ext.Panel({
                                                                            hidden: true
                                                                        });

                    var task = Ext.Viewport.getActiveItem().getAt(0).task;                    

                    APP.core.data.Store.ProxyUrlClient = localStorage.getItem("dirIP");

                    task.delay(10000, me.calendariza.bind(me));

                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarCliente, 
                                response.Descripcion, Ext.emptyFn);
                }

                
                //task.setFn(me.calendariza.bind(me));                

                //task.delay(3000);            

                Ext.Viewport.setMasked(false);                

            },
            failure: function () {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenFalloTitle, 
                    APP.core.config.Locale.config.lan.Login.problemasConexionMsg, function () {
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

        me.confirma(APP.core.config.Locale.config.lan.Login.confirmaTitle,
         APP.core.config.Locale.config.lan.Login.confirmaMsg, 300,
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
                text   : APP.core.config.Locale.config.lan.Ordenes.confirmaNo
            },{
                itemId : 'yes',
                text   : APP.core.config.Locale.config.lan.Ordenes.confirmaSi,
                ui     : 'action'
            }],
            fn: funcion
        });
    },

    onConfigBackButton: function () {
        this.getLoginPanel().setActiveItem(0);
    },

    calendariza: function (){
        var me = this,
            hoy = Ext.Date.format(new Date(), "Y-m-d"),
            horaHoy = Ext.Date.format(new Date(), "H:i:s"),
            margen = 120,
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                Usuario: localStorage.getItem("CodigoUsuario"),
                FechaInicio: hoy,
                FechaFin: hoy,
                CodigoCliente: ""
            };

        console.log(hoy);
        console.log(horaHoy);

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/ObtenerRutasSinVisitar",
            params: params,

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    var eventos = "",
                        horaActual = new Date(),
                        horaEvento = new Date(),
                        diferencia,
                        resultados = response.Data;
                        
                    contadorEventos = 0;
                    horaActual = Ext.Date.parse(horaHoy, "H:i:s");
                    
                    console.log(horaActual, horaEvento, horaHoy > resultados[0].HoraInicio.substring(0,5), 
                        Ext.Date.diff(horaActual, horaEvento, "mi"));

                    for(var i = 0; i < resultados.length; i++) { // Checamos si hay eventos vencidos.
                        if(resultados[i].Estatus == 0){

                            eventos +=  "<b>Evento Vencido</b><br>" +
                                        "<div><p><b>Evento: </b>" + resultados[i].Descripcion + "<br>" +
                                        "<b>Fecha: </b>" + me.formateaFecha(resultados[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                        "<b>Hora Inicio: </b>" + resultados[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                        "<b>Hora Fin: </b>" + resultados[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                        "</div>";
                        }
                    }                    

                    for(var i = 0; i < resultados.length; i++) {
                        if(horaHoy < resultados[i].HoraInicio){
                            horaEvento = Ext.Date.parse(resultados[i].HoraInicio, "H:i:s");
                            diferencia = Ext.Date.diff(horaActual, horaEvento, "mi");

                            if(diferencia <= margen){
                                eventos +=  "<div><p><b>Evento: </b>" + resultados[i].Descripcion + "<br>" +
                                            "<b>Fecha: </b>" + me.formateaFecha(resultados[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                            "<b>Hora Inicio: </b>" + resultados[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                            "<b>Hora Fin: </b>" + resultados[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                            "</div>";

                                contadorEventos++;
                            }
                        }
                    }

                    //console.log(eventos);
                    if(contadorEventos > 0){
                        if(Ext.Viewport.getActiveItem().getAt(0).overlay.getHidden()){
                            Ext.Viewport.getActiveItem().getAt(0).overlay = Ext.Viewport.add({
                                xtype: 'panel',
                                modal: true,
                                hideOnMaskTap: true,
                                showAnimation:{
                                    type: 'popIn',
                                    duration: 250,
                                    easing: 'ease-out'
                                },
                                hideAnimation: {
                                    type: 'popOut',
                                    duration: 250,
                                    easing: 'ease-out'
                                },
                                centered: true,
                                width: Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400,
                                height: Ext.filterPlatform('ie10') ? '30%' : Ext.os.deviceType == 'Phone' ? 220 : 400,
                                styleHtmlContent: true,
                                html: eventos,
                                items: [
                                {
                                    docked: 'top',
                                    xtype: 'toolbar',
                                    title: contadorEventos == 1 ? contadorEventos + ' evento pendiente' : contadorEventos + ' eventos pendientes'
                                }],
                                scrollable: true
                            });

                            Ext.Viewport.getActiveItem().getAt(0).overlay.show();
                        }
                    } else {
                        console.log("No hay eventos pendientes");
                    }

                    //Ext.Msg.alert("Eventos pendientes", eventos);
                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarCliente, 
                                response.Descripcion, Ext.emptyFn);
                }
            },

            failure: function () {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenFalloTitle, 
                    APP.core.config.Locale.config.lan.Login.problemasConexionMsg, function () {
                    //Ext.Viewport.setMasked(false);
                });
                //Ext.Viewport.setMasked(false);
            },            
        });

        //task = Ext.Viewport.getActiveItem().getAt(0).task; 
        //console.log(new Date());
        console.log(nada);
    },

    formateaFecha: function (fecha, separador){
        "2014-10-31"
        var dia = fecha.substring(8,10),
            mes = fecha.substring(5,7),
            anio = fecha.substring(0,4);

        return dia + separador + mes + separador + anio;
    }

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