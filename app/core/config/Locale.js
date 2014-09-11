Ext.define('APP.core.config.Locale', {
  singleton: true,

/*  language: {[
    lan: { [
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
      }]
    }]
  },*/

/*  language: {
    lan: [
        {
        usuario: 'Código de usuario',
        contrasenia: 'Contraseña',
        ingresar: 'Ingresar'
      },

       {
        imagenEmpresa: "Imagen de la empresa2",
        seleccionarImagen: "Seleccionar imagen2",
        idioma: "Idioma2",
        guardar: "Guardar cambios2"
      }
    ]
  },*/

  config: {

    lan: {
      LoginForm: {
        usuario: 'Código de usuario',
        contrasenia: 'Contraseña',
        ingresar: 'Ingresar'
      },

      ConfiguracionPanel: {
        imagenEmpresa: "Imagen de la empresa",
        seleccionarImagen: "Seleccione imagen",
        idioma: "Idioma",
        guardar: "Guardar cambios"
      }
    }
  },  

  localize: function() {    
    console.log(this.config);
    var translations = this.config.lan;
        me = this,      

    console.log(translations);
      
    for (var view in translations) {
      console.log(view);
      //APP.view.phone.login[view];
  
      switch(view.toString()){
        case 'LoginForm':
          Ext.apply(APP.view.phone.login[view].prototype, translations[view]);
          break;

        case 'ConfiguracionPanel':
          Ext.apply(APP.view.phone.configuracion[view].prototype, translations[view]);
        break;
      }
      
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
  }
});