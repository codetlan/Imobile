/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Rutas', {
    extend: 'Ext.app.Controller',
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
                itemtap:'onSeleccionarCliente'
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
            'rutascalendariodia':{
                itemtap:'onRutasEdit'
            },
              'container[xtype=rutascalendariocont] button': {
                tap:'cambiaStatusRuta'
            }/*,
              'container[xtype=rutascalendariocont] button[action = cancelarRuta]': {
                tap:'prueba'
            },*/

        }
    },

    //#######################################################################
    // Primera vista para seleccionar actividades o rutas
    //#######################################################################

    onRutasActividadesTap:function(list, index, target, record){
        var opcion = record.get('action');

        switch(opcion){
            case 'actividades':
                this.getMenuNav().push({
                    xtype:'actividadescalendario'
                });

                var date = new Date();

                var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                this.loadActividadesCalendario(firstDay,lastDay);

                break;
            case 'rutas':
                this.getMenuNav().push({
                    // xtype:'rutascalendariocont',
                    // layout:'fit',
                    // items:[{
                    //     xtype:'clienteslist'
                    // }]
                    xtype: 'rutascalendario',
                    title: 'Rutas'
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

        Ext.Viewport.setMasked({xtype:'loadmask',message:'Cargando...'});

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
                text: 'Agregar',
                margin:10
            }]
        });

        this.getActividadesCalendarioDia().getStore().setData(calendar.eventStore.getRange());
    },

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

    showFormActividades:function(b){
        var nd = this.getActividadesCalendarioContNd().getValue();

        this.getMenuNav().push({
            xtype:'actividadesform',
            flex:1,
            listeners:{
                scope:this,
                activate:function(form){
                    form.setValues({
                        FechaInicio:new Date(nd),
                        FechaFin:new Date(nd)
                    });
                }
            }
        })
    },

    onActividadesAdd:function(btn){

        var form = this.getActividadesForm(),
            values = form.getValues();

        if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin)){

            if(values.Descripcion == ""){
                Ext.Msg.alert('Datos Incorrectos', "El título es obligatorio", Ext.emptyFn);
            }
            else{

                Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Guardando...'});

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
                            Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                            Ext.Viewport.setMasked(false);
                        }

                    },
                    failure: function () {
                        Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor', function () {
                            Ext.Viewport.setMasked(false);
                        });
                        Ext.Viewport.setMasked(false);
                    },
                    scope: this
                });
            }
        }
        else{
            Ext.Msg.alert('Datos Incorrectos', "Las fechas son inválidas", Ext.emptyFn);
        }
    },

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
                    text:'Realizada',
                    action:'realizaractividad',
                    flex:1
                },{
                    xtype:'button',
                    text:'Cancelar',
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

    onActividadesUpdate:function(status){

        var form = this.getActividadesForm(),
            values = form.getValues();

        if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin)){

            if(values.Descripcion == ""){
                Ext.Msg.alert('Datos Incorrectos', "El título es obligatorio", Ext.emptyFn);
            }
            else{

                Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Guardando...'});

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
                            Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                            Ext.Viewport.setMasked(false);
                        }

                    },
                    failure: function () {
                        Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor', function () {
                            Ext.Viewport.setMasked(false);
                        });
                        Ext.Viewport.setMasked(false);
                    },
                    scope: this
                });
            }
        }
        else{
            Ext.Msg.alert('Datos Incorrectos', "Las fechas son inválidas", Ext.emptyFn);
        }
    },

    validarFechas:function(fechaInicio,horaInicio,fechaFin,horaFin){

        if(fechaInicio.getTime() > fechaFin.getTime()){
            return false;
        }
        if(fechaInicio.getTime() == fechaFin.getTime()){
            if(horaInicio.getTime() >= horaFin.getTime()){
                return false;
            }
        }
        return true;
    },

    //#######################################################################
    // Rutas
    //#######################################################################

    onSeleccionarCliente:function(list, index, target, record){
        var me = this,
            name = record.get('NombreSocio'),
            idCliente = record.get('CodigoSocio'),
            titulo = name;

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
                        // var name = record.get('NombreSocio'),
                        //     idCliente = record.get('CodigoSocio'),
                        //     titulo = name,

                        barraTitulo = ({
                            xtype: 'toolbar',
                            docked: 'top',
                            title: titulo
                        });
console.log(direcciones);
                        // this.getMenuNav().push({
                        //     xtype: 'rutascalendario',
                        //     title: idCliente,
                        //     idCliente: idCliente,
                        //     direcciones: direcciones
                        // });

                        this.showFormRutas(idCliente, direcciones);

                        this.getMenuNav().add(barraTitulo);

                        // var date = new Date();

                        // var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                        // var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                        // //this.loadRutasCalendario(firstDay,lastDay);
                    }
                    else{
                        Ext.Msg.alert('Lo sentimos', 'El cliente no tiene ninguna dirección asignada', Ext.emptyFn);
                    }
                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                }
            },
            scope: this
        });
    },

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

        Ext.Viewport.setMasked({xtype:'loadmask',message:'Cargando...'});

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

    onRutasCalendarioTap2:function(calendar, nd){
        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);


        this.getMenuNav().push({
            xtype:'container',
            id:'rutascalendarioshowform',
            layout:{
                type:'vbox',
                align:'stretch'
            },
            items:[{
                xtype:'container',
                html:"<div style='text-align:center; padding:3px; color:#1F83FB;'>" + Ext.util.Format.date(nd,"l d/m/y") + "</div>"
            },{
                xtype:'rutascalendariodia',
                flex:1,
                nd:nd,
                idCliente: rc.idCliente,
                direcciones:rc.direcciones
            },{
                xtype:'button',
                action:'agregar',
                text: 'Agregar',
                margin:10
            }]
        });

        this.getRutasCalendarioDia().getStore().setData(calendar.eventStore.getRange());
    },

    onRutasCalendarioTap:function(calendar, nd){
        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);

        // var rc = this.getRutasCalendario(),
        //     rutas = rc.view.eventStore;


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
                xtype: 'rutascalendariomapa',//rutas.getCount() > 0 ? 'rutascalendariomapa' : 'rutascalendariodia',
                flex:1,
                nd:nd
                // idCliente: rc.idCliente,
                // direcciones:rc.direcciones
            },{
                xtype:'button',
                action:'agregar',
                text: 'Agregar',
                margin:10
            }]
        });

        this.colocaMarcadores();

        //this.getRutasCalendarioDia().getStore().setData(calendar.eventStore.getRange());
    },

    showFormRutas:function(idCliente, direcciones){        
        var rc = this.getRutasCalendario(),
            rutas = rc.view.eventStore,
            nd = this.getRutasCalendarioMapa().config.nd;
        // var idCliente = this.getRutasCalendarioDia().config.idCliente;
        // var direcciones = this.getRutasCalendarioDia().config.direcciones;

console.log(nd);

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
                        //direcciones: direcciones
                    });

                    this.getRutasCalendarioDirecciones().getStore().setData(direcciones);
                    //this.getRutasCalendarioDirecciones().element.redraw();
                }
            }
        })
    },

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

        Ext.Viewport.setMasked({xtype:'loadmask',message:'Cargando...'});

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
            console.log('Se elimina marcador');
        }

        geocoder.geocode( { 'address': direccion}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                console.log(results[0].geometry.location);

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

                //extMapa.setMapOptions({zoom:15});

                google.maps.event.addListener(extMapa.marker,"dragend",function(){
                    var point = extMapa.marker.getPosition();
                    mapa.panTo(point);

                    form.setValues({
                        LatitudOrigen:point.k,
                        LongitudOrigen:point.B
                    });
                });

            } else {
                Ext.Msg.alert("Lo sentimos","La ubicación no ha podido ser encontrada");
            }
            Ext.Viewport.setMasked(false);
        });
    },

    colocaMarcadores:function(){
        var me = this,
            ac = me.getRutasCalendario(),            
            rutas = ac.view.eventStore;
            marcadoresArray = new Array();
console.log(rutas.getCount(), ' en colocaMarcadores')
        if(rutas.getCount() > 0){
            var extMapa = this.getRutasCalendarioMapa(),
                mapa = extMapa.getMap(),
                ruta, icono,
                bounds = new google.maps.LatLngBounds();

            Ext.Viewport.setMasked({xtype:'loadmask',message:'Cargando...'});

            if(extMapa.marker){
                extMapa.marker.setMap(null);
                console.log('Quitamos marcador');
            }
        
            rutas.each(function (item, index, length) {
                //console.log(item.get('firstName'), index);
                ruta = item.getData();  //rutas.getAt(0).getData();                

                var nd = extMapa.config.nd,
                    today = new Date(),
                    horaInicio = ruta.HoraInicio.split(":", 2);
                console.log(nd);
                    nd.setHours(parseInt(horaInicio[0]), parseInt(horaInicio[1]));

                if(nd < today){
                    if(ruta.Estatus == 2){
                        ruta.Estatus = 0;
                    }                    
                }

                me.recuperaMarcador(extMapa, ruta);

                marcadoresArray.push(extMapa.marker);

                // extMapa.marker = new google.maps.Marker({
                //     map: mapa,
                //     position: new google.maps.LatLng(ruta.lat, ruta.lon),
                //     icon: icono,
                //     draggable:true
                // });

                // google.maps.event.addListener(extMapa.marker,"dragend",function(){
                //     var point = extMapa.marker.getPosition();
                //     mapa.panTo(point);
                // });

                //var marcador = item.getData()

                if(ruta.Estatus == 0 || ruta.Estatus == 2){
                    google.maps.event.addListener(extMapa.marker, 'click', function(){
                        //infowindow.open(mapa, extMapa.marker);
                        //popup.showBy(extMapa.marker);
                        me.eligeEditarTrazar('Elija una opción', '¿Qué desea hacer?', 300, 
                        function (buttonId) {
                            if (buttonId == 'editar') {                                
                                me.dameDirecciones(item.data);
                            } else {
                                me.trazaRuta(item.data);
                            }
                        });
                    });                
                }

                bounds.extend(extMapa.marker.position);            

                //mapa.setCenter(bounds.getCenter());

                //extMapa.setMapOptions({zoom:15});
                mapa.fitBounds(bounds);

            });

            me.getRutasCalendario().marcadores = marcadoresArray;

            // for(var i = 0; i < marcadoresArray.length; i++){
            //     google.maps.event.addListener(marcadoresArray[i], 'click', function(){
            //         //infowindow.open(mapa, extMapa.marker);
            //         //popup.showBy(extMapa.marker);
            //         me.eligeEditarTrazar('Elija una opción', '¿Qué desea hacer?', 300, 
            //         function (buttonId) {
            //             if (buttonId == 'editar') {
            //                 //rutas.find()
            //                 console.log(rutas.getAt(i));
            //                 //me.dameDirecciones(rutasArray[]);
            //             } else {
            //                 me.trazaRuta(ruta);
            //             }
            //         });
            //     });
            // }

        }

        Ext.Viewport.setMasked(false);
    },

    muestraClientes: function(button) {
        var me = this,
            nd = button.getParent().down('rutascalendariomapa').nd,
            today = new Date();

        nd = Ext.Date.add(nd, Ext.Date.DAY, 1);

console.log(nd, today);
        if(today <= nd){
            me.getMenuNav().push({
                xtype:'rutascalendariocont',
                layout:'fit',
                items:[{
                    xtype:'clienteslist'
                }]
            });
        } else {
            Ext.Msg.alert('Error', 'Imposible agregar rutas en días anteriores');
        }
    },

    onRutasAdd:function(btn){

        var form = this.getRutasForm(),            
            values = form.getValues(),
            view = this.getMenuNav(),
            nd = this.getRutasCalendarioMapa().config.nd;
console.log(nd);
        if(this.validarFechas(values.FechaInicio,values.HoraInicio,values.FechaFin,values.HoraFin)){

            if(values.Descripcion == ""){
                Ext.Msg.alert('Datos Incorrectos', "El título es obligatorio", Ext.emptyFn);
            }
            else{

                if(values.LatitudOrigen > 0){
                    Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Guardando...'});

                    if(values.CodigoRuta > 0){
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
                "Ruta.Estatus" : form.accion != undefined ? form.accion : 2
            }

        Ext.Viewport.setMasked(true);
        console.log(params);

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
                                        this.onRutasCalendarioFormPop(rc.view, nd, values.CodigoCliente, 2, values.CodigoRuta > 0);
                                    },
                                    scope:this
                                });
                            }
                            else {
                                Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn); 
                                Ext.Viewport.setMasked(false);
                                view.pop();
                            }

                        },
                        failure: function () {
                            Ext.Msg.alert('Problemas de conexión', 'No se puede encontrar el servidor', function () {
                                Ext.Viewport.setMasked(false);
                            });
                            Ext.Viewport.setMasked(false);
                            view.pop();
                        },
                        scope: this                        
                    });
                }
                else{
                    Ext.Viewport.setMasked(false);
                    view.pop();
                    Ext.Msg.alert('Datos Incorrectos', "Debe seleccionar una dirección válida", Ext.emptyFn);
                }
            }
        }
        else{
            Ext.Viewport.setMasked(false);
            view.pop();
            Ext.Msg.alert('Datos Incorrectos', "Las fechas son inválidas", Ext.emptyFn);
        }
    },

    onRutasCalendarioFormPop:function(calendar, nd, codigoCliente, pop, esActualizacion){
        nd.setHours(0, 0);        

        var nd = new Date(nd),
            titulo = this.getMenuNav().down('toolbar')

        calendar.eventStore.clearFilter();        

        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);        

        console.log(codigoCliente, ' El código del cliente');

        if(!esActualizacion){
            calendar.eventStore.filter('CodigoCliente', codigoCliente);
        }

        this.getMenuNav().pop(pop);
        this.getMenuNav().remove(titulo, false); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
        this.quitaMarcadores();
        this.colocaMarcadores();
        Ext.Viewport.setMasked(false);

        //this.getRutasCalendarioDia().getStore().setData(calendar.eventStore.getRange());

    },

    onRutasEdit2:function(list,index,target,record){
        var form = this.getRutasForm();
        var direcciones = this.getRutasCalendarioDia().config.direcciones;

        var items=[{
            xtype:'rutasform',
            flex:1//,
            //nd:this.getActividadesCalendarioCont().nd
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
                    text:'Realizada',
                    action:'realizarruta',
                    flex:1
                },{
                    xtype:'button',
                    text:'Cancelar',
                    action:'cancelarruta',
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

        var form = this.getRutasForm();

        var horaInicio = new Date();
        horaInicio.setHours(record.data.HoraInicio.substr(0,2));
        horaInicio.setMinutes(record.data.HoraInicio.substr(3,2));
        horaInicio.setMilliseconds(record.data.HoraInicio.substr(6,2));

        var horaFin = new Date();
        horaFin.setHours(record.data.HoraFin.substr(0,2));
        horaFin.setMinutes(record.data.HoraFin.substr(3,2));
        horaFin.setMilliseconds(record.data.HoraFin.substr(6,2));

        form.setValues({
            CodigoRuta:record.data.CodigoRuta,
            CodigoCliente : record.data.CodigoCliente,
            CodigoDireccion : record.data.CodigoDireccion,
            TipoDireccion : record.data.TipoDireccion,
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

        this.getRutasCalendarioDirecciones().getStore().setData(direcciones);

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

    onRutasEdit:function(ruta, direcciones, accion){
        var form = this.getRutasForm();
        //var direcciones = this.getRutasCalendarioDia().config.direcciones;

        var items=[{
            xtype:'rutasform',
            flex:1//,
            //nd:this.getActividadesCalendarioCont().nd
        }];

        console.log(ruta);

        if(ruta.Estatus != 1 && ruta.Estatus != 3){            

            items.push({
                xtype:'container',
                padding:'0 10px 10px 10px',
                layout:{
                    type:'hbox',
                    align: 'stretch'
                },
                items:[{
                    xtype:'button',
                    text:'Actualizar',
                    action:'actualizaRuta',
                    flex:1
                }]/*,{
                    xtype:'button',
                    text:'Cancelar',
                    action:'cancelarruta',
                    flex:1
                }]*/
            });
        }
        else{
            if(ruta.Estatus == 2){

            }
        }


        this.getMenuNav().push({
            xtype:'container',
            layout:{
                type:'vbox'
            },
            items:items
        })

        //this.getMenuNav().getActiveItem().down('#btnGuardar').hide();

        var form = this.getRutasForm();

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

        this.recuperaMarcador(extMapa, ruta);

        if(ruta.Estatus != 2){
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

        if(accion != undefined){
            switch(accion){
                case 'realizarRuta':                    
                    this.getRutasForm().accion = ruta.Estatus == 0 ? 3 : 1
                    break;

                case 'cancelarRuta':
                    this.getRutasForm().accion = 4
                    break;
            }

            this.onRutasAdd()
        }

        Ext.Viewport.setMasked(false);
    },

    eligeEditarTrazar: function (titulo, mensaje, ancho, funcion) {
        Ext.Msg.show({
            title: titulo,
            message: mensaje,
            width: ancho,
            buttons: [
                {
                    itemId: 'editar',
                    text: 'Editar ruta'//APP.core.config.Locale.config.lan.Ordenes.confirmaNo
                },
                {
                    itemId: 'trazar',
                    text: 'Trazar ruta',//APP.core.config.Locale.config.lan.Ordenes.confirmaSi,
                    ui: 'action'
                }
            ],
            fn: funcion
        });
    },

    dameDirecciones: function(ruta, accion){
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
console.log(direcciones);
                        // this.getMenuNav().push({
                        //     xtype: 'rutascalendario',
                        //     title: idCliente,
                        //     idCliente: idCliente,
                        //     direcciones: direcciones
                        // });

                        //this.showFormRutas(idCliente, direcciones);
                        this.onRutasEdit(ruta, direcciones, accion);                        

                        //this.getMenuNav().add(barraTitulo);

                        // var date = new Date();

                        // var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                        // var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                        // //this.loadRutasCalendario(firstDay,lastDay);
                    }
                    else{                    
                        Ext.Msg.alert('Lo sentimos', 'El cliente no tiene ninguna dirección asignada', Ext.emptyFn);
                        Ext.Viewport.setMasked(false);
                    }
                } else {
                    Ext.Msg.alert('Datos Incorrectos', response.Descripcion, Ext.emptyFn);
                    Ext.Viewport.setMasked(false);
                }
            },
            scope: this
        });
    },

    trazaRuta: function(ruta){
        var me = this,
            view = me.getMenuNav(),
            nd = view.getActiveItem().down('rutascalendariomapa').nd;

        if(ruta.Estatus != 1 && ruta.Estatus != 3 && ruta.Estatus != 4){ // Si la ruta no ha sido visitada ni visitada tardíamente, ni cancelada            

            this.getMenuNav().push({
                xtype:'rutascalendariocont',
                items:[{
                    xtype:'container',
                    html:"<div style='text-align:center; padding:3px; color:#1F83FB;'>" + Ext.util.Format.date(nd,"l d/m/y") + "</div>"
                },{
                    xtype:'hiddenfield',
                    name:'ndhf',
                    value:nd
                },{
                    xtype:'rutascalendariomapa',
                    flex:1
                },{
                    xtype:'container',
                    padding:'0 10px 10px 10px',
                    layout:{
                        type:'hbox',
                        align: 'stretch'
                    },
                    items:[{
                        xtype:'button',
                        text:'Realizada',
                        action:'realizarRuta',
                        flex:1
                    },{
                        xtype:'button',
                        text:'Cancelar Ruta',
                        action:'cancelarRuta',
                        flex:1
                    }]
                }]
            });

            me.getRutasCalendarioCont().ruta = ruta;
        }
        else {

            if(ruta.Estatus == 2){

            }
        }

        var extMapa = this.getMenuNav().getActiveItem().down('rutascalendariomapa'),
            map = extMapa.getMap();

        //me.recuperaMarcador(extMapa, ruta);

        Ext.device.Geolocation.getCurrentPosition({
            success: function(position) {
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
            },
            failure: function() {
                Ext.Msg.alert('Error', 'Error mientras se obtenía la localización');
            }
        });

        /*var geo = Ext.create('Ext.util.Geolocation',{
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
                },
                locationerror: function (geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                    Ext.Msg.alert('Error', 'Error mientras se obtenía la localización');

                }
            }
        });

        geo.updateLocation();*/
    },

    recuperaMarcador: function(extMapa, ruta){
        var me = this,
            map = extMapa.getMap(),
            icono = me.defineColorDeMarcador(ruta);

        extMapa.marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(ruta.lat, ruta.lon),
            icon: icono,
            draggable:true
        });           

        google.maps.event.addListener(extMapa.marker,"dragend",function(){
            var point = extMapa.marker.getPosition();
            map.panTo(point);
        });
    },

    defineColorDeMarcador: function(ruta){
        switch(ruta.Estatus){
            case 0:
                icono = "http://www.googlemapsmarkers.com/v1/F90000/"
                break;

            case 1:
                icono = "http://www.googlemapsmarkers.com/v1/1D7A28/"
                break;

            case 2:
                icono = "http://www.googlemapsmarkers.com/v1/FFFF00/"
                break;

            case 3:
                icono = "http://www.googlemapsmarkers.com/v1/FF8000/"
                break;

            case 4:
                icono = "http://www.googlemapsmarkers.com/v1/C0C0C0/"
                break;
        }

        return icono;
    },

    // trazaRuta: function(lat, lng, map){
    //     var me = this,
    //         latitude,
    //         longitude;

    //     Ext.device.Geolocation.getCurrentPosition({
    //         success: function(position) {
    //             latitude = position.coords.latitude;
    //             longitude = position.coords.longitude;

    //             console.log(latitude, longitude);

    //             var directionsService = new google.maps.DirectionsService();
    //             var directionsDisplay = new google.maps.DirectionsRenderer();

    //             directionsDisplay.setMap(map);

    //             var origin = new google.maps.LatLng(latitude, longitude);
    //             var destination = new google.maps.LatLng(lat, lng);

    //             var request = {
    //                 origin: origin,
    //                 destination: destination,
    //                 travelMode: google.maps.DirectionsTravelMode.DRIVING
    //             };

    //             directionsService.route(request, function (result, status) {
    //                 if (status == google.maps.DirectionsStatus.OK) {
    //                     directionsDisplay.setMap(map);
    //                     directionsDisplay.setDirections(result);
    //                 }
    //             });


    //             //me.onLoadStores('Searchs', '', me.latitude + ',' + me.longitude);
    //         },
    //         failure: function() {
    //             Ext.Msg.alert('Error', 'Error mientras se obtenía la localización');
    //             /*me.latitude = geo.getLatitude();
    //             me.longitude = geo.getLongitude();
    //             me.onLoadStores(store, '', me.latitude + ',' + me.longitude);*/
    //         }
    //     });
    // }

    cambiaStatusRuta: function(button){
        var me = this,
            view = me.getMenuNav().getActiveItem(),
            ruta = me.getRutasCalendarioCont().ruta;
        
        me.dameDirecciones(ruta, button.action);        
    },

    quitaMarcadores: function () {
        var me = this,
            marcadores = me.getRutasCalendario().marcadores

        if (marcadores != undefined){
            for (i = 0; i < marcadores.length; i++) {
                marcadores[i].setMap(null);
            }            
        }
    }
});