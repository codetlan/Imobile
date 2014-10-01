/**
 * Created by Alí on 9/1/14.
 */
Ext.define('APP.controller.phone.Informes', {
    extend: 'Ext.app.Controller',    
    config:{
    	refs:{
            menuNav: 'menunav'    		
    	},

    	control: {
    		'list':{
    			itemtap: 'muestraOpcionElegida'
    		},
            'informesform #crearInforme':{
                tap: 'generaInforme'
            },
            'informesform textfield[itemId = codigoDesde]':{
                focus: 'muestraCodigos'
            },
            'informesform textfield[itemId = codigoHasta]':{
                focus: 'muestraCodigos'
            }
    	}
    },

    muestraOpcionElegida: function (list, index, target, record){
    	var me = this
    		view = me.getMenuNav();            

        if(list.xtype == 'clienteslist' || list.xtype == 'productoslist'){
            var codigo = list.xtype == 'clienteslist'? record.data.CodigoSocio : record.data.CodigoArticulo,
                id = view.getActiveItem().getId();
            
            view.pop();

            view.getActiveItem().down('#' + id).setValue(codigo);

        } else {
            switch (record.data.action){
                case 'bitacoraVendedores':
                    if(view.getActiveItem().isXType('container')){
                        return;
                    }
                    
                    view.push({
                        html: 'Bitácora de vendedores'
                    });

                    break;

                case 'analisisVentas':

                    if(view.getActiveItem().isXType('analisisventaslist')){
                        return;
                    }

                    view.push({
                        xtype: 'analisisventaslist',
                        title: 'Análisis de Ventas'
                    });

                    me.agregaOpciones('clientes');
                    break;

                case 'analisisClientes':
                    me.auxiliarPonCodigos('Clientes');

                    break;

                case 'analisisArticulos':
                    me.auxiliarPonCodigos('Articulos');
                    break;
            }
        }
    },

    agregaOpciones: function(criterio){
        if((criterio === 'clientes' && this.getMenuNav().clientes == undefined) || 
            (criterio === 'articulos' && this.getMenuNav().articulos == undefined)){
            var me = this,
                url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Informes/obtenCodigos",
                params = {  
                    CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                    CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                    CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                    Token: localStorage.getItem("Token"),
                    Criterio: criterio
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
                                text: datos[i].codigo,
                                value: datos[i].codigo
                            };
                        }                    

                        if(criterio === 'clientes'){
                            me.getMenuNav().clientes = opciones;
                            Ext.Viewport.setMasked(false);
                            me.agregaOpciones('articulos');
                        } else {
                            me.getMenuNav().articulos = opciones;
                            Ext.Viewport.setMasked(false);
                            me.agregaOpciones('clientes');
                        }                                                                        

                    } else {
                        Ext.Msg.alert("No se pudieron obtener los códigos", "Se presentó un problema al intentar obtener los códigos: " + response.Descripcion);
                        Ext.Viewport.setMasked(false);
                    }
                }
                  });
        }
    },

    ponCodigos: function(criterio){
        var me = this,
            view = me.getMenuNav(),
            form = view.getActiveItem(),
            last = criterio == 'Clientes'? me.getMenuNav().clientes[me.getMenuNav().clientes.length-1].value : me.getMenuNav().articulos[me.getMenuNav().articulos.length-1].value;
            codigos = Object.getOwnPropertyDescriptor(me.getMenuNav(), criterio.substring(0,1).toLowerCase() + criterio.substring(1, criterio.length)).value;
                
        form.down('#codigoDesde').setValue(codigos[0].text);
        //form.down('#codigoHasta').setOptions(codigos);
        form.down('#codigoHasta').setValue(last);
    },

    generaInforme: function(button){
        var me = this,
            view = me.getMenuNav(),
            informes = Ext.getStore('Informes'),
            fechaDesde = Ext.Date.format(button.up('informesform').down('#fechaDesde').getValue(), "Y-m-d"),
            fechaHasta = Ext.Date.format(button.up('informesform').down('#fechaHasta').getValue(), "Y-m-d"),
            codigoDesde = button.up('informesform').down('#codigoDesde').getValue(),
            codigoHasta = button.up('informesform').down('#codigoHasta').getValue(),
            criterio = fechaDesde + "," + fechaHasta + "," + codigoDesde + "," + codigoHasta,
            url;

        if(view.getActiveItem().isXType('informesgeneradoslist')){
            return;
        }

        if(codigoDesde > codigoHasta){
            Ext.Msg.alert('Error', 'El código ' + codigoDesde + ' es mayor que ' + codigoHasta + '.');
            return;
        }

        view.push({            
            xtype: 'informesgeneradoslist',
            title: view.titulo
        });

        console.log(view.titulo == 'Articulos');

        if(view.titulo == 'Articulos'){
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Informes/obtenInformeArticulos";
            
            informes.getProxy().setUrl(url);
            view.getActiveItem().setItemTpl(['<div class="factura">', '<div> <p>' + APP.core.config.Locale.config.lan.InformesGeneradosList.codigo +
            ': <b>{codigo}</b><br> ' + APP.core.config.Locale.config.lan.InformesGeneradosList.descripcion +
            ': <b>{descripcion}</b><br> ' + APP.core.config.Locale.config.lan.InformesGeneradosList.cantidad +  
            ': <b>{cantidad}</b><br> ' + APP.core.config.Locale.config.lan.InformesGeneradosList.importe +  
             ': <b>{moneda} {importe}</b><br></div> <i style="font-size: 30px;float: right;margin-top: -25px;"></i>',
                      '<div style="font-size: 90%"> <div><p> </div>',
                '</div>'].join(''));
        } else{
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Informes/obtenInformeClientes";
            informes.getProxy().setUrl(url);
        }

        informes.setParams({
            Criterio: criterio            
        });

        console.log(informes.getProxy().getUrl());

        informes.load();
    },

    auxiliarPonCodigos: function (criterio){
        var me = this,
            view = me.getMenuNav();

        if(view.getActiveItem().isXType('informesform')){
            return;
        }                   

        view.push({
            xtype: 'informesform',
            title: criterio
        });

        me.getMenuNav().titulo = criterio;        
        me.ponCodigos(criterio);
    },

    muestraCodigos: function (textfield){
        var me = this,
            view = me.getMenuNav(),
            codigos,
            store;
            //codigos = Object.getOwnPropertyDescriptor(me.getMenuNav(), criterio.substring(0,1).toLowerCase() + criterio.substring(1, criterio.length)).value;

        if(view.titulo == 'Clientes'){
            codigos = 'clienteslist'
        } else {
            codigos = 'productoslist'
            store = Ext.getStore('Productos');
            store.load();
        }
console.log(textfield.getItemId());
        view.push({
            xtype: 'container',
            id: textfield.getItemId(),
            layout: 'fit',
            //itemId: textfield.itemId,//'informescont',
            items: [{
                xtype: codigos,
                title: APP.core.config.Locale.config.lan.menu.Informes
            }]        
        });      
    }
});