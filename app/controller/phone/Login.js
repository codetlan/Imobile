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

    /**
    * Loguea al usuario.
    * btn Éste botón
    */
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
                    
                    me.revisaEventosPendientes();

                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarCliente, 
                                response.Descripcion, Ext.emptyFn);
                }

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

    /**
    * Muestra la pantalla de configuración.
    */
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

    /**
    * Guarda la configuración establecida.
    */
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

    /**
    * Muestra un MsgBox y ejecuta la función de acuerdo a la opción elegida.
    * @titulo El título del mensaje.
    * @mensaje El mensaje.
    * @ancho El ancho de la ventana del mensaje.
    * @param funcion La función a ejecutarse de acuerdo a la opción elegida.
    */
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

    /**
    * Regresa a la vista de Login.
    */
    onConfigBackButton: function () {
        this.getLoginPanel().setActiveItem(0);
    },

    /**
    * Obtiene las rutas sin visitar y las actividades pendientes para mostrarlas en un aviso.
    */
    calendariza: function (){
        var me = this,
            hoy = Ext.Date.format(new Date(), "Y-m-d"),
            semanaPasada = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
            horaHoy = Ext.Date.format(new Date(), "H:i:s"),
            margen = 120,
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                Usuario: localStorage.getItem("CodigoUsuario"),
                FechaInicio: semanaPasada,
                FechaFin: hoy,
                CodigoCliente: ""
            };

        // console.log(hoy);
        // console.log(horaHoy);

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
                    
                    //console.log(horaActual, horaEvento, horaHoy > resultados[0].HoraInicio.substring(0,5), 
                    //    Ext.Date.diff(horaActual, horaEvento, "mi"));

                    for(var i = 0; i < resultados.length; i++) { // Checamos si hay eventos vencidos.
                        if(resultados[i].Estatus == 0){

                            eventos +=  "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.rutaVencida + "</b></font><br>" +
                                        "<div><p><font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.ruta + "</b></font>" + resultados[i].Descripcion + "<br>" +
                                        "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.fecha + "</b></font>" + me.formateaFecha(resultados[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                        "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.horaInicio + "</b></font>" + resultados[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                        "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.horaFin + "</b></font>" + resultados[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                        "</div>";

                            contadorEventos++;
                        }
                    }                    

                    for(var i = 0; i < resultados.length; i++) {
                        //if(horaHoy < resultados[i].HoraInicio){
                        if(resultados[i].Estatus == 2){
                            horaEvento = Ext.Date.parse(resultados[i].HoraInicio, "H:i:s");
                            diferencia = Ext.Date.diff(horaActual, horaEvento, "mi");                            

                            if(diferencia <= margen){
                                eventos +=  "<div><p><b>" + APP.core.config.Locale.config.lan.Rutas.ruta + "</b>" + resultados[i].Descripcion + "<br>" +
                                            "<b>" + APP.core.config.Locale.config.lan.Rutas.fecha + "</b>" + me.formateaFecha(resultados[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                            "<b>" + APP.core.config.Locale.config.lan.Rutas.horaInicio + "</b>" + resultados[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                            "<b>" + APP.core.config.Locale.config.lan.Rutas.horaFin + "</b>" + resultados[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                            "</div>";

                                contadorEventos++;
                            }
                        }
                    }

                Ext.data.JsonP.request({
                    url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/ObtenerActividades",
                    params: {
                        CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                        CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                        CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                        Token: localStorage.getItem("Token"),
                        Usuario: localStorage.getItem("CodigoUsuario"),
                        FechaInicio: semanaPasada,
                        FechaFin: hoy
                    },

                    
                    callbackKey: 'callback',
                    success: function (response) {
                        var procesada = response.Procesada;

                        if (procesada) {
                            var actividades = response.Data;

                            for(var i = 0; i < actividades.length; i++) { // Checamos si hay eventos vencidos.
                                if(actividades[i].Estatus == 0){                                    
                                    eventos +=  "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.actvidadVencida + "</b></font><br>" +
                                                "<div><p><font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.actividad + "</b></font>" + actividades[i].Descripcion + "<br>" +
                                                "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.fecha + "</b></font>" + me.formateaFecha(actividades[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                                "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.horaInicio + "</b></font>" + actividades[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                                "<font color = red><b>" + APP.core.config.Locale.config.lan.Rutas.horaFin + "</b></font>" + actividades[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                                "</div>";

                                    contadorEventos++;
                                }
                            }                    

                            for(var i = 0; i < actividades.length; i++) {
                                //if(horaHoy < actividades[i].HoraInicio){
                                if(actividades[i].Estatus == 2){
                                    horaEvento = Ext.Date.parse(actividades[i].HoraInicio, "H:i:s");
                                    diferencia = Ext.Date.diff(horaActual, horaEvento, "mi");

                                    if(diferencia <= margen){
                                        eventos +=  "<div><p><b>" + APP.core.config.Locale.config.lan.Rutas.actividad + "</b>" + actividades[i].Descripcion + "<br>" +
                                                    "<b>" + APP.core.config.Locale.config.lan.Rutas.fecha + "</b>" + me.formateaFecha(actividades[i].FechaInicio.substring(0,10), "-") + "<br>" +
                                                    "<b>" + APP.core.config.Locale.config.lan.Rutas.horaInicio + "</b>" + actividades[i].HoraInicio.substring(0,5) + " Hrs." + "<br>" + 
                                                    "<b>" + APP.core.config.Locale.config.lan.Rutas.horaFin + "</b>" + actividades[i].HoraFin.substring(0,5) + " Hrs." + "<br>" + "</p>" +
                                                    "</div>";

                                        contadorEventos++;
                                    }
                                }
                            }

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
                                            title: contadorEventos == 1 ? contadorEventos + APP.core.config.Locale.config.lan.Rutas.eventoPendiente : contadorEventos + APP.core.config.Locale.config.lan.Rutas.eventosPendientes
                                        }],
                                        scrollable: true
                                    });

                                    Ext.Viewport.getActiveItem().getAt(0).overlay.show();
                                }
                            } else {
                                //console.log("No hay eventos pendientes");
                            }

                        } else {
                            Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                        }
                    }
                });                    

                    //Ext.Msg.alert("Eventos pendientes", eventos);
                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarCliente, 
                                response.Descripcion, Ext.emptyFn);
                }
            },

            failure: function () {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenFalloTitle, 
                    APP.core.config.Locale.config.lan.Login.problemasConexionMsg, function () {                    
                });                
            }
        });        
    },

    /**
    * Obtiene los eventos pendientes (rutas y actividades) y les cambia el estatus a vencidos si ya ha pasado el tiempo de realización.
    */ 
    revisaEventosPendientes: function(){
        var me = this;
            hoy = new Date(),            
            semanaPasada = Ext.Date.add(hoy, Ext.Date.DAY, -7);
            rutaFechaHora = new Date(),
            task = Ext.Viewport.getActiveItem().getAt(0).task;
        //console.log("Revisando eventos");

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/ObtenerRutasSinVisitar",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                Usuario: localStorage.getItem("CodigoUsuario"),
                FechaInicio: semanaPasada,
                FechaFin: hoy,
                CodigoCliente: ""
            },

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada;                    

                if (procesada) {
                    var rutas = response.Data;

                    for(var i = 0; i < rutas.length; i++){
                        var formatoFecha = rutas[i].FechaInicio.substring(0,10),
                            formatoHora = rutas[i].HoraInicio;

                        rutaFechaHora = Ext.Date.parse(formatoFecha + " " + formatoHora, "Y-m-d H:i:s");
                        

                        if(hoy > rutaFechaHora){
                            if(rutas[i].Estatus == 2){                                
                                me.cambiaStatusRuta(rutas[i]);
                            }
                        }
                    }

                    Ext.data.JsonP.request({
                        url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/ObtenerActividades",
                        params: {
                            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                            CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                            CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                            Token: localStorage.getItem("Token"),
                            Usuario: localStorage.getItem("CodigoUsuario"),
                            FechaInicio: semanaPasada,
                            FechaFin: hoy
                        },

                        callbackKey: 'callback',
                        success: function (response) {
                            var procesada = response.Procesada;

                            if (procesada) {
                                var actividades = response.Data;

                                for(var i = 0; i < actividades.length; i++){
                                    var formatoFecha = actividades[i].FechaInicio.substring(0,10),
                                        formatoHora = actividades[i].HoraInicio;

                                    rutaFechaHora = Ext.Date.parse(formatoFecha + " " + formatoHora, "Y-m-d H:i:s");                                    

                                    if(hoy > rutaFechaHora){
                                        if(actividades[i].Estatus == 2){                                            
                                            me.cambiaStatusActividad(actividades[i]);
                                        }
                                    }
                                }

                                me.calendariza();
                                //task.delay(10000, me.re.bind(me));
                                task.delay(900000, me.revisaEventosPendientes.bind(me));

                            } else {
                                Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                            }
                        }
                    });

                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            }
        });
        //console.log(nada);
        //task.delay(10000, me.revisaEventosPendientes.bind(me));
    },

    /**
    * Cambia el estatus a vencido de la ruta que le pasan.
    * @param ruta La ruta a cambiar de estatus.
    */
    cambiaStatusRuta: function(ruta){
        var me = this,
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/ActualizarRuta",            
            horaInicio = new Date(),
            horaFin = new Date();
        
        horaInicio.setHours(ruta.HoraInicio.substr(0,2));
        horaInicio.setMinutes(ruta.HoraInicio.substr(3,2));
        horaInicio.setMilliseconds(ruta.HoraInicio.substr(6,2));

        horaFin.setHours(ruta.HoraFin.substr(0,2));
        horaFin.setMinutes(ruta.HoraFin.substr(3,2));
        horaFin.setMilliseconds(ruta.HoraFin.substr(6,2));        

         var params = {
            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
            CodigoSociedad: localStorage.getItem("CodigoSociedad"),
            CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
            Token: localStorage.getItem("Token"),
            "Ruta.CodigoRuta" : ruta.CodigoRuta,
            "Ruta.CodigoCliente" : ruta.CodigoCliente,
            "Ruta.CodigoDireccion" : ruta.CodigoDireccion,
            "Ruta.TipoDireccion" : ruta.TipoDireccion,
            "Ruta.FechaInicio" : Ext.util.Format.date(ruta.start,"Y-m-d"),
            "Ruta.HoraInicio" : Ext.util.Format.date(horaInicio,"H:i:s"),
            "Ruta.FechaFin" : Ext.util.Format.date(ruta.end,"Y-m-d"),
            "Ruta.HoraFin" : Ext.util.Format.date(horaFin,"H:i:s"),
            "Ruta.Descripcion" : ruta.Descripcion,
            "Ruta.Notas" : ruta.Notas,
            "Ruta.Repetir" : ruta.Repetir?true:false,
            "Ruta.Lunes" : ruta.Lunes?true:false,
            "Ruta.Martes" : ruta.Martes?true:false,
            "Ruta.Miercoles" : ruta.Miercoles?true:false,
            "Ruta.Jueves" : ruta.Jueves?true:false,
            "Ruta.Viernes" : ruta.Viernes?true:false,
            "Ruta.Sabado" : ruta.Sabado?true:false,
            "Ruta.Domingo" : ruta.Domingo?true:false,
            "Ruta.Notas"   : ruta.Notas,
            "Ruta.LatitudOrigen": ruta.LatitudOrigen,
            "Ruta.LongitudOrigen": ruta.LongitudOrigen,
            "Ruta.Estatus" : 0,
            "Ruta.HoraVisita": "00:00:00",
            "Ruta.FechaVisita": Ext.util.Format.date(ruta.end,"Y-m-d")
        };

        Ext.data.JsonP.request({
            url: url,
            params: params,

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    //console.log("Se cambió un estatus de ruta");
                }
                else {
                    //console.log("No se cambió un estatus de ruta");                    
                }
            },
            failure: function () {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {                    
                });
            }
        });
    },

    /**
    * Cambia el estatus a vencido de la actividad que le pasan.
    * @param actividad La actividad a cambiar de estatus.
    */
    cambiaStatusActividad:function(actividad){

        if(actividad.Descripcion != ""){

            var horaInicio = new Date(),
                horaFin = new Date();
            
            horaInicio.setHours(actividad.HoraInicio.substr(0,2));
            horaInicio.setMinutes(actividad.HoraInicio.substr(3,2));
            horaInicio.setMilliseconds(actividad.HoraInicio.substr(6,2));

            horaFin.setHours(actividad.HoraFin.substr(0,2));
            horaFin.setMinutes(actividad.HoraFin.substr(3,2));
            horaFin.setMilliseconds(actividad.HoraFin.substr(6,2));

            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Actividad.CodigoActividad":actividad.CodigoActividad,
                "Actividad.FechaInicio" : actividad.FechaInicio.substring(0,10),
                "Actividad.HoraInicio" : Ext.util.Format.date(horaInicio,"H:i:s"),
                "Actividad.FechaFin" : actividad.FechaFin.substring(0,10),
                "Actividad.HoraFin" : Ext.util.Format.date(horaFin,"H:i:s"),
                "Actividad.Descripcion" : actividad.Descripcion,
                "Actividad.Notas" : actividad.Notas,
                "Actividad.Repetir" : actividad.Repetir?true:false,
                "Actividad.Lunes" : actividad.Lunes?true:false,
                "Actividad.Martes" : actividad.Martes?true:false,
                "Actividad.Miercoles" : actividad.Miercoles?true:false,
                "Actividad.Jueves" : actividad.Jueves?true:false,
                "Actividad.Viernes" : actividad.Viernes?true:false,
                "Actividad.Sabado" : actividad.Sabado?true:false,
                "Actividad.Domingo" : actividad.Domingo?true:false,
                "Actividad.Notas"   : actividad.Notas,
                "Actividad.Estatus" : 0
            };

            console.log(params);

            Ext.data.JsonP.request({
                url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/ActualizarActividad",
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    var procesada = response.Procesada

                    if (procesada) {
                        console.log("Se cambió un estatus de actividad");
                    }
                    else {
                        console.log("No se cambió un estatus de actividad");
                    }

                },
                failure: function () {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                    APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {                        
                    });                    
                }
            });
        }
        else{
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos, 
                APP.core.config.Locale.config.lan.Rutas.tituloObligatorio, Ext.emptyFn);            
        }
    },    

    /**
    * Formatea la fecha  a dd mm aaaa con el separador que le pasan.
    * @param La fecha a formatear.
    * @param separador El separador a emplear.
    */
    formateaFecha: function (fecha, separador){        
        var dia = fecha.substring(8,10),
            mes = fecha.substring(5,7),
            anio = fecha.substring(0,4);

        return dia + separador + mes + separador + anio;
    }
});