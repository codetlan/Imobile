/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Rutas', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.util.DelayedTask'],
    config:{
        refs:{
            menuNav:'menunav',
            mainCard:'maincard',
            navigationOrden:'navigationorden',

            // Actividades
            actividadesCalendario:'actividadescalendario',
            actividadesCalendarioCont:'actividadescalendariocont',
            actividadesCalendarioContNd:'actividadescalendariocont hiddenfield[name=ndhf]',
            actividadesCalendarioDia:'actividadescalendariodia',
            actividadesForm:'actividadesform',
            actividadesContRepetir:'actividadesform fieldset[id=actividadesrepetir]',


            //Rutas
            rutasCalendarioCont:'rutascalendariocont',
            clientesList:'clienteslist',
            rutasCalendario:'rutascalendario',
            rutasCalendarioDia:'rutascalendariodia',
            rutasCalendarioDirecciones:'rutascalendariodirecciones',
            rutasContRepetir:'rutasform fieldset[id=rutasrepetir]',
            rutasCalendarioMapa:'rutascalendariomapa',
            rutasForm:'rutasform'

        },
        control:{
            'opcionrutasactividades': {
                itemtap:'onRutasActividadesTap'
            },

            //######################################################################
            // Actividades
            //######################################################################

            'actividadescalendario':{
                periodchange:function(calendar,mindate,maxdate,direction){

                    var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(mindate),"Y-m-d");
                    var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(maxdate),"Y-m-d");

                    this.loadActividadesCalendario(firstDay,lastDay);
                },

                selectionchange:'onActividadesCalendarioTap'
            },

            'actividadescalendariocont button[action=agregar]':{
                tap:'showFormActividades'
            },

            'actividadesform checkboxfield[name=Repetir]':{
                change:function(cb,check){
                    var acr = this.getActividadesContRepetir();
                    if(check){
                        acr.setHidden(false);
                    }
                    else{
                        acr.setHidden(true);
                    }
                }
            },

            'actividadesform button[action=guardar]':{
                tap:'onActividadesAdd'
            },

            'actividadescalendariodia':{
                itemtap:'onActividadesEdit'
            },
            'button[action=realizaractividad]':{
                tap:function(){
                    this.onActividadesUpdate(1);
                }
            },
            'button[action=cancelaractividad]':{
                tap:function(){
                    this.onActividadesUpdate(3);
                }
            },

            //######################################################################
            // Rutas
            //######################################################################

            'container[xtype=rutascalendariocont] clienteslist': {
                itemsingletap:'onSeleccionarCliente'
            },
            'rutascalendario':{
                periodchange:function(calendar,mindate,maxdate,direction){

                    var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(mindate),"Y-m-d");
                    var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(maxdate),"Y-m-d");

                    this.loadRutasCalendario(firstDay,lastDay);
                },
                selectionchange:'onRutasCalendarioTap'
            },

            'container[id=rutascalendarioshowform] button[action=agregar]':{
                tap:'muestraClientes'
            },
            'rutasform checkboxfield[name=Repetir]':{
                change:function(cb,check){
                    var acr = this.getRutasContRepetir();
                    if(check){
                        acr.setHidden(false);
                    }
                    else{
                        acr.setHidden(true);
                    }
                }
            },
            'rutasform rutascalendariodirecciones':{
                itemtap:'onSeleccionarDireccion'
            },
            'rutasform button[action=guardar]':{
                tap:'onRutasAdd'
            },
              'container[id=accionesParaRutas] button': {
                tap:'determinaAccion'
            }
        }
    },

    //#######################################################################
    // Primera vista para seleccionar actividades o rutas
    //#######################################################################

    /**
    * Muestra la pantalla de la opción elegida.
    * @param list Ésta lista.
    * @param index El índice del ítem tapeado.
    * @param target el elemento o DataItem tapeado.
    * @param record El record asociado al ítem.
    */
    onRutasActividadesTap:function(list, index, target, record){
        var opcion = record.get('action');

        switch(opcion){
            case 'actividades':
                this.getMenuNav().push({
                    xtype:'actividadescalendario',
                    title: APP.core.config.Locale.config.lan.Actividades.actividades
                });

                var date = new Date();

                var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                this.loadActividadesCalendario(firstDay,lastDay);

                break;
            case 'rutas':
                this.getMenuNav().push({
                    xtype: 'rutascalendario',
                    title: APP.core.config.Locale.config.lan.Actividades.rutas
                });

                var date = new Date();

                var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                this.loadRutasCalendario(firstDay,lastDay, "");

                break;            
        }
    },

    //#######################################################################
    //Actividades
    //#######################################################################

    /**
    * Obtiene las actividades del intervalo de fechas ingresado.
    * @param fechaInicio el primer día del intervalo.
    * @param fechafin el último día del intervalo.
    */
    loadActividadesCalendario: function(fechaInicio,fechaFin){

        var ac = this.getActividadesCalendario(),
            store = ac.view.eventStore;

        var params = {
            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
            CodigoSociedad: localStorage.getItem("CodigoSociedad"),
            CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
            Token: localStorage.getItem("Token"),
            Usuario: localStorage.getItem("CodigoUsuario"),
            FechaInicio: fechaInicio,
            FechaFin: fechaFin
        };

        Ext.Viewport.setMasked({xtype:'loadmask',message: APP.core.config.Locale.config.lan.Rutas.cargando});

        store.clearFilter();
        store.setParams(params);
        store.load({
            callback:function(){
                Ext.Viewport.setMasked(false);
                if(ac.element){
                    ac.element.redraw();
                }

            },
            scope:this
        });
    },

    /**
    * Obtiene las actividades del día seleccionado en el calendario.
    * @param calendar Éste calendar.
    * @param nd El día seleccionado.
    */
    onActividadesCalendarioTap:function(calendar, nd){
        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);


        this.getMenuNav().push({
            xtype:'actividadescalendariocont',
            items:[{
                xtype:'container',
                html:"<div style='text-align:center; padding:3px; color:#1F83FB;'>" + Ext.util.Format.date(nd,"l d/m/y") + "</div>"
            },{
                xtype:'hiddenfield',
                name:'ndhf',
                value:nd
            },{
                xtype:'actividadescalendariodia',
                flex:1
            },{
                xtype:'button',
                action:'agregar',
                text: APP.core.config.Locale.config.lan.Rutas.agregar,
                margin:10
            }]
        });

        this.getActividadesCalendarioDia().getStore().setData(calendar.eventStore.getRange());
    },

    /**
    * Filtra las actividades del día seleccionado, regresa pop pantallas y las muestra.
    * @param calendar Éste calendar.
    * @param nd El día elegido.
    * @param pop el número de vistas que regresa.
    */
    onActividadesCalendarioFormPop:function(calendar, nd, pop){
        nd = new Date(nd);

        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);


        this.getMenuNav().pop(pop);

        this.getActividadesCalendarioDia().getStore().setData(calendar.eventStore.getRange());

    },

    /**
    * Muestra el form de actividades.
    * @param b Éste button.
    */
    showFormActividades:function(b){
        var me = this,
            nd = me.getActividadesCalendarioContNd().getValue(),
            nd2 = new Date(nd);
            today = new Date();

            today.setHours(0,0,0,0);

        if(today <= nd2){
            me.getMenuNav().push({
                xtype:'actividadesform',
                flex:1,
                listeners:{
                    activate:function(form){
                        form.setValues({
                            FechaInicio:new Date(nd),
                            FechaFin:new Date(nd)
                        });
                    }
                }
            });
        } else {
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.diasAnterioresActividadTitulo,
             APP.core.config.Locale.config.lan.Rutas.diasAnterioresActividadMensaje, Ext.emptyFn);
        }
    },

    /**
    * Agrega una actividad.
    * @param Éste button.
    */
    onActividadesAdd:function(btn){

        var form = this.getActividadesForm(),
            values = form.getValues();

        if(values.Descripcion != ""){

            if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin, false)){
                Ext.Viewport.setMasked({xtype: 'loadmask', message: APP.core.config.Locale.config.lan.Rutas.guardando});

                if(values.CodigoActividad > 0){
                    var url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/ActualizarActividad";
                }
                else{
                    var url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/AgregarActividad"
                }

                Ext.data.JsonP.request({
                    url: url,
                    params: {
                        CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                        CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                        CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                        Token: localStorage.getItem("Token"),
                        "Actividad.CodigoActividad" : values.CodigoActividad,
                        "Actividad.FechaInicio" : Ext.util.Format.date(values.FechaInicio,"Y-m-d"),
                        "Actividad.HoraInicio" : Ext.util.Format.date(values.HoraInicio,"H:i:s"),
                        "Actividad.FechaFin" : Ext.util.Format.date(values.FechaFin,"Y-m-d"),
                        "Actividad.HoraFin" : Ext.util.Format.date(values.HoraFin,"H:i:s"),
                        "Actividad.Descripcion" : values.Descripcion,
                        "Actividad.Notas" : values.Notas,
                        "Actividad.Repetir" : values.Repetir?true:false,
                        "Actividad.Lunes" : values.Lunes?true:false,
                        "Actividad.Martes" : values.Martes?true:false,
                        "Actividad.Miercoles" : values.Miercoles?true:false,
                        "Actividad.Jueves" : values.Jueves?true:false,
                        "Actividad.Viernes" : values.Viernes?true:false,
                        "Actividad.Sabado" : values.Sabado?true:false,
                        "Actividad.Domingo" : values.Domingo?true:false,
                        "Actividad.Notas"   : values.Notas,
                        "Actividad.Estatus" : 2
                    },
                    callbackKey: 'callback',
                    success: function (response) {
                        var procesada = response.Procesada

                        if (procesada) {
                            var ac = this.getActividadesCalendario(),
                                store = ac.view.eventStore;

                            store.load({
                                callback:function(){
                                    ac.element.redraw();
                                    this.onActividadesCalendarioFormPop(ac.view,this.getActividadesCalendarioContNd().getValue(),1);
                                    Ext.Viewport.setMasked(false);
                                },
                                scope:this
                            });
                        }
                        else {
                            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                            response.Descripcion, Ext.emptyFn);
                            Ext.Viewport.setMasked(false);
                        }

                    },
                    failure: function () {
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                         APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {
                            Ext.Viewport.setMasked(false);
                        });
                        Ext.Viewport.setMasked(false);
                    },
                    scope: this
                });
            }
            else{
                //Ext.Msg.alert('Datos Incorrectos', "Las fechas son inválidas", Ext.emptyFn);
            }
        }
        else{
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
            APP.core.config.Locale.config.lan.Rutas.tituloObligatorio, Ext.emptyFn);            
        }
    },

    /**
    * Edita una actividad.
    * @param list Ésta lista.
    * @param index El índice del ítem tapeado.
    * @param target El elemento o DateItem tapeado
    * @param record El record asociado al ítem.
    */
    onActividadesEdit:function(list,index,target,record){
        var form = this.getActividadesForm();
        var items=[{
            xtype:'actividadesform',
            flex:1,
            nd:this.getActividadesCalendarioCont().nd
        }];

        if(record.data.Estatus != 1 && record.data.Estatus != 3){
            items.push({
                xtype:'container',
                padding:'0 10px 10px 10px',
                layout:{
                    type:'hbox',
                    align: 'stretch'
                },
                items:[{
                    xtype:'button',
                    text: APP.core.config.Locale.config.lan.Rutas.realizada,
                    action:'realizaractividad',
                    flex:1
                },{
                    xtype:'button',
                    text: APP.core.config.Locale.config.lan.Rutas.cancelar,
                    action:'cancelaractividad',
                    flex:1
                }]
            });
        }
        else{
            if(record.data.Estatus == 2){

            }
        }


        this.getMenuNav().push({
            xtype:'container',
            layout:{
                type:'vbox'
            },
            items:items
        })

        var form = this.getActividadesForm();

        var horaInicio = new Date();
        horaInicio.setHours(record.data.HoraInicio.substr(0,2));
        horaInicio.setMinutes(record.data.HoraInicio.substr(3,2));
        horaInicio.setMilliseconds(record.data.HoraInicio.substr(6,2));

        var horaFin = new Date();
        horaFin.setHours(record.data.HoraFin.substr(0,2));
        horaFin.setMinutes(record.data.HoraFin.substr(3,2));
        horaFin.setMilliseconds(record.data.HoraFin.substr(6,2));

        form.setValues({
            CodigoActividad:record.data.CodigoActividad,
            Descripcion:record.data.title,
            FechaInicio:record.data.start,
            HoraInicio: horaInicio,
            FechaFin:record.data.end,
            HoraFin: horaFin,
            Notas:record.data.Notas,
            Repetir:record.data.Repetir,
            Lunes:record.data.Lunes,
            Martes:record.data.Martes,
            Miercoles:record.data.Miercoles,
            Jueves:record.data.Jueves,
            Viernes:record.data.Viernes,
            Sabado:record.data.Sabado,
            Domingo:record.data.Domingo
        });

        if(record.data.Estatus != 2){
            var btnGuardar = form.down("button[action=guardar]").destroy();
            form.down("textfield[name=Descripcion]").setReadOnly(true);
            form.down("datepickerfield[name=FechaInicio]").setReadOnly(true);
            form.down("timepickerfield[name=HoraInicio]").setReadOnly(true);
            form.down("datepickerfield[name=FechaFin]").setReadOnly(true);
            form.down("timepickerfield[name=HoraFin]").setReadOnly(true);
            form.down("checkboxfield[name=Repetir]").disable();
            form.down("checkboxfield[name=Lunes]").disable();
            form.down("checkboxfield[name=Martes]").disable();
            form.down("checkboxfield[name=Miercoles]").disable();
            form.down("checkboxfield[name=Jueves]").disable();
            form.down("checkboxfield[name=Viernes]").disable();
            form.down("checkboxfield[name=Sabado]").disable();
            form.down("checkboxfield[name=Domingo]").disable();

        }
    },

    /**
    * Actualiza una actividad.
    * @param status El nuevo estatus de la actividad.
    */
    onActividadesUpdate:function(status){

        var form = this.getActividadesForm(),
            values = form.getValues();

        if(values.Descripcion != ""){

            if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin, true)){
                Ext.Viewport.setMasked({xtype: 'loadmask', message: APP.core.config.Locale.config.lan.Rutas.guardando});

                Ext.data.JsonP.request({
                    url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/ActualizarActividad",
                    params: {
                        CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                        CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                        CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                        Token: localStorage.getItem("Token"),
                        "Actividad.CodigoActividad":values.CodigoActividad,
                        "Actividad.FechaInicio" : Ext.util.Format.date(values.FechaInicio,"Y-m-d"),
                        "Actividad.HoraInicio" : Ext.util.Format.date(values.HoraInicio,"H:i:s"),
                        "Actividad.FechaFin" : Ext.util.Format.date(values.FechaFin,"Y-m-d"),
                        "Actividad.HoraFin" : Ext.util.Format.date(values.HoraFin,"H:i:s"),
                        "Actividad.Descripcion" : values.Descripcion,
                        "Actividad.Notas" : values.Notas,
                        "Actividad.Repetir" : values.Repetir?true:false,
                        "Actividad.Lunes" : values.Lunes?true:false,
                        "Actividad.Martes" : values.Martes?true:false,
                        "Actividad.Miercoles" : values.Miercoles?true:false,
                        "Actividad.Jueves" : values.Jueves?true:false,
                        "Actividad.Viernes" : values.Viernes?true:false,
                        "Actividad.Sabado" : values.Sabado?true:false,
                        "Actividad.Domingo" : values.Domingo?true:false,
                        "Actividad.Notas"   : values.Notas,
                        "Actividad.Estatus" : status
                    },
                    callbackKey: 'callback',
                    success: function (response) {
                        var procesada = response.Procesada

                        if (procesada) {
                            var ac = this.getActividadesCalendario(),
                                store = ac.view.eventStore;

                            store.load({
                                callback:function(){
                                    ac.element.redraw();
                                    this.onActividadesCalendarioFormPop(ac.view,this.getActividadesCalendarioContNd().getValue(),1);
                                    Ext.Viewport.setMasked(false);
                                },
                                scope:this
                            });
                        }
                        else {
                            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                            response.Descripcion, Ext.emptyFn);
                            Ext.Viewport.setMasked(false);
                        }

                    },
                    failure: function () {
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                        APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {
                            Ext.Viewport.setMasked(false);
                        });
                        Ext.Viewport.setMasked(false);
                    },
                    scope: this
                });
            }
            else{                
                //Ext.Msg.alert('Datos Incorrectos', "Las fechas son inválidas", Ext.emptyFn);
            }
        }
        else{
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos, 
                APP.core.config.Locale.config.lan.Rutas.tituloObligatorio, Ext.emptyFn);
            
        }
    },

    /**
    * Valida la fecha y hora de inicio de un evento.
    * @param fechaInicio La fecha de inicio.
    * @param horaInicio La hora de inicio.
    * @param fechaFin La fecha de término.
    * @param horaFin La hora de término.
    * @param esActualización Booleano para distinguir si es una actualización o no.
    * @return verdadero si las fechas son válidas..
    */    
    validarFechas:function(fechaInicio,horaInicio,fechaFin,horaFin, esActualizacion){
        var me = this;

        if(!esActualizacion){
            var hoy = new Date();

            console.log(me.dameFecha(hoy));
            console.log(me.dameFecha(fechaInicio));

            if(me.dameFecha(hoy) == me.dameFecha(fechaInicio)){
                //alert('no es actualizacion');
                if(hoy.getTime() > horaInicio.getTime()){
                  //  alert('horario atrazado');
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                    APP.core.config.Locale.config.lan.Rutas.horaInicioMenor, Ext.emptyFn);
                    return false;
                }   
            }
        }

        if(fechaInicio.getTime() > fechaFin.getTime()){
            //alert('Fecha inicio mayor que fecha fin');
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
            APP.core.config.Locale.config.lan.Rutas.fechasInvalidas, Ext.emptyFn);
            return false;
        }
        if(fechaInicio.getTime() == fechaFin.getTime()){
            if(horaInicio.getTime() >= horaFin.getTime()){
              //  alert('hora inicio mayor que hora fin');
              Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
              "Las hora de inicio es después de la hora de término", Ext.emptyFn);
                return false;
            }
        }

        return true;
    },

    //#######################################################################
    // Rutas
    //#######################################################################

    /**
    * Obtiene los datos del cliente seleccionado.
    * @param list Ésta lista.
    * @param index El índice del ítem tapeado.
    * @param target El elemento o DataItem tapeado.
    * @param El record asociado al ítem.
    */
    onSeleccionarCliente:function(list, index, target, record){        
        var me = this,
            name = record.get('NombreSocio'),
            idCliente = record.get('CodigoSocio'),
            titulo = name;

        if(me.getMenuNav().getActiveItem().isXType('rutasform')){
            return;
        }

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarClienteCargar);
        Ext.Viewport.setMasked(true);

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerSocioiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: idCliente
            },
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    var direcciones = response.Data[0].Direcciones;
                    if (direcciones.length > 0){

                        barraTitulo = ({
                            xtype: 'toolbar',
                            docked: 'top',
                            title: titulo
                        });

                        this.showFormRutas(idCliente, direcciones);

                        this.getMenuNav().add(barraTitulo);
                        Ext.Viewport.setMasked(false);
                    }
                    else{
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.sinDireccionTitulo,
                        APP.core.config.Locale.config.lan.Rutas.sinDireccionMensaje, Ext.emptyFn);
                        Ext.Viewport.setMasked(false);
                    }
                } else {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos, response.Descripcion, Ext.emptyFn);
                }
            },
            scope: this
        });
    },

    /**
    * Obtiene las rutas del intervalo de fechas y código de cliente ingresado.
    * @param fechaInicio el primer día del intervalo.
    * @param fechafin el último día del intervalo.
    * @param codigoCliente El código del cliente.
    */    
    loadRutasCalendario: function(fechaInicio,fechaFin, codigoCliente){

        var ac = this.getRutasCalendario(),
            store = ac.view.eventStore;

        var params = {
            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
            CodigoSociedad: localStorage.getItem("CodigoSociedad"),
            CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
            Token: localStorage.getItem("Token"),
            Usuario: localStorage.getItem("CodigoUsuario"),
            FechaInicio: fechaInicio,
            FechaFin: fechaFin,
            CodigoCliente: codigoCliente//ac.idCliente
        };

        Ext.Viewport.setMasked({xtype:'loadmask',message: APP.core.config.Locale.config.lan.Rutas.cargando});

        store.clearFilter();
        store.setParams(params);
        store.load({
            callback:function(){
                Ext.Viewport.setMasked(false);
                if(ac.element){
                    ac.element.redraw();
                }
            },
            scope:this
        });
    },

    /**
    * Obtiene las rutas del día seleccionado en el calendario.
    * @param calendar Éste calendar.
    * @param nd El día seleccionado.
    */
    onRutasCalendarioTap:function(calendar, nd){        
        var me = this;

        if(me.getMenuNav().getActiveItem().getId() == "rutascalendarioshowform"){            
            return;
        }

        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){

            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);

        this.getMenuNav().push({
            xtype:'container',
            id:'rutascalendarioshowform',
            title: 'Rutas',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'container',
                html:"<div style='text-align:center; padding:3px; color:#1F83FB;'>" + Ext.util.Format.date(nd,"l d/m/y") + "</div>"
            },{
                xtype: 'rutascalendariomapa',
                flex:1
            },{
                xtype:'button',
                action:'agregar',
                id: 'botonAgregar',
                text: APP.core.config.Locale.config.lan.Rutas.agregar,
                margin:10
            },{
                xtype:'container',
                id: 'accionesParaRutas',
                padding:'0 10px 10px 10px',
                hidden: true,
                layout:{
                    type:'hbox',
                    align: 'stretch'
                },
                items:[{
                    xtype:'button',
                    text: APP.core.config.Locale.config.lan.Rutas.visitar,
                    itemId:'realizarRuta',
                    margin: '0 5 0 0',
                    flex:1
                },{
                    xtype:'button',
                    text: APP.core.config.Locale.config.lan.Rutas.cancelarRuta,
                    itemId:'cancelarRuta',
                    margin: '0 0 0 5',
                    flex:1
                }]
            }]
        });

        me.getRutasCalendarioMapa().config.nd = nd;

        this.colocaMarcadores();
    },

    /**
    * Muestra el form de rutas.
    * @param idCliente el id del cliente.
    * @param direcciones las direcciones del cliente.
    */
    showFormRutas:function(idCliente, direcciones){        
        var rc = this.getRutasCalendario(),
            rutas = rc.view.eventStore,
            nd = this.getRutasCalendarioMapa().config.nd;      

        this.getMenuNav().push({
            xtype:'rutasform',
            flex:1,
            listeners:{
                scope:this,
                activate:function(form){
                    form.setValues({
                        CodigoCliente:idCliente,
                        FechaInicio:new Date(nd),
                        FechaFin:new Date(nd)                        
                    });

                    this.getRutasCalendarioDirecciones().getStore().setData(direcciones);                    
                }
            }
        })
    },

    /**
    * Intenta establecer la dirección seleccionada en el mapa.
    * @param list Ésta lista.
    * @param index El índice del ítem tapeado.
    * @param target El elemento o DataItem tapeado.
    * @param record El record asociado al ítem.
    */
    onSeleccionarDireccion:function(list,index,target,record){
        var data = record.data,
            form = this.getRutasForm();

        data.Calle      = data.Calle != null?data.Calle:"";
        data.NoExterior = data.NoExterior != null?data.NoExterior:"";
        data.Colonia    = data.Colonia != null?data.Colonia:"";
        data.Ciudad     = data.Ciudad != null?data.Ciudad:"";
        data.Municipio  = data.Municipio != null?data.Municipio:"";
        data.Estado     = data.Estado != null?data.Estado:"";

        var direccion = data.Estado + " " + data.Municipio + " " + data.Ciudad + " " + data.Colonia + " " + data.Calle + " " + data.NoExterior;

        Ext.Viewport.setMasked({xtype:'loadmask',message: APP.core.config.Locale.config.lan.Rutas.cargando});

        var geocoder = new google.maps.Geocoder();

        var extMapa = list.up('rutasform').down('rutascalendariomapa');//this.getRutasCalendarioMapa();

        var mapa = extMapa.getMap(),
            bounds = new google.maps.LatLngBounds();

        form.setValues({
            CodigoDireccion:data.CodigoDireccion,
            TipoDireccion:data.TipoDireccion,
            LatitudOrigen:0,
            LongitudOrigen:0
        });



        if(extMapa.marker){
            extMapa.marker.setMap(null);            
        }

        geocoder.geocode( { 'address': direccion}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {                

                form.setValues({
                    LatitudOrigen:results[0].geometry.location.k,
                    LongitudOrigen:results[0].geometry.location.B
                });

                mapa.setCenter(results[0].geometry.location);

                extMapa.marker = new google.maps.Marker({
                    map: mapa,
                    position: results[0].geometry.location,
                    draggable:true
                });

             bounds.extend(extMapa.marker.position); 

            mapa.setCenter(bounds.getCenter());                

                google.maps.event.addListener(extMapa.marker,"dragend",function(){
                    var point = extMapa.marker.getPosition();
                    mapa.panTo(point);

                    form.setValues({
                        LatitudOrigen:point.k,
                        LongitudOrigen:point.B
                    });
                });

            } else {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.sinUbicacionTitulo,
                    APP.core.config.Locale.config.lan.Rutas.sinUbicacionMensaje);
            }
            Ext.Viewport.setMasked(false);
        });
    },

    colocaMarcadores:function(){
        var me = this,
            ac = me.getRutasCalendario(),            
            rutas = ac.view.eventStore;
            marcadoresArray = new Array();
            //console.log(rutas.getCount(), ' en colocaMarcadores')
        if(rutas.getCount() > 0){
            var extMapa = this.getRutasCalendarioMapa(),
                mapa = extMapa.getMap(),
                ruta, icono,
                bounds = new google.maps.LatLngBounds();

            Ext.Viewport.setMasked({xtype:'loadmask',message: APP.core.config.Locale.config.lan.Rutas.cargando});

            if(extMapa.marker){
                extMapa.marker.setMap(null);                
            }
        
            rutas.each(function (item, index, length) {
                //console.log(item.get('firstName'), index);
                ruta = item.getData();  
                //console.log(ruta);
                var nd = extMapa.config.nd,                
                    today = new Date(),
                    horaInicio = ruta.HoraInicio.split(":", 2);
                //console.log(nd);
                    nd.setHours(parseInt(horaInicio[0]), parseInt(horaInicio[1]));

                if(nd < today){
                    if(ruta.Estatus == 2){
                        ruta.Estatus = 0;
                        me.getMenuNav().ruta = ruta;
                        me.getRutasCalendario().accion = 0;  
                        me.cambiaStatusRuta();
                    }                    
                }

                me.recuperaMarcador(extMapa, ruta, false);

                marcadoresArray.push(extMapa.marker);

                if(ruta.Estatus == 0 || ruta.Estatus == 2){
                    google.maps.event.addListener(extMapa.marker, 'click', function(){

                        me.eligeEditarTrazar(APP.core.config.Locale.config.lan.Rutas.editarTrazarTitulo,
                         APP.core.config.Locale.config.lan.Rutas.editarTrazarMensaje, 300, 
                        function (buttonId) {
                            if (buttonId == 'editar') {                                
                                me.dameDirecciones(item.data);
                            } else {
                                me.quitaMarcadores();                                
                                me.trazaRuta(item.data);
                            }
                        });
                    });                
                } else {
                    //console.log(item.data.FechaVisita, item.data.HoraVisita);
                    infowindow = new google.maps.InfoWindow({
                        content: "",
                        maxWidth: 200
                    });

                    (function(marcador){
                        var contenido = "<b>" + APP.core.config.Locale.config.lan.Rutas.fecha + " </b>" +
                                        Ext.Date.format(item.data.FechaVisita, "d/m/Y") +
                                        "<p><b>" + APP.core.config.Locale.config.lan.Rutas.hora + " </b>" + 
                                        item.data.HoraVisita.substr(0, 5) + " hrs.</p>";

                        google.maps.event.addListener(marcador, 'click', function(){
                            infowindow.setContent(contenido);
                            infowindow.open(mapa, marcador);                            
                        });
                    }) (marcadoresArray[index]);

                    google.maps.event.addListener(marcadoresArray[index], 'closeclick', function(){
                        infowindow.close();
                    })
                }

                bounds.extend(extMapa.marker.position);            
                mapa.fitBounds(bounds);

            });

            me.getRutasCalendario().marcadores = marcadoresArray;
        }

        Ext.Viewport.setMasked(false);
    },

    /**
    * Establece las opciones para la ruta
    * @param acciones Booleano que indica si el container con id accionesParaRutas estará visible.
    * @param boton Booleano que indica si el button con id botonAgregar estará visible.
    */
    ponOpcionesDeRuta: function(acciones, boton){
        var me = this,
            view = me.getMenuNav();

        view.getActiveItem().down('container[id=accionesParaRutas]').setHidden(acciones);
        view.getActiveItem().down('button[id=botonAgregar]').setHidden(boton);
    },

    /**
    * Muestra la lista de clientes.
    * @param Éste button.
    */
    muestraClientes: function(button) {
        Ext.Viewport.setMasked(true);
        var me = this,
            nd = button.getParent().down('rutascalendariomapa').config.nd,
            today = new Date();

        today.setHours(0,0,0,0);

//console.log(nd, today);

        if(today <= nd){
            me.getMenuNav().push({
                xtype:'rutascalendariocont',
                layout:'fit',
                items:[{
                    xtype:'clienteslist'
                }]
            });
            Ext.Viewport.setMasked(false);
        } else {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.diasAnterioresRutaTitulo,
            APP.core.config.Locale.config.lan.Rutas.diasAnterioresRutaMensaje);
        }
    },

    /**
    * Agrega una ruta.
    * @param btn Éste botón.
    */
    onRutasAdd: function(btn) {
        var form = this.getRutasForm(),
            values = form.getValues(),
            view = this.getMenuNav(),
            esActualizacion = values.CodigoRuta > 0,
            status = this.getRutasCalendario().accion == 0 ? this.getRutasCalendario().accion : 2,
            nd = this.getRutasCalendarioMapa().config.nd;
//console.log(nd);
        if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin, esActualizacion)){

            if(values.Descripcion == ""){
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                APP.core.config.Locale.config.lan.Rutas.tituloObligatorio, Ext.emptyFn);
            }
            else{

                if(values.LatitudOrigen > 0){
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: APP.core.config.Locale.config.lan.Rutas.guardando});

                    if(esActualizacion){
                        var url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/ActualizarRuta";
                    }
                    else{
                        var url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/AgregarRuta"
                    }

            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Ruta.CodigoRuta" : values.CodigoRuta,
                "Ruta.CodigoCliente" : values.CodigoCliente,
                "Ruta.CodigoDireccion" : values.CodigoDireccion,
                "Ruta.TipoDireccion" : values.TipoDireccion,
                "Ruta.FechaInicio" : Ext.util.Format.date(values.FechaInicio,"Y-m-d"),
                "Ruta.HoraInicio" : Ext.util.Format.date(values.HoraInicio,"H:i:s"),
                "Ruta.FechaFin" : Ext.util.Format.date(values.FechaFin,"Y-m-d"),
                "Ruta.HoraFin" : Ext.util.Format.date(values.HoraFin,"H:i:s"),
                "Ruta.Descripcion" : values.Descripcion,
                "Ruta.Notas" : values.Notas,
                "Ruta.Repetir" : values.Repetir?true:false,
                "Ruta.Lunes" : values.Lunes?true:false,
                "Ruta.Martes" : values.Martes?true:false,
                "Ruta.Miercoles" : values.Miercoles?true:false,
                "Ruta.Jueves" : values.Jueves?true:false,
                "Ruta.Viernes" : values.Viernes?true:false,
                "Ruta.Sabado" : values.Sabado?true:false,
                "Ruta.Domingo" : values.Domingo?true:false,
                "Ruta.Notas"   : values.Notas,
                "Ruta.LatitudOrigen": values.LatitudOrigen,
                "Ruta.LongitudOrigen": values.LongitudOrigen,
                "Ruta.Estatus" : status,
                "Ruta.HoraVisita": "00:00:00",
                "Ruta.FechaVisita": Ext.util.Format.date(values.FechaFin,"Y-m-d")
            }
        
        //console.log(params);

                    Ext.data.JsonP.request({
                        url: url,
                        params: params,

                        callbackKey: 'callback',
                        success: function (response) {
                            var procesada = response.Procesada

                            if (procesada) {
                                var rc = this.getRutasCalendario(),
                                    store = rc.view.eventStore;

                                store.load({
                                    callback:function(){
                                        rc.element.redraw();
                                        this.onRutasCalendarioFormPop(rc.view, nd, values.CodigoCliente, esActualizacion);
                                    },
                                    scope:this
                                });
                            }
                            else {
                                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                                response.Descripcion, Ext.emptyFn); 
                                Ext.Viewport.setMasked(false);                                
                            }

                        },
                        failure: function () {
                            Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                            APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {
                                Ext.Viewport.setMasked(false);
                            });
                            Ext.Viewport.setMasked(false);                            
                        },
                        scope: this                        
                    });
                }
                else{
                    Ext.Viewport.setMasked(false);                    
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.direccionInvalidaTitulo,
                    APP.core.config.Locale.config.lan.Rutas.direccionInvalidaMensaje, Ext.emptyFn);
                }
            }
        }
        else{
            Ext.Viewport.setMasked(false);            
        }
    },

    /**
    * Filtra las rutas del día seleccionado.
    * @param calendar Éste calendar.
    * @param nd El día elegido.
    * @param codigoCliente El código de cliente al que se la agregó la ruta.
    * @param es Actualización Booleano que indica si es una actualización o no.
    */
    onRutasCalendarioFormPop:function(calendar, nd, codigoCliente, esActualizacion){
        nd.setHours(0, 0);
        //console.log(nd);
        var me = this,
            nd = new Date(nd),
            titulo = this.getMenuNav().down('toolbar');            

        calendar.eventStore.clearFilter();
        //console.log(calendar.eventStore.getCount(), "Antes de filtrar");
        calendar.eventStore.filterBy(function(record){

            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            //console.log(startDate, endDate, nd);
            return (startDate <= nd) && (endDate >= nd);
        }, this);

        if(!esActualizacion){          
             calendar.eventStore.filter('CodigoCliente', codigoCliente);
            me.getMenuNav().pop(2);
        } else {
            if(me.getMenuNav().getActiveItem().isXType('rutasform')){                
                me.getMenuNav().pop(1);
            }
        }

        me.getMenuNav().remove(titulo, false); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
        me.ponOpcionesDeRuta(true, false);
        me.quitaMarcadores();
        me.colocaMarcadores();
        Ext.Viewport.setMasked(false);        
    },

    /**
    * Edita una ruta.
    * @param ruta La ruta a editar.
    * @param direcciones Las direcciones asociadas a esa ruta.    
    */
    onRutasEdit:function(ruta, direcciones){
        var me = this, form,        
            view = me.getMenuNav();        

        view.push({
            xtype: 'rutasform'
        });

        form = me.getRutasForm();

        form.down("button[action=guardar]").setText('Actualizar');
        form.down("button[action=guardar]").setMargin(10);

        //console.log(ruta);

        var horaInicio = new Date();
        horaInicio.setHours(ruta.HoraInicio.substr(0,2));
        horaInicio.setMinutes(ruta.HoraInicio.substr(3,2));
        horaInicio.setMilliseconds(ruta.HoraInicio.substr(6,2));

        var horaFin = new Date();
        horaFin.setHours(ruta.HoraFin.substr(0,2));
        horaFin.setMinutes(ruta.HoraFin.substr(3,2));
        horaFin.setMilliseconds(ruta.HoraFin.substr(6,2));

        form.setValues({
            CodigoRuta:ruta.CodigoRuta,
            CodigoCliente : ruta.CodigoCliente,
            CodigoDireccion : ruta.CodigoDireccion,
            TipoDireccion : ruta.TipoDireccion,
            Descripcion:ruta.title,
            FechaInicio:ruta.start,
            HoraInicio: horaInicio,
            FechaFin:ruta.end,
            HoraFin: horaFin,
            Notas:ruta.Notas,
            Repetir:ruta.Repetir,
            Lunes:ruta.Lunes,
            Martes:ruta.Martes,
            Miercoles:ruta.Miercoles,
            Jueves:ruta.Jueves,
            Viernes:ruta.Viernes,
            Sabado:ruta.Sabado,
            Domingo:ruta.Domingo,
            LatitudOrigen: ruta.lat,
            LongitudOrigen: ruta.lon
        });

        this.getRutasCalendarioDirecciones().getStore().setData(direcciones);

        var extMapa = this.getMenuNav().getActiveItem().down('rutascalendariomapa'),
            mapa = extMapa.getMap();

        this.recuperaMarcador(extMapa, ruta, true);        

        if(ruta.Estatus != 2){
            form.down("datepickerfield[name=FechaInicio]").setReadOnly(true);
            form.down("timepickerfield[name=HoraInicio]").setReadOnly(true);
            form.down("datepickerfield[name=FechaFin]").setReadOnly(true);
            form.down("timepickerfield[name=HoraFin]").setReadOnly(true);
        }        

        Ext.Viewport.setMasked(false);
    },

    /**
    * Valida si la visita puede marcarse como realizada.
    * @lparam lat La latitud del destino.
    * @param lon La longitud del destino.    
    */
    validaVisita: function(lat, lon){        
        var me = this;

        Ext.Viewport.setMasked(true);

        Ext.device.Geolocation.getCurrentPosition({
            success: function(position) {
                var latitude = position.coords.latitude,
                    longitude = position.coords.longitude,
                    origen = new google.maps.LatLng(latitude, longitude),
                    destino = new google.maps.LatLng(lat, lon),
                    service = new google.maps.DistanceMatrixService();
                        
                    service.getDistanceMatrix(
                      {
                        origins: [origen],
                        destinations: [destino],
                        travelMode: google.maps.TravelMode.DRIVING,
                        avoidHighways: false,
                        avoidTolls: false
                      }, me.dameDistancia.bind(me));
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.errorLocalizacionTitulo,
                APP.core.config.Locale.config.lan.Rutas.errorLocalizacionMensaje);
            }
        });
/*            geo = Ext.create('Ext.util.Geolocation',{
                autoUpdate: false,
                listeners: {
                    locationupdate: function (geo) {
                        var latitude = geo.getLatitude(),
                            longitude = geo.getLongitude(),
                            origen = new google.maps.LatLng(latitude, longitude),
                            destino = new google.maps.LatLng(lat, lon),
                            service = new google.maps.DistanceMatrixService();
                        
                        service.getDistanceMatrix(
                          {
                            origins: [origen],
                            destinations: [destino],
                            travelMode: google.maps.TravelMode.DRIVING,
                            avoidHighways: false,
                            avoidTolls: false
                          }, me.dameDistancia.bind(me));
                    },

                    locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        //Ext.Msg.alert('Error', 'Error mientras se obtenía la localización');
                        console.log('Error de localizacion');                    
                    }
                }
            });
        geo.updateLocation();*/
    },

    /**
    * Función auxiliar para validar la distancia entre el punto actual y la dirección destino.
    */
    dameDistancia: function(response, status){
        //console.log(this);
        var me = this,
        ruta = me.getMenuNav().ruta;            

        if (status == google.maps.DistanceMatrixStatus.OK){
            var distancia = response.rows[0].elements[0].distance.value;            
            if (distancia <= 5000){
                Ext.Viewport.setMasked(false);
                me.getRutasCalendario().trayecto.setMap(null); // Borramos la trayectoria del mapa
                me.getRutasCalendario().accion = ruta.Estatus == 0 ? 3 : 1;
                me.cambiaStatusRuta();
            } else {                
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.errorDistanciaTitulo,
                APP.core.config.Locale.config.lan.Rutas.errorDistanciaMensaje);
            }

        } else {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Error', 'No fue posible calcular la distancia: ' + status);            
        }
    },

    /**
    * Muestra un mensaje para elegir si editar o trazar una ruta.
    * @param titulo El título del mensaje
    * @param mensaje El cuerpo del mensaje.
    * @param ancho El ancho de la ventana.
    * @param funcion La función a ejecutar dependiendo la opción elegida.    
    */
    eligeEditarTrazar: function (titulo, mensaje, ancho, funcion) {
        Ext.Msg.show({
            title: titulo,
            message: mensaje,
            width: ancho,
            buttons: [
                {
                    itemId: 'editar',
                    text: APP.core.config.Locale.config.lan.Rutas.editarRuta
                },
                {
                    itemId: 'trazar',
                    text: APP.core.config.Locale.config.lan.Rutas.trazarRuta,
                    ui: 'action'
                }
            ],
            fn: funcion
        });
    },

    /**
    * Obtiene las direcciones del cliente asociado a la ruta que le pasan.
    * @param ruta La ruta a evaluar.    
    */
    dameDirecciones: function(ruta){
        Ext.Viewport.setMasked(true);
        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerSocioiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: ruta.CodigoCliente
            },
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    var direcciones = response.Data[0].Direcciones;
                    if (direcciones.length > 0){
                        var name = response.Data[0].NombreSocio,
                            idCliente = ruta.CodigoCliente,
                            titulo = name,

                        barraTitulo = ({
                            xtype: 'toolbar',
                            docked: 'top',
                            title: titulo
                        });

                        //console.log(direcciones);
                        this.onRutasEdit(ruta, direcciones);

                    }
                    else{                    
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.sinDireccionTitulo,
                        APP.core.config.Locale.config.lan.Rutas.sinDireccionMensaje, Ext.emptyFn);
                        Ext.Viewport.setMasked(false);
                    }
                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos,
                    response.Descripcion, Ext.emptyFn);
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        });
    },

    /**
    * Intenta trazar la ruta desde el punto actual a la dirección destino.
    * @param ruta La ruta a trazar.
    */
    trazaRuta: function(ruta){
        var me = this,
            view = me.getMenuNav(),
            nd = view.getActiveItem().down('rutascalendariomapa').config.nd,
            extMapa = this.getMenuNav().getActiveItem().down('rutascalendariomapa'),
            map = extMapa.getMap();

            Ext.Viewport.setMasked(true);

            me.getMenuNav().ruta = ruta;

        Ext.device.Geolocation.getCurrentPosition({
            success: function(position) {
                me.ponOpcionesDeRuta(false, true);
                var latitude = position.coords.latitude,
                    longitude = position.coords.longitude;

                //console.log(latitude, longitude);

                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();

                directionsDisplay.setMap(map);

                var origin = new google.maps.LatLng(latitude, longitude);
                var destination = new google.maps.LatLng(ruta.lat, ruta.lon);

                var request = {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(result);
                    }
                });

                me.getRutasCalendario().trayecto = directionsDisplay;

                Ext.Viewport.setMasked(false);
            },
            failure: function() {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.errorLocalizacionTitulo,
                APP.core.config.Locale.config.lan.Rutas.errorLocalizacionMensaje);
                Ext.Viewport.setMasked(false);
            }
        });

/*        var geo = Ext.create('Ext.util.Geolocation',{
            autoUpdate: false,
            listeners: {
                locationupdate: function (geo) {
                    var latitude = geo.getLatitude(),
                    longitude = geo.getLongitude();

                    console.log(latitude, longitude);

                    var directionsService = new google.maps.DirectionsService();
                    var directionsDisplay = new google.maps.DirectionsRenderer();

                    directionsDisplay.setMap(map);

                    var origin = new google.maps.LatLng(latitude, longitude);
                    var destination = new google.maps.LatLng(ruta.lat, ruta.lon);

                    var request = {
                        origin: origin,
                        destination: destination,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setMap(map);
                            directionsDisplay.setDirections(result);
                        }
                    });

                    me.getRutasCalendario().trayecto = directionsDisplay;

                    Ext.Viewport.setMasked(false);
                },
                locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                    Ext.Msg.alert('Error', 'Error mientras se obtenía la localización');
                    Ext.Viewport.setMasked(false);
                }
            }
        });

        geo.updateLocation();*/

    },

    /**
    * Recupera el marcador y lo muestra en el mapa.
    * @param extMapa El mapa.
    * @param ruta La ruta a evaluar para obtener el marcador.
    * @param draggaable Booleano que indica si el marcador es arrastrable o no.
    */
    recuperaMarcador: function(extMapa, ruta, draggable){
        var me = this,
            map = extMapa.getMap(),
            icono = me.defineColorDeMarcador(ruta);

        extMapa.marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(ruta.lat, ruta.lon),
            icon: icono,
            draggable: draggable
        });

        if(draggable){
            google.maps.event.addListener(extMapa.marker,"dragend",function(){
                var point = extMapa.marker.getPosition();
                map.panTo(point);

                me.getMenuNav().getActiveItem().setValues({
                    LatitudOrigen: extMapa.marker.getPosition().k,
                    LongitudOrigen: extMapa.marker.getPosition().B
                })
            });
        }
    },

    /**
    * Define el color del marcador en función del estatus de la ruta que le pasan.
    * @param ruta La ruta a evaluar.
    */
    defineColorDeMarcador: function(ruta){
        switch(ruta.Estatus){
            case 0:
                icono = "http://www.googlemapsmarkers.com/v1/F90000/";
                break;

            case 1:
                icono = "http://www.googlemapsmarkers.com/v1/1D7A28/";
                break;
            case 2:
                icono = "http://www.googlemapsmarkers.com/v1/FFFF00/";
                break;

            case 3:
                icono = "http://www.googlemapsmarkers.com/v1/FF8000/";
                break;

            case 4:
                icono = "http://www.googlemapsmarkers.com/v1/C0C0C0/";
                break;
        }

        return icono;
    },

    /**
    * Determina que acción realizar en función del id del botón que le pasan.
    * @param button El botón a evaluar.
    */
    determinaAccion: function(button){
        var me = this,
            ruta = me.getMenuNav().ruta;

        switch(button.getItemId()){
             case 'realizarRuta':
                me.validaVisita(ruta.lat, ruta.lon, ruta);                    
                break;

            case 'cancelarRuta':
                me.getRutasCalendario().accion = 4
                me.getRutasCalendario().trayecto.setMap(null); 
                me.cambiaStatusRuta();
                break;
        }
    },

    /**
    * Cambia el estatus de la ruta.
    */
    cambiaStatusRuta: function(){
        var me = this,
            ruta = me.getMenuNav().ruta,
            view = me.getMenuNav(),
            nd = this.getRutasCalendarioMapa().config.nd,            
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Rutas/ActualizarRuta",
            fechaVisita = new Date(),
            horaInicio = new Date(),
            horaFin = new Date();
        
        horaInicio.setHours(ruta.HoraInicio.substr(0,2));
        horaInicio.setMinutes(ruta.HoraInicio.substr(3,2));
        horaInicio.setMilliseconds(ruta.HoraInicio.substr(6,2));

        horaFin.setHours(ruta.HoraFin.substr(0,2));
        horaFin.setMinutes(ruta.HoraFin.substr(3,2));
        horaFin.setMilliseconds(ruta.HoraFin.substr(6,2)); 

        Ext.Viewport.setMasked(true);

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
            "Ruta.Descripcion" : ruta.title,
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
            "Ruta.LatitudOrigen": ruta.lat,
            "Ruta.LongitudOrigen": ruta.lon,
            "Ruta.Estatus" : me.getRutasCalendario().accion,// != undefined ? me.getRutasCalendario().accion : 2
            "Ruta.HoraVisita": Ext.util.Format.date(fechaVisita,"H:i:s"),
            "Ruta.FechaVisita": Ext.util.Format.date(fechaVisita,"Y-m-d")
        }

        //console.log(params);

        Ext.data.JsonP.request({
            url: url,
            params: params,

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada

                if (procesada) {
                    var rc = me.getRutasCalendario(),
                        store = rc.view.eventStore;

                    store.load({
                        callback:function(){
                            rc.element.redraw();
                            me.onRutasCalendarioFormPop(rc.view, nd, ruta.CodigoCliente, true);
                        }
                    });
                }
                else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.datosIncorrectos, response.Descripcion, Ext.emptyFn); 
                    Ext.Viewport.setMasked(false);                    
                }

            },
            failure: function () {
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Rutas.problemasConexion,
                APP.core.config.Locale.config.lan.Rutas.sinServidor, function () {
                    Ext.Viewport.setMasked(false);
                });
                Ext.Viewport.setMasked(false);                
            }
        });
    },

    /**
    * Elimina los marcadores del mapa.
    */
    quitaMarcadores: function () {
        var me = this,
            marcadores = me.getRutasCalendario().marcadores;

        if (marcadores != undefined){
            for (i = 0; i < marcadores.length; i++) {
                marcadores[i].setMap(null);
            }
        }
    },

    /**
    * Obtiene un formato de fecha dd mm yyyy.
    * @param date La fecha que le pasan.
    */
    dameFecha: function(date){
        var me = this,
            dia = date.getDay(),
            mes = date.getMonth(),
            anio = date.getFullYear(),
            fecha = "" + dia + " "+ mes + " " + anio;

        return fecha;
    }
    
});