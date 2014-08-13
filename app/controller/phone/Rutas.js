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
            partidaContainer:'partidacontainer',
            opcionesOrden:'opcionesorden',
            ordenContainer:'ordencontainer',
            rutasCalendario:'rutascalendario',
            rutasCalendarioCont:'rutascalendariocont',
            rutasCalendarioDia:'rutascalendariodia',
            rutasMapa:'rutasmapa',


            actividadesCalendario:'actividadescalendario'
        },
        control:{
            'opcionrutasactividades': {
                itemtap:'onRutasActividadesTap'
            },
            'actividadescalendario':{
                periodchange:function(calendar,mindate,maxdate,direction){
                    console.log(calendar);
                    console.log(mindate);
                    console.log(maxdate);
                    console.log(direction);
                }
            },


            'container[id=rutascont] clienteslist': {
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
            }
        }
    },

    onRutasActividadesTap:function(list, index, target, record){
        var opcion = record.get('action');

        switch(opcion){
            case 'actividades':
                this.getMenuNav().push({
                    xtype:'actividadescalendario'
                });

                var ac = this.getActividadesCalendario(),
                    store = ac.view.eventStore;

                var date = new Date();

                var firstDay = Ext.util.Format.date(Ext.Date.getFirstDateOfMonth(date),"Y-m-d");
                var lastDay = Ext.util.Format.date(Ext.Date.getLastDateOfMonth(date),"Y-m-d");

                var params = {
                    CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                    CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                    CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                    Token: localStorage.getItem("Token"),
                    Usuario: localStorage.getItem("CodigoUsuario"),
                    FechaInicio: firstDay,
                    FechaFin: lastDay
                };

                //Ext.Viewport.setMasked({xtype:'loadmask',message:'Cargando...'});

                store.clearFilter();
                store.setParams(params);
                /*store.load({
                    callback:function(){
                        //Ext.Viewport.setMasked(false);
                    },
                    scope:this
                });*/
                break;
            case 'rutas':
                break;
        }
    },

    /**
     * Establece el título y el id del cliente cada uno en una variable.
     * Muestra la vista de ventas.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    onSeleccionarCliente:function(list, index, target, record) {
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
    }


});