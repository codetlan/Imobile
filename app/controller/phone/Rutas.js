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
                ac.element.redraw();
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
            nd:nd
        });

        this.getActividadesCalendarioDia().getStore().setData(calendar.eventStore.getRange());
    },

    onActividadesCalendarioFormPop:function(calendar, nd){
        calendar.eventStore.clearFilter();
        calendar.eventStore.filterBy(function(record){
            var startDate = Ext.Date.clearTime(record.get('start'), true).getTime(), endDate = Ext.Date.clearTime(record.get('end'), true).getTime();
            return (startDate <= nd) && (endDate >= nd);
        }, this);


        this.getMenuNav().pop();

        this.getActividadesCalendarioDia().getStore().setData(calendar.eventStore.getRange());

    },

    showFormActividades:function(b){
        this.getMenuNav().push({
            xtype:'actividadesform',
            flex:1,
            nd:this.getActividadesCalendarioCont().nd
        })
    },

    onActividadesAdd:function(btn){

        var form = this.getActividadesForm(),
            values = form.getValues();


        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Guardando...'});

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Actividades/AgregarActividad",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
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
                            this.onActividadesCalendarioFormPop(ac.view,this.getActividadesCalendarioCont().nd);
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