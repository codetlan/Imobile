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


            partidaContainer:'partidacontainer',
            opcionesOrden:'opcionesorden',
            ordenContainer:'ordencontainer',
            rutasCalendario:'rutascalendario',
            rutasCalendarioCont:'rutascalendariocont',
            rutasCalendarioDia:'rutascalendariodia',
            rutasMapa:'rutasmapa'


        },
        control:{
            'opcionrutasactividades': {
                itemtap:'onRutasActividadesTap'
            },

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
            }


            /*'container[id=rutascont] clienteslist': {
             itemtap:'onSeleccionarCliente'
             },

             'opcionrutaslist': {
             itemtap:'onCalendario'
             },
             'rutascalendario':{
             selectionchange:'onCalendarioDia'
             },
             'rutascalendariocont button[action=agregar]':{
             tap:'showForm'
             }*/
        }
    },

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
                break;
        }
    },

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
                    console.log(form);
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
    }
    /*onSeleccionarCliente:function(list, index, target, record) {
     var name = record.get('NombreSocio'),
     idCliente = record.get('CodigoSocio'),
     titulo = name,
     barraTitulo = ({
     xtype: 'toolbar',
     docked: 'top',
     title: titulo
     });

     this.getMenuNav().push({
     xtype: 'opcionrutaslist',
     title: idCliente,
     idCliente: idCliente
     });
     this.getMenuNav().add(barraTitulo);

     },

     onCalendario:function(list, index, target, record){
     var opcion = record.get('action');

     switch(opcion){
     case 'calendario':
     this.getMenuNav().push({
     xtype:'rutascalendario'
     });
     break;
     case 'registrar':
     break;
     }

     },

     onCalendarioDia:function(calendar, nd, od){

     calendar.eventStore.clearFilter();
     calendar.eventStore.filterBy(function(record){
     var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
     return (startDate <= nd) && (endDate >= nd);
     }, this);


     this.getMenuNav().push({
     xtype:'rutascalendariocont',
     nd:nd
     });

     this.getRutasCalendarioDia().getStore().setData(calendar.eventStore.getRange());
     console.log(this.getRutasCalendarioDia().getStore());
     },

     showForm:function(b){

     this.getMenuNav().push({
     xtype:'rutasform',
     flex:1,
     nd:this.getRutasCalendarioCont().nd
     })
     }}*/


});