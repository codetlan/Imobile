/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Cobranza', {
    extend: 'Ext.app.Controller',

    config: {
        refs:{
            menuNav:'menunav',
            mainCard:'maincard',
            navigationCobranza:'navigationcobranza',
            totales: 'totalescontainer',
            facturasList: 'facturaslist',
            visualizacionCobranzaList: 'visualizacioncobranzalist'
        },
    	control:{

            'container[id=cobranzacont] clienteslist': {
                itemtap: 'alSeleccionarCliente'
            },
            'container[id=cobranzacont] opcionclientelist': {
                itemtap: 'onOpcionesCliente'
            },
            'opcionclientelist': {
                itemtap: 'onOpcionesCliente'
            },
            'cobranzalist': {
                itemtap: 'onItemTapCobranzaList'
            },
            'totalapagarcontainer #cancelar': {
                tap: 'cancelaPago'
            },
            'totalapagarcontainer #terminar': {
                tap: 'onTerminarCobranza'
            },
            'navigationcobranza #agregarPago': {
                tap: 'onAgregarPago'
            },
            'navigationcobranza': {
                pop: 'onPopNavigationCobranza'
            },
            'facturascontainer #aplicarPago': {
                tap: 'muestraCobranza'
            },
            'formasdepagolist': {
                itemtap: 'agregaPago'
            },
            'montoapagarform #pagar': {
                tap: 'onPagar'
            },
            'visualizacioncobranzalist #btnBuscarCobranza': {
                tap: 'onBuscarCobranza'
            },
            'visualizacioncobranzalist #buscarCobranzas':{
                clearicontap: 'limpiaBusquedaTransacciones'
            },
            'visualizacioncobranzalist #buscarTipo':{
                clearicontap: 'limpiaBusquedaTransacciones',
                change: 'onChangeTipoCobranza'
            }
    	}
    },

    /**
     * Establece el título y el id del cliente cada uno en una variable. Verifica de qué opción viene, venta o cobranza:
     * Venta: Muestra la vista de ventas.
     * Cobranza: Muestra la vista de cobranza.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    alSeleccionarCliente: function (list, index, target, record) {        
        var me = this,
            view = me.getMenuNav(),
            name = record.get('NombreSocio'),
            idCliente = record.get('CodigoSocio'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: 'titulo'
            });

        me.getNavigationCobranza().idCliente = idCliente;
        me.getNavigationCobranza().name = name;
                
        barraTitulo.title = name;

        view.push({
            xtype: 'cobranzalist',
            title: idCliente,
            idCliente: idCliente,
            name: name
        });

        view.add(barraTitulo);
    },

    /**
    * Muestra la lista de facturas pendientes asociadas al cliente elegido en clienteslist.
    * @param list Ésta lista.
    * @param index El índice del item tapeado.
    * @param target El elemento o DataItem tapeado.
    * @param record El record asociado al ítem.
    */
    onItemTapCobranzaList: function (list, index, target, record) {
        var me = this,
            view = me.getMenuNav(),            
            idCliente = me.getNavigationCobranza().idCliente; 

        switch(record.data.action){
            case 'cobranzaFacturas':            
                var store = Ext.getStore('Facturas');

                me.getNavigationCobranza().opcion = 'cobranza';

                view.push({
                    xtype: 'facturascontainer',
                    title: idCliente
                });

                params = {
                    CardCode: idCliente
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'anticipo':
                var store = Ext.getStore('Anticipos'),
                    anticiposlist;

                me.getNavigationCobranza().opcion = 'anticipo';

                view.push({
                    xtype: 'facturascontainer',
                    title: idCliente
                });

                anticiposlist = view.getActiveItem().down('facturaslist');

                anticiposlist.setStore(store); 
                anticiposlist.setEmptyText('<div style="margin-top: 20px; text-align: center">' + APP.core.config.Locale.config.lan.Cobranza.sinAnticiposPendientes + '</div>');
                anticiposlist.setItemTpl(['<div class="factura">', '<div> <p>' + APP.core.config.Locale.config.lan.Cobranza.anticiposNumero +': <b>{NumeroDocumento}</b>' +  APP.core.config.Locale.config.lan.Cobranza.saldo + ': <b>{saldoAMostrar}</b></div> <i style="font-size: 30px;float: right;margin-top: -25px;" class="fa fa-check"></i>',
                  '<div style="font-size: 90%"> <div><p>' + APP.core.config.Locale.config.lan.Cobranza.fecha + ': <b>{FechaCreacion}</b>' + APP.core.config.Locale.config.lan.Cobranza.vencimiento + ': <b>{FechaFin}</b> </div>',
            '</div>']);
                anticiposlist.setMode('SINGLE');

                params = {
                    CardCode: idCliente,
                    Criterio: ''
                };
                
                store.clearFilter();
                store.setParams(params);
                store.load();

                break;

            case 'visualizarCobranza':
                var store = Ext.getStore('Transacciones'),
                    url = "http://" + localStorage.getItem("dirIP") + '/iMobile/COK1_CL_Consultas/RegresarCobranzaiMobileCliente',
                    params = {
                        CardCode: idCliente,
                        Tipo: ''
                    };

                store.getProxy().setUrl(url);
                store.setParams(params);

                view.push({
                    xtype: 'visualizacioncobranzalist',
                    title: idCliente
                });

            view.getActiveItem().setEmptyText(APP.core.config.Locale.config.lan.Cobranza.sinCobrosPendientes);

            store.load({                
                callback: function(){
                    me.recorreVisualizacion (store)
                }
            });
        }
    },

    /**
     * Muestra la vista "totalapagarcontainer".
    * @param btn Éste botón.
     */
    muestraCobranza: function (btn) {
        var me = this,
            view = me.getMainCard(),
            facturasContainer = view.getActiveItem().getActiveItem(),
            facturaslist = facturasContainer.down('facturaslist'),
            navigationCobranza = me.getNavigationCobranza(),
            idCliente = navigationCobranza.idCliente, 
            name = navigationCobranza.name,
            i,
            total = 0,
            seleccion = facturaslist.getSelection(),            
            moneda,
            facturas = facturaslist.getStore(),
            aPagar,
            pagado = 0,
            boton = me.getNavigationCobranza().getNavigationBar().down('#agregarPago'),
            barraTitulo = ({
                xtype: 'toolbar',                
                docked: 'top',
                title: name
            });        

        if(seleccion.length > 0){ // Validamos que por lo menos se haya seleccionado una factura.
            moneda = seleccion[0].data.CodigoMoneda + ' ';

            for (i = 0; i < seleccion.length; i++) {

                if(moneda != seleccion[i].data.CodigoMoneda + ' '){
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.monedasDiferentesTitulo, APP.core.config.Locale.config.lan.Cobranza.monedasDiferentesMensaje);
                    return;
                }
                
                total += seleccion[i].data.TotalDocumento;
                seleccion[i].data.aPagar = true;
            }

            facturas.clearFilter();
            facturas.filter('aPagar', true);

            aPagar = total;

            view.getAt(2).setMasked(false); // Desactivamos la máscara.
            boton.setText(APP.core.config.Locale.config.lan.NavigationOrden.agregar);
            view.setActiveItem(2);            

            navigationCobranza.getNavigationBar().setTitle(idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
            navigationCobranza.add(barraTitulo);

            me.getTotales().down('#aCobrar').setItems({xtype: 'container', html: APP.core.FormatCurrency.currency(aPagar, moneda)});
            me.getTotales().down('#pagado').setItems({xtype: 'container', html: APP.core.FormatCurrency.currency(pagado, moneda)});
            me.getTotales().down('#pendiente').setItems({xtype: 'container', html: APP.core.FormatCurrency.currency(aPagar - pagado, moneda)});

        } else {
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.sinSeleccionTitulo,
                 APP.core.config.Locale.config.lan.Cobranza.sinSeleccionMensaje);
        }
    },

    /**
     * Responde al evento "tap" del botón "Agregar" de "totalapagarcontainer".
     * Muestra la lista de las formas de pago.
     * @param btn Este botón.
     */
    onAgregarPago: function (btn) {
        var me = this,
            view = me.getMainCard().getActiveItem(),
            idCliente = view.getNavigationBar().getTitle();            
    
        view.push({
            xtype: 'formasdepagolist',
            title: idCliente
        });
        
        view.getActiveItem().getStore().load();
        view.getNavigationBar().down('#agregarPago').hide();
    },

    /**
     * Responde al evento "itemtap" de "formasdepagolist". Muestra el formulario correspondiente a la forma de pago elegida.
     * Muestra el formulario para agregar un pago a la cobranza actual.
     * @param list Esta lista "formasdepagolist"
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    agregaPago: function (list, index, target, record) {
        var me = this,
            view = list.up('navigationcobranza'), 
            idCliente = view.getNavigationBar().getTitle();

        view.push({
            xtype: 'montoapagarform',            
            title: idCliente
        });

        me.determinaVistaMontoAPagar(record.data.TipoFormaPago, view);
        view.down('fieldset').setTitle(record.data.Nombre);
    },

    /**
    * Determina la vista del formulario del monto a pagar según la opción de pago que se haya elegido.
    * @param opcion El código de la opción de la forma de pago.
    * @param view La vista del formulario.
    */
    determinaVistaMontoAPagar: function(opcion, view){

        switch (opcion) {
            case "0":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroCheque',
                        placeHolder: APP.core.config.Locale.config.lan.Cobranza.numeroCheque,
                        label: 'No. Cheque'
                    },{
                        xtype: 'textfield',
                        name: 'Banco',
                        placeHolder: APP.core.config.Locale.config.lan.Cobranza.cheque,
                        label: 'Banco'
                    }
                ]);
                break;
            case "2":
                view.down('fieldset').add([
                    {
                        xtype: 'numberfield',
                        name: 'NumeroAutorizacion',
                        placeHolder: APP.core.config.Locale.config.lan.Cobranza.noAutorizacion,
                        label: 'No. Autorización'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'NumeroTarjeta',
                        placeHolder: APP.core.config.Locale.config.lan.Cobranza.tarjeta,
                        label: 'No. Tarjeta'
                    }
                ]);
                break;
        }
    },

    /**
     * Responde al evento "tap" del botón "pagar" de "montoapagarform".
     * Valida si todos los campos del formulario vienen llenos.
     * Valida si este tipo de pago permite dar cambio para en su caso permitirlo o no.
     * @param btn Este botón.
     */
    onPagar: function (btn) {        
        var me = this,
            view = btn.up('navigationcobranza'),
            form = view.down('montoapagarform'),
            moneda,
            datos = view.down('formasdepagolist').getSelection()[0].data,
            opcion = me.getMenuNav().down('cobranzalist').getSelection()[0].data.action,
            aPagar = pagado = me.getTotales().down('#aCobrar').getAt(0).getHtml(),
            pagado = me.getTotales().down('#pagado').getAt(0).getHtml(),
            pendiente, 
            forma = datos.Nombre,
            entrada = form.getValues().monto,
            codigo = datos.Codigo,
            tipo = datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.numeroCheque,            
            numeroTarjeta = valores.numeroTarjeta,
            banco = valores.banco,
            numeroAutorizacion = valores.numeroAutorizacion,
            nombres = form.getInnerItems(),            
            permiteCambio = datos.PermiteCambio;

        pagado = APP.core.FormatCurrency.formatCurrencytoNumber(pagado);
        aPagar = APP.core.FormatCurrency.formatCurrencytoNumber(aPagar);
        pendiente = aPagar - pagado;

         if(opcion == 'cobranzaFacturas'){
            moneda = Ext.getStore('Facturas').getAt(0).data.CodigoMoneda + ' '; //Estamos asumiendo que el código de moneda de todas las facturas es la local.
         } else {
            moneda = Ext.getStore('Anticipos').getAt(0).data.CodigoMoneda + ' '; //Ya no, ya se validó, pero la moneda es la misma para todas las facturas o anticipos, por eso se elige la primera.
         }

        Ext.Object.each(valores, function (key, value, myself) { // Validamos que todos los campos estén llenos.            

            if (value === null) { 
                esVacio = true;
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.errorNoNumericoTitulo, APP.core.config.Locale.config.lan.Cobranza.errorNoNumericoMensaje);
                return false; // stop the iteration
            }
        });

        if (esVacio) {
            //me.mandaMensaje('Sin cantidad', 'Ingrese la cantidad a pagar.');
        } else {
            if (permiteCambio === 'false') {
                if (entrada > pendiente) {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.sinCambioTitulo, APP.core.config.Locale.config.lan.Cobranza.sinCambioMensaje);
                } else {                    
                    me.sumaCobros(form, datos, moneda);
                    view.pop(2);
                }
            } else {                
                me.sumaCobros(form, datos, moneda);
                view.pop(2);
            }
        }
    },

    /**
     * Agrega el pago ingresado al store "Totales" o lo modifica si el pago es editado.
     * Suma cada uno de los saldos del store "Totales" y los muestra en "totalescontainer".
     * @param form La forma de pago.
     * @param moneda El código de moneda del pago.
     */
    sumaCobros: function (form, datos, moneda) {
        var me = this,
            forma = datos.Nombre,
            entrada = form.getValues().monto,
            codigo = datos.Codigo,
            tipo = datos.TipoFormaPago,
            esVacio = false,
            valores = form.getValues(),
            numeroCheque = valores.NumeroCheque,
            numeroTarjeta = valores.NumeroTarjeta,
            banco = valores.Banco,
            numeroAutorizacion = valores.NumeroAutorizacion,
            nombres = form.getInnerItems(),            
            permiteCambio = datos.PermiteCambio,
            monto,
            entradaMostrada = APP.core.FormatCurrency.currency(entrada, moneda),
            ind = form.ind,
            store = Ext.getStore('Totales');

        store.add({
            tipo: forma,
            monto: entradaMostrada,
            codigoFormaPago: codigo,
            tipoFormaPago: tipo,
            NumeroCheque: numeroCheque,
            NumeroTarjeta: numeroTarjeta,
            Banco: banco,
            NumeroAutorizacion: numeroAutorizacion,
            moneda: moneda
        });

        monto = APP.core.FormatCurrency.formatCurrencytoNumber(store.getAt(store.getCount() - 1).get('monto'));
        me.actualizaCobranza(moneda, monto);
    },

    /**
    * Actualiza los campos "pagado" y "pendiente" del totalescontainer
    * @moneda El código de moneda que se tiene que mostrar.
    */
    actualizaCobranza: function (moneda, monto){
        var me = this,
            pagado = me.getTotales().down('#pagado').getAt(0).getHtml(),
            aPagar = me.getTotales().down('#aCobrar').getAt(0).getHtml();

        pagado = APP.core.FormatCurrency.formatCurrencytoNumber(pagado);
        aPagar = APP.core.FormatCurrency.formatCurrencytoNumber(aPagar);
        pagado += monto;

        me.getTotales().down('#pagado').setItems({xtype: 'container', html: APP.core.FormatCurrency.currency(pagado, moneda)});
        me.getTotales().down('#pendiente').setItems({xtype: 'container', html: APP.core.FormatCurrency.currency(aPagar - pagado, moneda)});
    },

    /**
     * Valida la vista actual y si es el caso hace visible el botón "Agregar".
     * Setea el título el toolbar.
     * @param navigationview Este navigationview.
     * @param old La vista que ha sido popeada
     */
    onPopNavigationCobranza: function (navigationview, old) {
        var me = this,
            barra = navigationview.getNavigationBar(),

            view = navigationview.getActiveItem();

        if (barra.down('#agregarPago') == null) {
            return;
        } // Para que no se crasheé al dar en botón salir.

        if (view.isXType('totalapagarcontainer')) {
            barra.down('#agregarPago').show();
        }

        barra.setTitle(me.getNavigationCobranza().idCliente);
    },

    /**
     * Termina la cobranza
     */
    onTerminarCobranza: function () {
        var me = this,
            view = me.getMainCard().getActiveItem(),
            idCliente = view.getNavigationBar().getTitle(),
            total = 0,
            store = me.getFacturasList().getStore(),
            totales = view.down('totalapagarlist').getStore(),
            array = store.getData().items,
            fecha = new Date(Ext.Date.now()),
            hora = me.daFormatoAHora(fecha.getHours(), fecha.getMinutes(), fecha.getSeconds()),
            fecha = Ext.Date.format(fecha, "d-m-Y"),            
            url,
            msg = APP.core.config.Locale.config.lan.Cobranza.cobroExitoso;

        //enviandoCobro        
        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.Cobranza.enviandoCobro);
        Ext.Viewport.setMasked(true);
        
        if (totales.getCount() > 0) {

            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Cobranza.Fecha": fecha,
                "Cobranza.Hora": hora,
                "Cobranza.CodigoVendedor": localStorage.getItem("CodigoUsuario"),
                "Cobranza.Tipo": 'C',
                "Cobranza.CodigoCliente": idCliente
            };

            if(me.getNavigationCobranza().opcion == 'anticipo'){
                params["Cobranza.Tipo"] = 'A';
                params["Cobranza.NumeroPedido"] = array[0].data.NumeroDocumento;
                msg = 'Se realizó el anticipo exitosamente con folio ';
            } else {
                Ext.Array.forEach(array, function (item, index, allItems) {
                    params["Cobranza.CobranzaFacturas[" + index + "].NumeroFactura"] = item.data.Folio;
                    params["Cobranza.CobranzaFacturas[" + index + "].Monto"] = item.get('TotalDocumento');
                    params["Cobranza.CobranzaFacturas[" + index + "].NumeroLinea"] = index;
                });
            }

            totales.each(function (item, index) {
                //Limpiamos los valores que no aparecen en todas las formas de pago.
                params["Cobranza.CobranzaDetalles[" + index + "].NumeroLinea"] = index;
                params["Cobranza.CobranzaDetalles[" + index + "].CodigoFormaPago"] = item.data.codigoFormaPago;
                params["Cobranza.CobranzaDetalles[" + index + "].MontoNeto"] = APP.core.FormatCurrency.formatCurrencytoNumber(item.data.monto);

                switch (item.data.tipoFormaPago) {
                    case "0": //Cheque
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroCheque"] = item.data.NumeroCheque;                        
                        params["Cobranza.CobranzaDetalles[" + index + "].Banco"] = item.data.Banco;
                        params["Cobranza.CobranzaDetalles[" + index + "].Fecha"] = fecha;
                        break;

                    case "1": //Transferencia
                        break;
                    case "2": //Tarjeta
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroAutorizacion"] = item.data.NumeroAutorizacion;
                        params["Cobranza.CobranzaDetalles[" + index + "].NumeroTarjeta"] = item.data.NumeroTarjeta; 
                        break;
                }                
            });

            url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Cobranza/AgregarCobranza";
            
            console.log(params);

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {
                        Ext.Viewport.setMasked(false);
                        me.getMainCard().setActiveItem(0);
                        Ext.Msg.alert("Cobro procesado", msg + response.CodigoUnicoDocumento + ".");
                        store.removeAll();
                        totales.removeAll();                        
                        view.remove(view.down('toolbar'), true);
                        me.getMainCard().getActiveItem().pop();
                    } else {
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.cobroNoProcesadoTitulo,
                        APP.core.config.Locale.config.lan.Cobranza.cobroNoProcesadoMensaje + response.Descripcion);
                    }
                }
            });

        } else {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert(APP.core.config.Locale.config.lan.Cobranza.sinPagoTitulo,
            APP.core.config.Locale.config.lan.Cobranza.sinPagoMensaje);
        }        
    },

    /**
    * Regresa la representación en cadena de la hora en formato hh:mm:ss
    * @param horas Las horas.
    * @param minutos Los minutos.
    * @param segundos Los segundos.
    * @return La representación en cadena de la hora en formato hh:mm:ss.
    */
    daFormatoAHora: function(horas, minutos, segundos){
        var me = this,
            hr = me.agregaCero(horas),
            min = me.agregaCero(minutos),
            seg = me.agregaCero(segundos);

        return hr + ':' + min + ':' + seg;
    },

    /*
    * Agrega un cero a la izquierda a números de una sola cifra.
    * @param n El número a evaluar.
    * @return La representación en cadena del resultado de la evaluación.
    */
    agregaCero: function (n){
        var m = (n < 10) ? '0' + n : n;

        return m;
    },

    /*
    * Responde al botón cancelar. Cancela la operación y regresa a la vista anterior.
    * @param btn Éste botón.
    */
    cancelaPago: function (btn) {
        var me = this,
            view = me.getMainCard(),
            navigationCobranza = view.getActiveItem(),
            titulo = navigationCobranza.down('toolbar'),
            totales = Ext.getStore('Totales');        

        navigationCobranza.remove(titulo, true); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.
        totales.removeAll();

        if(me.getNavigationCobranza().opcion == 'anticipo'){
            Ext.getStore('Anticipos').clearFilter();
        } else {
            Ext.getStore('Facturas').clearFilter();
        }

        view.setActiveItem(0);
    },

    /**
    * Agrega el saldo a mostrar a cada una de las facturas.
    * @param facturas El store que representa a las facturas.
    */
    agregaSaldoAMostrar: function (facturas) {
        var me = this,
            moneda,
            saldoMostrado;

        facturas.each(function (item, index, length) {
            moneda = item.get('CodigoMoneda') + ' ';            
            saldoMostrado = APP.core.FormatCurrency.currency(item.get('TotalDocumento'), moneda);
            item.set('saldoAMostrar', saldoMostrado);
        });
    },

    /**
    * Busca la cobranza que le pasan.
    * @param button Éste botón.
    */
    onBuscarCobranza: function (button) {
        var me = this,
            store = Ext.getStore('Transacciones'),
            idCliente = me.getMenuNav().getNavigationBar().getTitle(),
            value = button.up('toolbar').down('#buscarCobranzas').getValue(),
            tipo = button.up('toolbar').down('#buscarTipo').getValue(),
            list = button.up('visualizacioncobranzalist');

            list.setEmptyText(APP.core.config.Locale.config.lan.Cobranza.noCobrosCliente);

        store.resetCurrentPage();
        store.setParams({
            Criterio: value,
            CardCode: idCliente,
            Tipo: tipo
        });

        store.load({
            callback: function(){
                me.recorreVisualizacion (store);
            }
        });
    },

    /**
    * Limpia el searchfield de búsqueda de transacciones.
    * @param searchfield Éste searchfield.
    */
    limpiaBusquedaTransacciones: function (searchfield) {
        var me = this,
            store = me.getVisualizacionCobranzaList().getStore(),
            idCliente = me.getMenuNav().getNavigationBar().getTitle();

        store.resetCurrentPage();        

        if(searchfield.getItemId() == 'buscarCobranzas'){
            store.setParams({
                Criterio: '',
                CardCode: idCliente
            });
        } else {
            store.setParams({
                Tipo: '',
                CardCode: idCliente
            });
        }

        store.load({
            callback: function(){
                me.recorreVisualizacion (store);
            }
        });
    },

    /**
    * Recorre el store de transacciones y por cada una determina cuál poner, Cobranza de factura o Anticipo de pedido.
    * @param store El store de transacciones.
    */
    recorreVisualizacion: function (store){
        var me = this,
            tipo;

        store.each(function (item, index, length) {            
            tipo = item.get('Tipo');            

            item.set('NombreCliente', me.getMenuNav().down('toolbar').getTitle().getTitle());

            if(tipo == 'C'){
                item.set('TipoTransaccion', 'Cobranza de factura');                
            }

            if(tipo == 'A'){
                item.set('TipoTransaccion', 'Anticipo de pedido');                
            }           
        });
    },

    launch: function (){
        var me = this;                
        Ext.getStore('Facturas').on('load', me.agregaSaldoAMostrar);
        Ext.getStore('Anticipos').on('load', me.agregaSaldoAMostrar);
    },

    /**
    * Responde al cambio de opción del selectfield de tipo de transacción.
    * @param t Éste selectfield.
    * @param newValue El nuevo valor.
    * @param oldValue El valor anterior
    * @param eOpts 
    */
    onChangeTipoCobranza: function (t, newValue, oldValue, eOpts) {
        var me = this,
            store = Ext.getStore('Transacciones'),
            idCliente = me.getMenuNav().getNavigationBar().getTitle(),
            value = t.up('toolbar').down('#buscarCobranzas').getValue(),
            tipo = newValue,
            list = t.up('visualizacioncobranzalist');
        //console.log(list);
        //console.log(value);
        list.setEmptyText(APP.core.config.Locale.config.lan.Cobranza.noCobrosCliente);

        store.resetCurrentPage();
        store.setParams({
            Criterio: value,
            CardCode: idCliente,
            Tipo: tipo
        });

        store.load({
            callback: function(){
                me.recorreVisualizacion (store);
            }
        });
    }
});