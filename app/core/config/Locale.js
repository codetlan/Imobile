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

      Login: {
        accediendo: "Accediendo",
        problemasConexionMsg: "No se puede encontrar el servidor",
        confirmaTitle: "Configuración",
        confirmaMsg: "¿Estás seguro que deseas cambiar la configuración?"
      },

      ConfiguracionPanel: {
        imagenEmpresa: "Imagen de la empresa",
        seleccionarImagen: "Seleccione imagen",
        idioma: "Idioma",
        guardar: "Guardar cambios"
      },

      ClientesList: {
        buscarClientes: "Buscar cliente...",
        cargando: "Cargando..."
      },

      OpcionOrdenesList: {
        ordenDeVenta: "Orden de venta",
        visualizarTransacciones : "Visualizar transacciones"
      },

      NavigationOrden: {
        agregar: "Agregar"
      },

      OpcionesOrdenPanel: {
        orden: 'Orden',
        cliente: 'Cliente',
        editar: 'Editar',
        eliminar: 'Eliminar',
        terminar: 'Terminar'
      },

      OrdenContainer: {
        descuento: "Descuento",
        subTotal: "Subtotal",
        impuesto: "Impuesto",
        total: "Total"
      },

      OrdenList: {
        cantidad: "Cantidad:",
        precio: "Precio:",
        descuento: "Desc:",
        total: "Total:"
      },

      onShowListOrden: {
        transaccion: "Transacción: Orden de venta",
        codigoDispositivo: "Código de dispositivo:",
        nombreDispositivo: "Nombre de dispositivo:",
        fecha: "Fecha:",
        codigoUsuario: "Código de usuario:",
        nombreUsuario: "Nombre de usuario:"
      },

      ProductosList: {
        textoVacio: "No hay productos con esos datos",
        buscar: "Buscar producto...",
        verMas: "Ver más..."
      },

      ProductosOrden: {
        lista: "Lista",
        panel: "Panel"
      },

      AgregarProductosForm: {
        titulo: "Agregar productos",
        instrucciones: "Ingrese los datos",
        codigo: "Código",
        descripcion: "Descripción",        
        moneda: "Moneda",
        descuento: "Descuento",
        precioConDescuento: "Precio con descuento",
        importe: "Importe",
        almacen: "Almacén",
        disponible: "Disponible"
      },

      ClienteForm: {
        instrucciones: "Datos del cliente",
        nombre: "Nombre",
        rfc: "RFC",
        telefono: "Teléfono",
        correo: "Correo",
        listaPrecios: "Lista de precios",
        credito: "Crédito",
        saldo: "Saldo"
      },

      DireccionesList:{
        entrega: "Dirección de entrega",
        fiscal: "Dirección fiscal"
      },

      EditarPedidoForm:{
        instrucciones: "Editar pedido",
        codigoCliente: "Código de cliente",
        nombreCliente: "Nombre de cliente",
        limiteCredito: "Límite de crédito",
        condicionCredito: "Condición de crédito",
        vendedor: "Vendedor",
        tipoCambio: "Tipo de cambio"
      },

      Ordenes:{
        alSeleccionarCliente: "Datos incorrectos",
        alSeleccionarClienteCargar: "Cargando cliente...",
        confirmaSi: "Si",
        confirmaNo: "No",
        onTerminarOrdenAgregar: "Se agrego la orden correctamente con folio: ",
        onTerminarOrdenActualizar: "Se actualizó la orden correctamente con folio: ",
        onTerminarOrdenProcesada: "Orden procesada",
        onTerminarOrdenNoProcesadaTitle: "Orden no procesada",
        onTerminarOrdenNoProcesadaMsg: "No se procesó la orden correctamente: ",
        onTerminarOrdenFalloTitle: "Problemas de conexión",
        onTerminarOrdenFalloMsg: "El servidor está tardando demasiado en responder, intente más tarde.",
        onTerminarOrdenSinProductosTitle: "Productos",
        onTerminarOrdenSinProductosMsg: "Seleccione al menos un producto.",
        onEliminarOrdenTitulo: "Eliminar orden",
        onEliminarOrdenMsg: "Se va a eliminar la orden, todos los productos agregados se perderán ¿está seguro?",
        eliminarPartidaTitulo: "Eliminar producto de la orden",
        eliminarPartidaMsg: "Se va a eliminar el producto de la orden ¿está seguro?",
        confirmaTerminarOrdenTitulo: "Terminar orden",
        confirmaTerminarOrdenMsg: "¿Desea terminar la orden de venta?",        
        confirmaActualizarOrdenTitulo: "Actualizar orden",
        confirmaActualizarOrdenMsg: "¿Desea actualizar la orden de venta?",
        estableceDireccionesTitle: "Sin dirección de entrega",
        estableceDireccionesMsg: "Este cliente no tiene direcciones de entrega definidas.",
        seleccionarMonedaError: "Error",
        seleccionarMonedaMsg1: "No es posible cambiar la configuración debido a que la moneda del producto con código ",
        seleccionarMonedaEs: " es ",
        seleccionarMonedaMsg2: ". Elimínelo primero de la orden.",
        seleccionarMonedaNoMultimonedaTitle: "No es multimoneda",
        seleccionarMonedaNoMultimonedaMsg1: "El cliente ",
        seleccionarMonedaNoMultimonedaMsg2: " sólo puede operar con ",
        agregaProductosCamposInvalidosTitle: "Campos inválidos o vacíos",
        agregaProductosCamposInvalidosMsg: "Verifique que el valor de los campos sea correcto o que no estén vacíos",
        agregaProductosImposibleAgregarTitle: "Imposible agregar",
        agregaProductosImposibleAgregarMsg1: "No es posible agregar el producto a la orden debido a que la configuración de la moneda actual es ",
        agregaProductosImposibleAgregarMsg2: " y la moneda del producto es ",
        onSeleccionarTransaccionTitle: "Moneda diferente",
        onSeleccionarTransaccionMsg: "No se pudo recuperar la Orden de Venta pues alguna partida viene en una moneda diferente a la del documento y está en moneda extranjera.",
        enviandoOrden: "Enviando orden"
      },

      TransaccionList: {
        folio: "Folio",
        tipoTransaccion: "Tipo de transacción",
        orden: "Orden de venta",
        buscar: "Buscar transacción..."
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
  
/*      switch(view.toString()){
        case 'LoginForm':
          Ext.apply(APP.view.phone.login[view].prototype, translations[view]);
          break;

        case 'ConfiguracionPanel':
          Ext.apply(APP.view.phone.configuracion[view].prototype, translations[view]);
          break;

        case 'ClientesList':
          Ext.apply(APP.view.phone.clientes[view].prototype, translations[view]);
          break;

        case 'OpcionOrdenesList':
          Ext.apply(APP.view.phone.ordenes[view].prototype, translations[view]);
          break;
      }*/
      
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