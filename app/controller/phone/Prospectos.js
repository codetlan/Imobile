/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Prospectos', {
    extend: 'Ext.app.Controller',

    config:{
    	refs:{
			menuNav:'menunav',
            prospectosForm: 'prospectosform'
    	},

    	control:{
            'prospectoslist #agregar': {
                tap: 'onAgregarProspecto'
            },
            'prospectosform checkboxfield[name=este]':{
                change: 'toggleFieldSetItems'
            },
            'prospectosform numberfield': {
                keyup: 'respondeAKeyUp'
            },
            'prospectosform checkboxfield[name=servicio]':{
                change: 'muestraConceptos'
            },
            'prospectosform #agregarProspecto':{
                tap: 'agregaProspecto'
            },
            'prospectosform #estado':{
                focus:'estableceOpciones'
            },
            'prospectoslist':{
                activate: function(list){
                    list.getStore().resetCurrentPage();
                    list.getStore().setParams({
                        Criterio: localStorage.getItem("CodigoDispositivo")
                    });
                    list.getStore().load();
                },
                itemtap: 'muestraProspectos'
    	   }
        }
    },

    onAgregarProspecto: function (btn) {
        var me = this,
            view = me.getMenuNav();
            
        view.push({
            xtype: 'prospectosform'
        });
    },

    toggleFieldSetItems: function (chk, value) {
        var items = chk.up('fieldset').getItems().items,
            numberfield, fieldToFocus = undefined;

        /*        if (!value) {
         chk.uncheck();
         console.log(false);
         return false;
         }*/

        Ext.each(items, function (item, index) {
            if (!value && index != 0) {
                item.disable();
                item.hide();
            } else {
                item.enable();
                item.show();
                if (item.isXType('numberfield')) {
                    //si se trata del primer numberfield dentros del fieldset,se debe de enfocar!!!               
                    fieldToFocus = fieldToFocus || index;
                    if (fieldToFocus === index) {
                        numberfield = item;
                        setTimeout(function () {
                            numberfield.focus();
                        }, 200);
                    }
                }
            }
        });
    },

    respondeAKeyUp: function (numberfield) {
        var padre = numberfield.getParent(),
            opcion = padre.getItemId();

        switch (opcion) {
            case 'superficie':
                var items = padre.getItems().items,
                    i, suma = 0;

                for (i = 1; i < items.length - 1; i++) {
                    suma += items[i].getValue();
                }

                padre.down('#total').setValue(suma).setDisabled(true);
                break;
        }
    },

    muestraConceptos: function (checkboxfield, newValue, OldValue){
        var me = this,
            i;
        if(newValue){
            if(checkboxfield.up('fieldset').getItems().length == 1){
                var url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerConceptos",
                    idCheck = checkboxfield.getItemId().toString(),
                    concepto = idCheck.charAt(idCheck.length - 1),
                    params = {
                        CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                        CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                        CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                        Token: localStorage.getItem("Token"),
                        Concepto: concepto
                    };

                    Ext.data.JsonP.request({
                        url: url,
                        params: params,
                        callbackKey: 'callback',
                        success: function (response) {
                            if (response.Procesada) {                        
                                var checkboxfields = new Array(),
                                    datos = response.Data,
                                    i;

                                for (i = 0; i < datos.length; i++){

                                    checkboxfields[i] = Ext.field.Checkbox({
                                        xtype: 'checkboxfield',
                                        name: datos[i].Nombre,
                                        label: datos[i].Nombre,
                                        value: datos[i].Codigo
                                        //tipo: datos[i].Campo1
                                    });
                                }

                                checkboxfield.up('fieldset').add(checkboxfields);
                                me.toggleFieldSetItems(checkboxfield, true);
                            } else {                        
                                Ext.Msg.alert("Error", "No se pudo obtener la lista: " + response.Descripcion);
                            }
                        }
                    });
            } else {
                me.toggleFieldSetItems(checkboxfield, true);
            }
        } else {

            me.toggleFieldSetItems(checkboxfield, false);
        }
    },

    estableceOpciones: function (selectfield){
        if(selectfield.getOptions() == null){ // Checamos si tiene opciones            
            var me = this,
                url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Catalogos/ObtenerListaEstados",
                params = {
                    CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                    CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                    CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                    Token: localStorage.getItem("Token")                
                };

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

                        selectfield.setOptions(opciones);
                        selectfield.showPicker();                        

                    } else {
                        //me.getMainCard().getActiveItem().setMasked(false);
                        Ext.Msg.alert("No se pudieron obtener los estados", "Se presentó un problema al intentar obtener los estados: " + response.Descripcion);
                    }
                }
            });            
        }
    },

    agregaProspecto: function (button) {
        var me = this,
            i, j, k, l = 1,
            view = me.getMenuNav(),
            form = me.getProspectosForm(),
            valores = form.getValues(),
            msg = 'Se agregó el prospecto exitosamente con folio ',
            campo, elementos,
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "oProspecto.CodigoSocio": valores.CodigoSocio,
                "oProspecto.NombreSocio": valores.NombreSocio,
                "oProspecto.TipoPersona": valores.TipoPersona,
                "oProspecto.RFC": valores.RFC,
                "oProspecto.Direcciones[0].Calle": valores.Calle,
                "oProspecto.Direcciones[0].NoExterior": valores.NoExterior,
                "oProspecto.Direcciones[0].NoInterior": valores.NoInterior,
                "oProspecto.Direcciones[0].Colonia": valores.Colonia,
                "oProspecto.Direcciones[0].Municipio": valores.Municipio,
                "oProspecto.Direcciones[0].Ciudad": valores.Ciudad,
                "oProspecto.Direcciones[0].Estado": valores.Estado,
                //"oProspecto.Direcciones[0].Pais": valores.
                "oProspecto.Direcciones[0].CodigoPostal": valores.CodigoPostal,
                "oProspecto.Contacto1.CodigoSocio": valores.CodigoSocio,
                "oProspecto.Contacto1.CodigoContacto": l++,
                "oProspecto.Contacto1.Nombre": valores.nombreEncargado,
                "oProspecto.Contacto1.Telefono1": valores.telOficinaEncargado,
                "oProspecto.Contacto1.TelefonoMovil": valores.telMovilEncargado,
                "oProspecto.zonaDeInfluencia": valores.zonaDeInfluencia,
                "oProspecto.comentarios": valores.comentarios
            };

            for(i = 2; i < 5; i++){
                campo = button.up('prospectosform').down('#contactos' + i); // Esto es un checkboxfield
                console.log('contactos' + i);
                if(campo.getChecked()){
                    elementos = campo.up('fieldset').getItems().items; // Obtenemos los hermanos del checkboxfield

                    params["oProspecto.Contacto" + i + ".CodigoSocio"] = valores.codigo;
                    params["oProspecto.Contacto" + i + ".CodigoContacto"] = l++;                    
                    params["oProspecto.Contacto" + i + ".Nombre"] = elementos[1].getValue(); 
                    params["oProspecto.Contacto" + i + ".Telefono1"] = elementos[2].getValue();                    
                }
            }

            if (valores.servicio != null){ // Validamos si se seleccionó algún servicio
                for(i = 0; i < valores.servicio.length; i++){ //Recorremos cada uno de los servicios
                    if(valores.servicio[i] != null){ // Si se seleccionó algún elemento del servicio
                        campo = button.up('prospectosform').down('#conceptos' + (i+1)); // Esto es un Fieldset
                        elementos = campo.getItems().items; // Obtenemos los items del fieldset en un arreglo                        
                        k = 0;

                        for(j = 1; j < elementos.length; j++){ // Recorremos el arreglo desde la posición 1 puesto que el 0 es el checkboxfield
                            if(elementos[j].getChecked()){ //Si está seleccionado mandamos el código
                                params["oProspecto.Conceptos" + (i+1) + "[" + (k++) + "].Codigo"] = elementos[j].getValue();
                            }
                        }
                    }
                }
            }

            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/AgregarProspectoiMobile";
            
            console.log(params);

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {                        
                        Ext.Msg.alert("Prospecto agregado", msg );//+ response.CodigoUnicoDocumento + ".");
                        view.pop();
                    } else {
                        //me.getMainCard().getActiveItem().setMasked(false);
                        Ext.Msg.alert("Prospecto no agregado", "Se presentó un problema al intentar agregar al prospecto: " + response.Descripcion);
                    }
                }
            });

        // } else {
        //     me.getMainCard().getActiveItem().setMasked(false);
        //     Ext.Msg.alert("Sin pago", "Agrega por lo menos un pago.");
        // }
    },

    muestraProspectos: function(list, index, target, record){
        var me = this,
            view = me.getMenuNav(),            
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerProspectoiMobile",            
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: record.data.CodigoSocio
            }        

        Ext.data.JsonP.request({
            url: url,
            params: params,
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    var valores = response.Data[0];

                    valores = valores.Direcciones[0];                    
                    me.onAgregarProspecto();
                    me.getProspectosForm().down('fieldset').setTitle("Datos de prospecto");
                    me.getProspectosForm().setValues(valores);

                    valores = response.Data[0];                    
                    me.getProspectosForm().setValues(valores);

                    me.getProspectosForm().setDisabled(true);
                    me.getProspectosForm().down('button').setHidden(true);

                } else {
                    Ext.Msg.alert("Imposiblr cargar prospecto", "Se presentó un problema al intentar leer los datos del prospecto: " + response.Descripcion);
                }
            }
        });        
    }
});