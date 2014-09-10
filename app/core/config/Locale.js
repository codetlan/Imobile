Ext.define('APP.core.config.Locale', {
  singleton: true,

  language: {es_MX: {
    LoginForm: {
      usuario: 'Código de usuario',
      contrasenia: 'Contraseña',
      ingresar: 'Ingresar'
    },

    Configuracion:{
      imagenEmpresa: "Imagen de la empresa2",
      seleccionarImagen: "Seleccionar imagen2",
      idioma: "Idioma2",
      guardar: "Guardar cambios2"
    }
  }
}

/*  config: {      

    es_MX: {
      LoginForm: {
        usuario: 'Código de usuario:',
        contrasenia: 'Contraseña',
        ingresar: 'Ingresar'
      }
    },

    en_US: {
      LoginForm: {
        usuario: 'Code user', //idiomas.Language[1].en_US[0].login.usuario,//'Code user', 
        contrasenia: 'Password',
        ingresar: 'Login'
      }
    }
  },  

  localize: function(locale) {    
    var translations = this.config[locale];
    for (var view in translations) {
      console.log(translations);
      //APP.view.phone.login[view];
  
      Ext.apply(APP.view.phone.login[view].prototype, translations[view]);
      //Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel')); 
    }
  },

  leeJson: function(){
    var me = this;        
    Ext.Ajax.request({
        url: 'app/core/data/Prueba.json',
        
        success: function(response){
            console.log(response);
            var text = response.responseText;
            
            var idiomas = Ext.decode(response.responseText);

//            me.getLoginForm().idiomas = idiomas;
            console.log(me.idiomas);            

            //me.localize(locale);
//                APP.core.config.Locale.localize('en_US');
        },
        failure: function(response, opts) {
            Ext.Msg.alert("Error", "No se encontró el archivo de configuración de idioma");
            return null;
        }
    });
    return idiomas;
  }*/
});