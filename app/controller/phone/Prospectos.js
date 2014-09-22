/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Prospectos', {
    extend: 'Ext.app.Controller',

    config:{
    	refs:{
			menuNav:'menunav',            
            prospectosForm: 'prospectosform',
            prospectosList: 'prospectoslist'
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
            'prospectoslist #buscar':{
                tap: 'buscaProspectoBoton'
            },
            'prospectosform #estado':{
                focus:'estableceOpciones'
            },
            'prospectoslist':{
                activate: function(list){
                    list.getStore().resetCurrentPage();
/*                    list.getStore().setParams({
                        Criterio: localStorage.getItem("CodigoDispositivo")
                    });*/
                    list.getStore().load();
                },
                itemtap: 'muestraProspectos'
    	   },
           'prospectoslist #buscarProspectos':{
                keyup: 'buscaProspecto',
                clearicontap: 'limpiaBusquedaProspecto'
           }/*,
            'prospectosform textfield':{
                focus: 'muestraTabIndex'
           }*/
        }
    },

    onAgregarProspecto: function (btn) {
        var me = this,
            url =  "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerFolioSiguienteProspecto",            
            view = me.getMenuNav(),
            codigo,
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),                
            };
        Ext.Viewport.getMasked().setMessage('Construyendo folio...');
        Ext.Viewport.setMasked(true);

        Ext.data.JsonP.request({
            url: url,
            params: params,
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {                        
                   codigo = response.Data[0].Campo1;

                    view.push({
                        xtype: 'prospectosform'
                    });

                    me.getProspectosForm().setValues({
                        CodigoSocio: codigo
                    });

                    me.getProspectosForm().down("#codigoSocio").setDisabled(true);
                    Ext.Viewport.setMasked(false);

                } else {                        
                    Ext.Msg.alert("Error", "No se pudo obtener el código del cliente: " + response.Descripcion);
                }
            }
        });        
    },

    muestraTabIndex: function (textfield){
        //var me = this;

        console.log(textfield.getTabIndex());
    },

    buscaProspectoBoton: function (btn){
        var me = this,
            store = me.getProspectosList().getStore(),
            value = me.getProspectosList().down('searchfield').getValue();

        store.resetCurrentPage();
        store.setParams({
            Criterio: value
        });

        store.load();
    },

    buscaProspecto: function (searchfield){
        if(event.keyCode == 13){
            var me = this,
                store = me.getProspectosList().getStore(),
                value = searchfield.getValue();

            store.resetCurrentPage();
            store.setParams({
                Criterio: value
            });

            store.load();
        }
    },

    limpiaBusquedaProspecto: function (){
        var me = this,
            store = me.getProspectosList().getStore();
        
        store.resetCurrentPage();
        store.setParams({
            Criterio: ''
        });

        store.load();    
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

                Ext.Viewport.getMasked().setMessage('Obteniendo ' + checkboxfield.getLabel());
                Ext.Viewport.setMasked(true);

                    Ext.data.JsonP.request({
                        url: url,
                        params: params,
                        callbackKey: 'callback',
                        success: function (response) {
                            if (response.Procesada) {                        
                                var checkboxfields = new Array(),
                                    datos = response.Data,
                                    i;

                                me.agregaCampos(datos, checkboxfields);

                                checkboxfield.up('fieldset').add(checkboxfields);
                                me.toggleFieldSetItems(checkboxfield, true);
                                Ext.Viewport.setMasked(false);
                            } else {
                                Ext.Viewport.setMasked(true);
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

    agregaCampos: function(datos, checkboxfields){
        var i;

        for (i = 0; i < datos.length; i++){

            checkboxfields[i] = Ext.field.Checkbox({
                xtype: 'checkboxfield',
                name: datos[i].Nombre,
                label: datos[i].Nombre,
                value: datos[i].Codigo                
            });
        }
    },  

    estableceOpciones: function (selectfield){
        var me = this;

        if(selectfield.getOptions() == null){ // Checamos si tiene opciones   
            selectfield.setOptions(me.getMenuNav().estados);
            selectfield.showPicker(); 
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
            
            if(campo.getChecked()){
                elementos = campo.up('fieldset').getItems().items; // Obtenemos los hermanos del checkboxfield

                params["oProspecto.Contacto" + i + ".CodigoSocio"] = valores.CodigoSocio;
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

        campo = button.up('prospectosform').down('#superficieCheck'); // Esto es un Checkboxfield

        if(campo.getChecked()){
            params["oProspecto.campoAbierto"] = valores.campoAbierto;
            params["oProspecto.invernadero"] = valores.invernadero;
            params["oProspecto.macroTunel"] = valores.macroTunel;
            params["oProspecto.total"] = valores.total;
        } else {
            params["oProspecto.campoAbierto"] = 0;
            params["oProspecto.invernadero"] = 0;
            params["oProspecto.macroTunel"] = 0;
            params["oProspecto.total"] = 0;
        }

        elementos = me.getProspectosForm().getItems().items;

        for(i = 0; i < 3; i++){
            for(j = 0; j < elementos[i].getInnerItems().length; j++){
                if(elementos[i].getInnerItems()[j].getRequired()){                    
                    if(Ext.isEmpty(elementos[i].getInnerItems()[j].getValue())){                        
                        Ext.Msg.alert("Campo obligatorio", "El campo " + elementos[i].getAt(j).getLabel() + " es obligatorio.");
                        return;
                    }
                }                
            }                
        }

        url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/AgregarProspectoiMobile";
        
        Ext.Viewport.getMasked().setMessage('Enviando prospecto...');
        Ext.Viewport.setMasked(true);
        console.log(params);

        Ext.data.JsonP.request({
            url: url,
            params: params,
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {                        
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert("Prospecto agregado", msg );//+ response.CodigoUnicoDocumento + ".");
                    view.pop();                    
                } else {       
                    Ext.Viewport.setMasked(false);             
                    Ext.Msg.alert("Prospecto no agregado", "Se presentó un problema al intentar agregar al prospecto: " + response.Descripcion);                    
                }
            }
        });
    },

    muestraProspectos: function(list, index, target, record){
        var me = this,
            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerProspectoiMobile",
            view = me.getMenuNav(),
            campo, elementos, i,
            params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: record.data.CodigoSocio
            };

        Ext.Viewport.getMasked().setMessage('Obteniendo prospecto...');
        Ext.Viewport.setMasked(true);

        Ext.data.JsonP.request({
            url: url,
            params: params,
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    var valores = response.Data[0];

                    view.push({
                        xtype: 'prospectosform'
                    }); 

                    //me.estableceOpciones(me.getProspectosForm().down('#estado'));
                    me.getProspectosForm().down('#estado').setOptions(me.getMenuNav().estados);

                    // Extraemos la dirección
                    valores = valores.Direcciones[0];                     
                    me.getProspectosForm().down('fieldset').setTitle("Datos de prospecto");                    
                    me.getProspectosForm().setValues(valores);

                    // Vamos por los contactos, primero el obligatorio
                    valores = response.Data[0].Contacto1
                    campos = me.getProspectosForm().down('#contactos1'); // Esto es un fieldset
                    elementos = campos.getItems().items; // Obtenemos los items del fieldset en un arreglo
                    elementos[0].setValue(valores.Nombre);
                    elementos[1].setValue(valores.Telefono1);
                    elementos[2].setValue(valores.TelefonoMovil);

                    //Ahora por los otros 3

                    for (i = 2; i < 5; i++){
                        valores = Object.getOwnPropertyDescriptor(response.Data[0], 'Contacto' + i).value;
                        
                        if(valores != null){
                            if(!(valores.Nombre === "")){
                                campos = me.getProspectosForm().down('#campo' + i); // Esto es un fieldset
                                elementos = campos.getItems().items; // Obtenemos a los hijos del fieldset
                                elementos[0].setChecked(true);
                                elementos[1].setValue(valores.Nombre);                        
                                elementos[2].setValue(valores.Telefono1);
                            }
                        }
                    }

                    // Siguen los conceptos.
                    var checkboxfields = new Array(),
                        concepto, j;

                    for (i = 1; i < 7; i++){
                        valores = Object.getOwnPropertyDescriptor(response.Data[0], 'Conceptos' + i).value;

                        if(!(valores.length == 0)){
                            concepto = me.getProspectosForm().down('#conceptos' + i);
                            me.agregaCampos(valores, checkboxfields);
                            concepto.add(checkboxfields);
                            me.toggleFieldSetItems(concepto.down('checkboxfield'), true);                            
                            elementos = concepto.getItems().items;

                            for (j = 0; j < elementos.length; j++){
                                elementos[j].setChecked(true);
                            }
                        }
                    }                  

                    // La superficie
                    valores = response.Data[0];
                    if(!(valores.total == 0)){
                        campo = me.getProspectosForm().down('#superficieCheck');
                        campo.setChecked(true);                        
                    }   

                    // Ahora los datos básicos como nombre, código, razón social, etc.
                    valores = response.Data[0];
                    me.getProspectosForm().setValues(valores);

                    me.getProspectosForm().setValues({
                        fecha: me.daFormatoAFecha(valores.FechaCreacion)
                    });                    
                                        
                    me.getProspectosForm().setDisabled(true);
                    me.getProspectosForm().down('button').setHidden(true);

                    setTimeout (function (){
                        me.getProspectosForm().down('#codigoSocio').focus();
                        Ext.Viewport.setMasked(false);

                    }, 200);                                

                } else {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert("Imposible cargar prospecto", "Se presentó un problema al intentar leer los datos del prospecto: " + response.Descripcion);
                }
            }
        }); 
    },

    daFormatoAFecha: function(fecha){
        anio = fecha.substring(0,4);
        mes = fecha.substring(5,7);
        dia = fecha.substring(8,10);
        
        return dia + '-' + mes + '-' + anio;
    }
}); 