/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Configuracion', {
    extend: 'Ext.app.Controller',
    requires:['APP.core.config.Locale'],

    config: {
        refs: {
            fileUpload: 'configuracionpanel fileupload',
            imagenCmp: 'configuracionpanel component[id=imagencmp]',
            opcionesOrden: 'opcionesorden',
            opcionesOrdenesList: 'opcionordeneslist'            
        },
        control: {
            'configuracionpanel container button[action=subirimagen]': {
                tap: function () {

                    Ext.device.Camera.capture({
                        success: function (data) {
                            var imagecmp = this.getImagenCmp(),
                                imagesize = this.sizeString(data) / 1024 / 1024;

                            if (imagesize < 10) {
                                imagecmp.setHtml("<img id='imagen_background' src='data:image/jpeg;base64," + data + "' style='width:100%; height:auto;'>");
                            }
                            else {
                                Ext.Msg.alert(APP.core.config.locale.config.lan.Configuracion.seleccionarMonedaError,
                                    APP.core.config.locale.config.lan.Configuracion.tamanioImagen);
                            }
                        },
                        source: 'album',
                        destination: 'data',
                        encoding: 'jpg',
                        scope: this
                    });


                    /*var imagecmp = this.getImagenCmp(),
                     imagesize = this.sizeString(data) / 1024 / 1024;

                     if(data.indexOf("data:image/") >= 0){
                     if(imagesize < 10){
                     localStorage.setItem("imagenorden",data);
                     imagecmp.setHtml("<img src='" + data + "' style='width:100%; height:auto;'>");
                     }
                     else{
                     Ext.Msg.alert("Error","La imagen debe de ser menor de 4 megas");
                     }
                     }
                     else{
                     Ext.Msg.alert("Error","No es una imagen válida");
                     return false;
                     }*/

                }
            },
            'configuracionpanel': {
                activate: function () {
                    var imagen = localStorage.getItem("imagenorden");
                    if (imagen) {
                        var imagecmp = this.getImagenCmp();
                        imagecmp.setHtml("<img id='imagen_background' src='"+imagen+"' style='width:100%; height:auto;'>");

                    }

                }
            },
            'configuracionpanel #guardar': {
                tap: 'onSaveConfig'
            },
            'configuracionpanel container #deleteImage': {
                tap: 'onDeleteImage'
            }
        }
    },
    sizeString: function (str) {
        var s = str.length;
        for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) s++;
            else if (code > 0x7ff && code <= 0xffff) s += 2;
            if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
        }
        return s;
    },

    onSaveConfig: function (button) {
        var me = this,
            imagecmp = me.getImagenCmp();
            list = me.getOpcionesOrden().down('partidacontainer').down('panel').bodyElement;

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.Configuracion.mascara);
        Ext.Viewport.setMasked(true);

        Ext.Msg.show({
            title: APP.core.config.Locale.config.lan.Configuracion.titulo,
            message: APP.core.config.Locale.config.lan.Configuracion.onSaveConfig,
            width: 300,
            buttons: [
                {
                    itemId: 'no',
                    text: APP.core.config.Locale.config.lan.Ordenes.confirmaNo
                },
                {
                    itemId: 'yes',
                    text: APP.core.config.Locale.config.lan.Ordenes.confirmaSi,
                    ui: 'action'
                }
            ],
            fn: function (buttonId) {                
                if (buttonId == 'yes') {                    
                    if (imagecmp.getInnerHtmlElement() && imagecmp.getInnerHtmlElement().down('#imagen_background')) {
                        localStorage.setItem("imagenorden", imagecmp.getInnerHtmlElement().down('#imagen_background').getAttribute('src'));
                        list.down('#datos_orden img').dom.setAttribute("src", localStorage.getItem('imagenorden'));

                    } else {
                        localStorage.setItem('imagenorden','');
                        list.down('#datos_orden img').dom.setAttribute("src", "");
                    }

                    var idioma = button.up('configuracionpanel').down('selectfield').getValue(),
                        url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Locale/CambiarIdioma",
                        params = {
                            CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                            CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                            CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                            Token: localStorage.getItem("Token")
                        };                    
                    
                    switch (idioma){
                        case 'en-US':                            
                            params["Criterio"] =  'COK_JO_en_US';                            
                            break;

                        case 'es-MX':
                            params["Criterio"] = 'COK_JO_es_MX';
                            break;
                    }

                    //console.log(params);
                    Ext.data.JsonP.request({
                        url: url, 
                        params: params,                        
                        
                        success: function(response){
                            if (response.Procesada) {
                                var text = response.Data[0].Idioma,
                                    pinta = "", i,
                                    trans, // Las traducciones para el menú
                                    idiomas = Ext.decode(text);  // Convertimos text en objeto
                                
                                APP.core.config.Locale.config.lan = idiomas.lan;  // Seteamos la propiedad lan
                                trans = Ext.Object.getValues(idiomas.lan.menu); // Establecemos las cadenas del menú

                                //APP.core.config.Locale.almacenes = Ext.Viewport.getAt(1).almacenes;
                                Ext.Viewport.removeAll(true);  // Removemos todos los elementos del viewport                                
                                                                
                                Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));

                                Ext.getStore('Menu').getData().items.forEach(function(element, index, array){ // Cambiamos la propiedad name de cada elemento del store Menu
                                    Object.defineProperty(element.getData(), "name", {
                                        get: function(){
                                            return trans[index];
                                        }
                                    });
                                });

                                Ext.Viewport.setMasked(false);
                            }
                        },

                        failure: function(response, opts) {
                            Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaError, 
                                APP.core.config.Locale.config.lan.Configuracion.sinIdioma);

                            Ext.Viewport.setMasked(true);
                        }
                    });
                }
            }
        });
    },

    onDeleteImage: function () {
        var me = this,
            imagecmp = me.getImagenCmp(),
            list = me.getOpcionesOrden().down('partidacontainer').down('panel').bodyElement;

        imagecmp.setHtml("");
        //imagecmp.getInnerHtmlElement().down('#imagen_background').dom.setAttribute('src','');
        //localStorage.setItem('imagenorden','');
    }
});