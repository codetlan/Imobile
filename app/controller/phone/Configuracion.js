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
                                Ext.Msg.alert("Error", "La imagen debe de ser menor de 4 megas");
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
            imagecmp = me.getImagenCmp(),
            list = me.getOpcionesOrden().down('partidacontainer').down('panel').bodyElement;

        Ext.Msg.show({
            title: 'Configuración',
            message: 'Deseas guardar los cambios Configurados?',
            width: 300,
            buttons: [
                {
                    itemId: 'no',
                    text: 'No'
                },
                {
                    itemId: 'yes',
                    text: 'Si',
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

                    var idioma = button.up('configuracionpanel').down('selectfield').getValue();
console.log(idioma);
                    switch (idioma){
                        case 'en':
                            Ext.Ajax.request({
                                url: 'app/core/data/en_US.json', // Leemos del json
                                
                                success: function(response){
                                    var text = response.responseText,  // Recuperamos el contenido del json en una cadena text
                                        trans, // Las traducciones para el menú
                                        idiomas = Ext.decode(text);  // Convertimos text en objeto
                                    
                                    APP.core.config.Locale.config.lan = idiomas.lan;  // Seteamos la propiedad lan
                                    trans = Ext.Object.getValues(idiomas.lan.menu); // Establecemos las cadenas del menú

                                    APP.core.config.Locale.almacenes = Ext.Viewport.getAt(1).almacenes;

                                    Ext.Viewport.removeAll(true);  // Removemos todos los elementos del viewport                                                                    
                                    APP.core.config.Locale.localize();  // Recargamos los componentes con su traducción
                                    
                                    //Ext.Viewport.add(Ext.create('APP.view.phone.MainCard')); // Agregamos la vista del main                                    
                                    Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));

/*                                    Ext.Viewport.getActiveItem().getActiveItem().push({   // Pusheamos la vista de configuración
                                        xtype: 'configuracionpanel'
                                    });   */                                 

                                    Ext.getStore('Menu').getData().items.forEach(function(element, index, array){ // Cambiamos la propiedad name de cada elemento del store Menu
                                        Object.defineProperty(element.getData(), "name", {
                                            get: function(){
                                                return trans[index];
                                            }
                                        });
                                    });
                                },

                                failure: function(response, opts) {
                                    Ext.Msg.alert("Error", "No se encontró el archivo de configuración de idioma");
                                }
                            });

                            break;

                        case 'es':
                            console.log('Ingles');
                            Ext.Viewport.removeAll(true);
                            APP.core.config.Locale.localize('en_US');
                            Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel')); 
                            break;
                    }
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