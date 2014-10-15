Ext.define('APP.core.config.Locale', {
  singleton: true,

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

      Configuracion: {
        tamanioImagen: "La imagen debe ser menor de 4 megas",
        onSaveConfig: "¿Desea guardar los cambios configurados?",
        sinIdioma: "No se encontró el archivo de configuración de idioma",
        titulo: "Configuración"
      },

      ConfiguracionForm: {
        titulo: "Datos de configuración",
        codigoSociedad: "Código de Sociedad",
        codigoDispositivo: "Código de Dispositivo",
        servidor: "Servidor",
        guardar: "Guardar"
      },

      menu: {
        Orden: "Órdenes de Venta",
        Rutas: "Rutas y Actividades",
        Cobranza: "Cobranza",
        Informes: "Informes",
        Configuracion: "Configuración",
        Prospectos: "Prospectos"
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
      },

      CobranzaList: {
        cobranzaFacturas: "Cobranza de facturas",
        anticipoPedidos: "Anticipo de pedido",
        visualizarCobranza: "Visualizar cobranzas"      
      },

      FacturasList: {
        numero: "Número",
        saldo: "Saldo",
        fecha: "Fecha",
        vencimiento: "Vencimiento",
        noFacturasPendientes: "No hay facturas pendientes"
      },

      FacturasContainer: {
        aplicarPago: "Aplicar pago"
      },

      TotalAPagarContainer: {
        terminar: "Terminar",
        cancelar: "Cancelar"
      },

      TotalesContainer: {
        aCobrar: "A cobrar",
        pagado: "Pagado",
        pendiente: "Pendiente"
      },

      VisualizacionCobranzaList: {
        buscarCobranza: "Buscar cobranzas...",
        criterio: "Criterio...",
        seleccionaOpcion: "Seleccione una opción",
        cobranzaFactura: "Cobranza de factura",
        anticipoPedido: "Anticipo de pedido"
      },

      MontoAPagarForm: {
        monto: "Ingrese el monto a pagar",
        etiquetaMonto: "Monto",
        pagar: "Pagar"
      },

      Cobranza:{
        sinAnticiposPendientes: "No hay anticipos pendientes",
        anticiposNumero: "Número",        
        saldo: "Saldo",
        fecha: "Fecha",
        vencimiento: "Expiration",
        sinCobrosPendientes: "No existen cobros para este cliente",
        monedasDiferentesTitulo: "Monedas diferentes",
        monedasDiferentesMensaje: "Todas las facturas elegidas deben tener la misma moneda. \nElija facturas con la misma moneda.",
        sinSeleccionTitulo: "Sin selección",
        sinSeleccionMensaje: "Seleccione al menos una factura para continuar.",
        numeroCheque: "Ingrese el número de cheque",
        banco: "Ingrese el nombre del banco",
        noAutorizacion: "Ingrese el número de autorización",
        tarjeta: "Ingrese el número de tarjeta",
        errorNoNumericoTitulo: "Datos erróneos",
        erroNoNumericoMensaje: "Ingrese datos numéricos",
        sinCambioTitulo: "Sin cambio",
        sinCambioMensaje: "Esta forma de pago no permite dar cambio, disminuya la canticad.",
        cobroExitoso: "Se realizó el cobro exitosamente con folio ",
        enviandoCobro: "Enviando cobro...",
        cobroNoProcesadoTitulo: "Cobro no procesado",
        cobroNoProcesadoMensaje: "No se procesó el cobro correctamente: ",
        sinPagoTitulo: "Sin pago",
        sinPagoMensaje: "Agregue por lo menos un pago.",
        noCobrosCliente: "No existen cobros para este cliente"        
      },

      InformesGeneradosList: {
        codigo: "Código",
        descripcion: "Descripción",
        moneda: "Moneda",
        cantidad: "Cantidad",
        importe: "Importe",
        articulos: "Artículos",
        total: "Total",
        sinPendientes: "No existen informes con los datos proporcionados."
      },

      AnalisisVentasList: {
        clientes: "Clientes",
        articulos: "Artículos"
      },

      InformesList: {
        bitacoraVendedores: "Bitácora de Vendedores",
        analisisVentas: "Análisis de Ventas"
    },

    InformesForm: {
      fecha: "Fecha",
      desde: "Desde",
      hasta: "Hasta",
      codigo: "Código",
      crearInforme: "Crear Informe"
    },

    Informes: {
      noCodigosTitulo: "No se pudieron obtener los códigos",
      noCodigosMensaje: "Se presentó un problema al intentar obtener los códigos",
      codigoMayorTitulo: "Error",
      codigoMayorMensaje1: "El código ",
      codigoMayorMensaje2: " es mayor que ",
      clientes: "Clientes",
      articulos: "Artículos",
      analisisVentas: "Análisis de Ventas"
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
    }
  }

});