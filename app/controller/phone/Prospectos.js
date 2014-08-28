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
            'prospectoslist':{
                activate: function(list){
                    list.getStore().resetCurrentPage();
                    list.getStore().setParams({
                        Criterio: localStorage.getItem("CodigoDispositivo")
                    });
                    list.getStore().load();
                }
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

    agregaProspecto: function (button){
        var me = this,
            i, j,
            view = me.getMenuNav();
            form = me.getProspectosForm(),
            valores = form.getValues(),
            msg = 'Se agregó el prospecto exitosamente con folio ',
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "oProspecto.CodigoSocio": valores.codigo,
                "oProspecto.NombreSocio": valores.razonSocial,
                "oProspecto.TipoPersona": valores.tipoPersona,
                "oProspecto.RFC": valores.rfc,
                "oProspecto.Direcciones[0].Calle": valores.calle,
                "oProspecto.Direcciones[0].NoExterior": valores.noExt,
                "oProspecto.Direcciones[0].NoInterior": valores.noInt,
                "oProspecto.Direcciones[0].Colonia": valores.colonia,
                "oProspecto.Direcciones[0].Municipio": valores.municipio,
                "oProspecto.Direcciones[0].Ciudad": valores.ciudad,
                "oProspecto.Direcciones[0].Estado": valores.estado,
                //"oProspecto.Direcciones[0].Pais": valores.
                "oProspecto.Direcciones[0].CodigoPostal": valores.cp,                
                "oProspecto.Contacto1.CodigoSocio": valores.codigo,
                "oProspecto.Contacto1.CodigoContacto": 128,
                "oProspecto.Contacto1.Nombre": valores.nombreEncargado,
                "oProspecto.Contacto1.Telefono1": valores.telOficinaEncargado,
                "oProspecto.Contacto1.TelefonoMovil": valores.telMovilEncargado,
                "oProspecto.Contacto2.CodigoSocio": valores.codigo,
                "oProspecto.Contacto2.CodigoContacto": 129,
                "oProspecto.Contacto2.Nombre": valores.nombreEncargadoCompras,
                "oProspecto.Contacto2.Telefono1": valores.telEncargadoCompras,
                "oProspecto.Contacto3.CodigoSocio": valores.codigo,
                "oProspecto.Contacto3.CodigoContacto": 130,
                "oProspecto.Contacto3.Nombre": valores.nombreEncargadoPagos,
                "oProspecto.Contacto3.Telefono1": valores.telEncargadoPagos,
                "oProspecto.Contacto4.CodigoSocio": valores.codigo,
                "oProspecto.Contacto4.CodigoContacto": 131,
                "oProspecto.Contacto4.Nombre": valores.nombreResponsableTecnico,
                "oProspecto.Contacto4.Telefono1": valores.telResponsableTecnico,
                "oProspecto.zonaDeInfluencia": valores.zonaDeInfluencia,
                "oProspecto.comentarios": valores.comentarios
            };

            if (valores.servicio != null){
                for(i = 0; i < valores.servicio.length; i++){
                    if(valores.servicio[i] != null){                                                        
                        var campo = button.up('prospectosform').down('#conceptos' + (i+1)),
                            elementos = campo.getItems().items,
                            k = 0;

                        for(j = 1; j < elementos.length; j++){                        
                            if(elementos[j].getChecked()){
                                params["oProspecto.Conceptos" + (i+1) + "[" + (k++) + "].Codigo"] = elementos[j].getValue(); //item.data.Folio;//get('NumeroDocumento');    
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
    }

});