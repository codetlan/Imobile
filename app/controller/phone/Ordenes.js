/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.controller.phone.Ordenes', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            menuNav: 'menunav',
            mainCard: 'maincard',
            navigationOrden: 'navigationorden',
            partidaContainer: 'partidacontainer',
            productosOrden: 'productosorden',
            ordenContainer: 'ordencontainer',
            opcionesOrden: 'opcionesorden',
            transaccionList: 'transaccionlist'

        },
        control: {
            'container[id=ordenescont] clienteslist': {
                itemsingletap: 'alSelecionarCliente'
            },
            'opcionordeneslist': {
                itemtap: 'onOpcionOrdenes'
            },
            'opcionesorden #eliminar': {
                activate: 'onEliminarOrden'
            },
            'opcionesorden': {
                activeitemchange: 'cambiaItem',
                show: 'onShowMenu'
            },
            'productoslist #btnBuscarProductos': {
                tap: 'onBuscaProductos'
            },
            'productoslist #buscarProductos': {
                clearicontap: 'limpiaBusquedaProductos'
            },
            'navigationorden #agregarProductos': {
                tap: 'onAgregarPartida'
            },
            'navigationorden': {
                pop: 'onPopNavigationOrden'
                //back: 'onBack',
                //push: 'onPushNavigationOrden'
            },
            'agregarproductosform #agregar': {
                tap: 'agregaProductos'
            },
            'agregarproductosform #cantidad': {
                //change: 'actualizaCantidad'
                keyup: 'actualizaCantidadK'
            },
            'agregarproductosform #almacenProducto': {
                focus: 'onListAlmacen'
            },
            'productosorden #listaProductos': {
                tap: 'mostrarListaProductos'
            },
            'productosorden #panelProductos': {
                tap: 'mostrarPanelProductos'
            },
            'productosorden productoslist': {
                itemtap: 'onAgregarProducto'
            },
            'productosorden productosview': {
                itemtap: 'onAgregarProducto'
            },

            'direccioneslist': {
                itemtap: 'muestraDirecciones'
            },
            'ordenlist': {
                itemswipe: 'eliminaPartida',
                itemtap: 'editarPartida'
            },
            'opcionesorden #terminar': {
                activate: 'confirmaTerminarOrden'
            },
            'editarpedidoform #moneda': {
                focus: 'muestraMonedas'
            },
            'tpldirecciones': {
                itemtap: 'seleccionaDireccion'
            },
            'monedaslist': {
                itemtap: 'seleccionaMoneda'
            },
            'transaccionlist': {
                itemtap: 'onSeleccionarTransaccion'
            },
            'transaccionlist #btnBuscarTransaccion': {
                tap: 'onBuscarTransaccion'
            },
            'transaccionlist #buscarTransacciones': {
                clearicontap: 'limpiaBusquedaTransacciones'
            },
            'almacenlist': {
                itemtap: 'onSeleccionarAlmacen'
            },
            'partidacontainer': {
                show: 'onShowListOrden'
            }
        }
    },

    /**
     * Establece el título y el id del cliente cada uno en una variable.
     * Muestra la vista de ventas.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    alSelecionarCliente: function (list, index, target, record) {

        var me = this,
            name = record.get('NombreSocio'),
            idCliente = record.get('CodigoSocio'),
            titulo = name;

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.Ordenes.alSeleccionarClienteCargar);
        Ext.Viewport.setMasked(true);
        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Socio/ObtenerSocioiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: idCliente
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada,
                    clienteSeleccionado = response.Data[0],
                    codigoMonedaCliente = clienteSeleccionado.CodigoMoneda;

                this.getOpcionesOrden().clienteSeleccionado = clienteSeleccionado;

                if (procesada) {
                    this.estableceDirecciones(this.getMenuNav(), titulo, clienteSeleccionado, idCliente);

                    if (codigoMonedaCliente == '##') {
                        this.dameMonedaPredeterminada();
                    } else {
                        var storeMonedas = Ext.getStore('Monedas');
                        storeMonedas.load({
                            callback: function (records, operation) {
                                var monedas = Ext.getStore('Monedas'),
                                    indMoneda = monedas.find('CodigoMoneda', codigoMonedaCliente);

                                me.getOpcionesOrden().codigoMonedaPredeterminada = codigoMonedaCliente + ' ';
                                me.getOpcionesOrden().codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaPredeterminada;
                                me.estableceMonedaPredeterminada(monedas.getAt(indMoneda));

                                me.actualizarTotales();
                            }
                        });
                    }
                } else {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSelecionarCliente, response.Descripcion, Ext.emptyFn);
                }
            },
            scope: this
        });
    },

    /**
     * Establece como predeterminadas las primeras direcciones que encuentra tanto fiscal
     * como de entrega, si este clienteme no tiene dirección fiscal manda un mensaje y no permite avanzar.
     * @param view La vista actual.
     * @param barraTitulo El toolbar para agregar el nombre del cliente.
     */
    estableceDirecciones: function (view, titulo, clienteSeleccionado, idCliente) {
        var me = this,
            menu = me.getMenuNav(),
            direcciones = Ext.getStore('Direcciones');

        direcciones.setData(clienteSeleccionado.Direcciones);
        direcciones.clearFilter();
        direcciones.filter('TipoDireccion', 'S');

        Ext.Viewport.setMasked(false);

        if (direcciones.getCount() > 0) {
            menu.push({
                xtype: 'opcionordeneslist',
                title: idCliente,
                idCliente: idCliente
            });

            menu.add({
                xtype: 'toolbar',
                docked: 'top',
                title: titulo
            });

            me.getOpcionesOrden().direccionEntrega = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion de entrga y se lo asignamos a una propiedad del componente opcionesOrden
            me.getOpcionesOrden().codigoImpuesto = direcciones.getAt(0).data.CodigoImpuesto;
            me.getOpcionesOrden().tasaImpuesto = direcciones.getAt(0).data.Tasa;
            me.getOpcionesOrden().tipoCambio = 1;
            me.getOpcionesOrden().totalDeImpuesto = 0;

            direcciones.getAt(0).set('Predeterminado', true);
            direcciones.clearFilter();
            direcciones.filter('TipoDireccion', 'B');

            if (direcciones.getCount() > 0) {
                me.getOpcionesOrden().direccionFiscal = direcciones.getAt(0).data.CodigoDireccion; // Se obtiene el codigo de la direccion de fiscal y se lo asignamos a una propiedad del componente opcionesOrden
                direcciones.getAt(0).set('Predeterminado', true);
            }

        } else {
            this.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.estableceDireccionesTitle, 
                APP.core.config.Locale.config.lan.Ordenes.estableceDireccionesMsg);
            //view.pop();
            direcciones.removeAll();
        }

    },

    /**
     * Determina qué hacer dependiendo de la opción seleccionada.
     * Orden:
     *   Activa el ítem 2 del menú principal dejando la vista actual en navigationorden (con un sólo ítem, un tabpanel) y establece como activo el ítem 0 de este tabpanel.
     *   Hace aparecer un toolbar con el nombre del cliente.
     *
     * Visualizar:
     *  Muestra la lista de las transacciones realizadas.
     *
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record EL record asociado a este ítem.
     */
    onOpcionOrdenes: function (list, index, target, record) {
        var me = this,
            menuNav = me.getMenuNav(),
            opcionesOrden = me.getOpcionesOrden(),
            opcion = record.get('action'),
            idCliente = menuNav.getNavigationBar().getTitle(), i,
            boton = me.getNavigationOrden().getNavigationBar().down('#agregarProductos'),
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: menuNav.down('toolbar').getTitle()
            });

        switch (opcion) {
            case 'orden':
                var editarPedido = me.getOpcionesOrden().down('#editarPedido'),
                    establecerCampo = opcionesOrden.down('#datos');

                me.getOpcionesOrden().down('#moneda').setDisabled(false);

                opcionesOrden.actionOrden = 'crear';
                //this.getMainCard().getAt(1).setMasked(false);
                boton.setText(APP.core.config.Locale.config.lan.NavigationOrden.agregar);
                this.getMainCard().setActiveItem(1); // Activamos el item 1 del menu principal navigationorden
                this.getNavigationOrden().getNavigationBar().setTitle(idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                this.getOpcionesOrden().setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
//                this.dameMonedaPredeterminada();
                this.getOpcionesOrden().idCliente = idCliente;
                this.getNavigationOrden().add(barraTitulo);

                break;

            case 'visualizar':
                if (menuNav.getActiveItem().xtype == 'transaccionlist') {
                    return;
                }

                opcionesOrden.actionOrden = 'actualizar';
                this.getOpcionesOrden().idCliente = idCliente;

                var store = Ext.getStore('Transacciones'),
                    url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaAbiertaiMobile";

                params = {
                    CardCode: idCliente
                };

                Ext.getStore('Transacciones').resetCurrentPage();
                store.getProxy().setUrl(url);
                store.setParams(params);

                store.load();

                menuNav.push({
                    xtype: 'transaccionlist',
                    title: idCliente
                });

                me.getOpcionesOrden().down('#moneda').setDisabled(true);

                break;
        }
    },

    /**
     * Determina qué hacer al momento de cambiar el ítem del navigationorden:
     *   - Cliente: Obtiene los datos del cliente desde el JSON y llena las direcciones asignando por defecto la primera que aparece.
     * Aparece el botón Back y desaparece Agregar.
     *   - Editar: Establece valores para el formulario de editar pedido aparece el botón Back y desaparece Agregar.
     * @param tabPanel Este TabPanel
     * @param value El nuevo ítem
     * @param oldValue El ítem anterior
     */
    cambiaItem: function (tabPanel, value, oldValue) {
        var me = this,
            view = this.getNavigationOrden(),
            boton = view.getNavigationBar().down('#agregarProductos'),
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            tipoCambio = me.getOpcionesOrden().tipoCambio;

        if (me.getOpcionesOrden().clienteSeleccionado == undefined) {
            return;
        }

        var clienteSeleccionado = new Object({ // Se crea nuevo objeto con los datos numéricos para representarlos en formato de miles.
            LimiteCredito: me.getOpcionesOrden().clienteSeleccionado.LimiteCredito,
            Saldo: me.getOpcionesOrden().clienteSeleccionado.Saldo
        });

        clienteSeleccionado.LimiteCredito = APP.core.FormatCurrency.formatValue(clienteSeleccionado.LimiteCredito);
        clienteSeleccionado.Saldo = APP.core.FormatCurrency.formatValue(clienteSeleccionado.Saldo);

        if (value.xtype == 'clientecontainer') {
            boton.setText('Back').show(); // Disfrazamos de back al botón agregar
            boton.setUi('back'); // Le ponemos el ícono de back

            var form = value.down('clienteform'),
                direcciones = Ext.getStore('Direcciones');

            form.setValues(me.getOpcionesOrden().clienteSeleccionado);
            form.setValues(clienteSeleccionado);
        }

        if (value.xtype == 'editarpedidoform') {
            if (codigoMonedaSeleccionada == codigoMonedaPredeterminada) {
                clienteSeleccionado.tipoCambio = parseFloat(1).toFixed(2);
            } else {
                clienteSeleccionado.tipoCambio = parseFloat(tipoCambio).toFixed(2);
            }

            value.setValues(me.getOpcionesOrden().clienteSeleccionado);
            value.setValues(clienteSeleccionado);
            value.setValues({
                CodigoMoneda: codigoMonedaSeleccionada
            });

            boton.setText('Back').show();
            boton.setUi('back');
        }

        if (value.xtype == 'partidacontainer') {
            boton.setText(APP.core.config.Locale.config.lan.NavigationOrden.agregar).show();
            boton.setUi('normal');
        }
    },

    /**
     * Recorre el store de monedas y obtiene la predeterminada.
     */
    dameMonedaPredeterminada: function () {
        var me = this,
            storeMonedas = Ext.getStore('Monedas');

        storeMonedas.load({
            callback: function (records, operation) {
                Ext.Array.each(records, function (item, index, ItSelf) {
                    var predeterminada = item.get('Predeterminada');
                    if (predeterminada) {
                        me.getOpcionesOrden().codigoMonedaPredeterminada = item.get('CodigoMoneda') + ' ';
                        me.getOpcionesOrden().codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaPredeterminada;
                    }
                });
                me.actualizarTotales();
            }
        });
    },

    /**
    * Actualiza los totales de la lista de productos del pedido.
    */
    actualizarTotales: function () {
        var me = this,
            store = Ext.getStore('Ordenes'),
            precioTotal = 0,
            descuentoTotal = 0,
            total = 0,
            tax = 0,
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada;

        store.each(function (item) {
            precioTotal += APP.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * item.get('cantidad');            
            tax += item.get('totalDeImpuesto');

        });

        this.getOrdenContainer().down('#descuento').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + codigoMonedaSeleccionada + '0.00</div>'}); //Imobile.core.FormatCurrency.currency(importe, '$')
        this.getOrdenContainer().down('#subtotal').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + APP.core.FormatCurrency.currency(parseFloat(precioTotal), codigoMonedaSeleccionada)/*.toFixed(2)*/ + '</div>'});
        this.getOrdenContainer().down('#tax').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + APP.core.FormatCurrency.currency(parseFloat(tax), codigoMonedaSeleccionada) + '</div>'});
        this.getOrdenContainer().down('#total').setItems({xtype: 'container', html: '<div style="top: 6px; position: relative;">' + APP.core.FormatCurrency.currency(parseFloat(precioTotal + tax), codigoMonedaSeleccionada) + '</div>' });
    },


    /**
     * Remueve todos los elementos del store de órdenes si el usuario lo confirma, en caso contrario muestra la vista
     * de la lista  órdenes sin eliminar nada.
     * @param newActiveItem El nuevo ítem activo dentro del contenedor.
     * @param tabPanel Éste tabpanel.
     */
    onEliminarOrden: function (newActiveItem, tabPanel) {
        var me = this,
            ordenes = Ext.getStore('Ordenes'),
            titulo = APP.core.config.Locale.config.lan.Ordenes.onEliminarOrdenTitulo,
            mensaje = APP.core.config.Locale.config.lan.Ordenes.onEliminarOrdenMsg,
            ancho = 300;

        me.confirma(titulo, mensaje, ancho,
            function (buttonId) {
                if (buttonId == 'yes') {
                    var view = me.getMainCard().getActiveItem(),
                        titulo = view.down('toolbar'),
                        name = titulo.getTitle().getTitle();

                    ordenes.removeAll();
                    me.getMainCard().setActiveItem(0);
                    view.remove(titulo, false); // Remueve el título de la vista, si no, al volver a entrar aparecerá sobre el actual.                    
                    me.getMenuNav().remove(me.getMenuNav().down('toolbar'));
                    me.getMenuNav().add(titulo);
                    me.actualizarTotales();

                } else {
                    tabPanel.setActiveItem(0);
                }
            }
        );
    },

    /**
     * Muestra un mensaje de confirmación con dos botones, si y no y ejecuta la función que le pasan.
     * @param titulo El título de la casilla del mensaje.
     * @param mensaje El cuerpo del mensaje.
     * @param ancho El ancho de la casilla del mensaje.
     * @param funcion La función a ejecutar.
     */
    confirma: function (titulo, mensaje, ancho, funcion) {
        Ext.Msg.show({
            title: titulo,
            message: mensaje,
            width: ancho,
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
            fn: funcion
        });
    },

    /**
     * Guarda el código de dirección de la dirección seleccionada, ya sea de entrega o fiscal.
     * @param list Ésta lista
     * @param index El índice de la dirección seleccionada
     * @param target El elemento tapeado
     * @param record El record asociado al ítem.
     */
     seleccionaDireccion:function(list, index, target, record){
        var me = this,
            direcciones = Ext.getStore('Direcciones'),
            entrega = me.getOpcionesOrden().entrega,
            direccionFiscal = me.getOpcionesOrden().direccionFiscal,
            direccionEntrega = me.getOpcionesOrden().direccionEntrega,
            codigoImpuesto = me.getOpcionesOrden().codigoImpuesto,
            tasaImpuesto = me.getOpcionesOrden().tasaImpuesto,
            view = me.getNavigationOrden();

        direcciones.each(function (item, index, length) {
            item.set('Predeterminado', false)
        });

        direcciones.getAt(index).set('Predeterminado', true);

        if (entrega) {
            me.getOpcionesOrden().direccionEntrega = record.data.CodigoDireccion;
            codigoImpuesto = record.data.CodigoImpuesto;
            tasaImpuesto = record.data.Tasa;
        } else {
            me.getOpcionesOrden().direccionFiscal = record.data.CodigoDireccion;
        }
        view.pop();
    },

    /**
     * Muestra la lista de monedas.
     */
    muestraMonedas: function () {
        var me = this,
            view = me.getNavigationOrden();

        view.push({
            xtype: 'monedaslist'
        });

        view.getNavigationBar().down('#agregarProductos').hide()
    },

    /**
     * Al seleccionar la moneda regresa a la vista anterior (editarpedidoform) y setea el codigo de la moneda seleccionada.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    seleccionaMoneda: function (list, index, target, record) {
        var me = this,
            view = me.getNavigationOrden(),
            moneda = record.get('CodigoMoneda') + ' ',
            opcionesOrden = me.getOpcionesOrden(),
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            clienteSeleccionado = opcionesOrden.clienteSeleccionado,
            form = opcionesOrden.down('editarpedidoform');

        if (clienteSeleccionado.CodigoMoneda == '##') {

            if ((codigoMonedaSeleccionada != moneda) && (codigoMonedaSeleccionada == codigoMonedaPredeterminada)) {
                if (me.dameProductoConMonedaPredeterminada(codigoMonedaPredeterminada) != 'No hay') {
                    me.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaError,
                     APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaMsg1 + 
                     me.dameProductoConMonedaPredeterminada() + APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaEs + 
                     codigoMonedaPredeterminada + APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaMsg2);
                } else {
                    me.obtenerTipoCambio(moneda, record);
                }
            } else {

                if (moneda != codigoMonedaSeleccionada) {
                    if (opcionesOrden.tipoCambio == 1) { // Cuando el documento de la orden recuperada viene en USD y se agrega un producto con USD, al realizar cambio de divisa por MPX se precisa el tipo de cambio para actualizar los valores de la orden.
                        me.obtenerTipoCambio(codigoMonedaSeleccionada, record);
                    } else {
                        me.getOpcionesOrden().codigoMonedaSeleccionada = codigoMonedaPredeterminada;
                        codigoMonedaSeleccionada = codigoMonedaPredeterminada;
                        me.actualizaOrden(moneda);
                        //me.tipoCambio = 1;
                        form.setValues({
                            CodigoMoneda: codigoMonedaSeleccionada,
                            tipoCambio: parseFloat(1).toFixed(2)
                        });
                        me.estableceMonedaPredeterminada(record); // Para pintar la palomita.
                    }
                }                
            }
        } else {
            me.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaNoMultimonedaTitle,
             APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaNoMultimonedaMsg1 + 
             clienteSeleccionado.CodigoSocio + APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaNoMultimonedaMsg2 + clienteSeleccionado.CodigoMoneda + '.');
        }

        view.pop();
    },

    /**
     * Obtiene el nombre del primer artículo encontrado cuyo codigo de moneda es la predeterminada.
     * @return El nombre del artículo o 'No hay' si no existe ninguno.
     */
    dameProductoConMonedaPredeterminada: function (codigoMonedaPredeterminada) {
        var me = this, i,
            nombre = 'No hay',
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            ordenes = Ext.getStore('Ordenes');

        for (i = 0; i < ordenes.getCount(); i++) {
            if (ordenes.getAt(i).get('moneda') == codigoMonedaPredeterminada) {
                nombre = ordenes.getAt(i).get('CodigoArticulo');
                break;
            }
        }

        return nombre;
    },

    /**
     * Obtiene el tipo de cambio actual de acuerdo a la moneda que le pasan, este valor lo deja en la propiedad tipoCambio de opcionesOrden.
     * @param moneda La divisa cuyo tipo de cambio se necesita.
     */
    obtenerTipoCambio: function (moneda, record) {
        var me = this,
            form = me.getOpcionesOrden().down('editarpedidoform'),
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            view = me.getNavigationOrden().getActiveItem();

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem('dirIP') + "/iMobile/COK1_CL_Consultas/RegresarTipoCambio",
            params: {
                CodigoUsuario: localStorage.getItem('CodigoUsuario'),
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                Token: localStorage.getItem("Token"),
                Criterio: moneda
            },
            callbackKey: 'callback',
            success: function (response) {
                if (response.Procesada) {
                    me.getOpcionesOrden().tipoCambio = parseFloat(response.Data[0]).toFixed(2);
                    var tipoCambio = me.getOpcionesOrden().tipoCambio;

                    if (view.isXType('agregarproductosform')) {
                        me.ayudaAAgregar(view, 'monedaDiferente');
                        me.ayudaAAgregar(view, 'cantidad'); // Se modifica la cantidad sólo si el tipo de cambio es exitoso.
                    } else {
                        if (record.get('CodigoMoneda') + ' ' == codigoMonedaPredeterminada) { // Si el record es de la moneda predeterminada se pinta 1.00 en el tipo de cambio.
                            me.getOpcionesOrden().codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaPredeterminada;
                            form.setValues({
                                CodigoMoneda: me.getOpcionesOrden().codigoMonedaSeleccionada,
                                tipoCambio: parseFloat(1).toFixed(2)
                            });

                            me.actualizaOrden(record.get('CodigoMoneda') + ' ');

                        } else {
                            me.getOpcionesOrden().codigoMonedaSeleccionada = moneda;
                            form.setValues({
                                CodigoMoneda: moneda,
                                tipoCambio: tipoCambio
                            });

                            me.actualizaOrden(moneda);
                        }

                        me.estableceMonedaPredeterminada(record); // Para pintar la palomita                        
                    }

                } else {
                    var error = response.Descripcion;
                    me.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.seleccionarMonedaError, error);
                }
            }
        });
    },

    /**
     * Establece la moneda seleccionada como predeterminada para visualizarla en la lista de monedas.
     * @param record El record de la moneda seleccionada.
     */
    estableceMonedaPredeterminada: function (record) {
        var store = Ext.getStore('Monedas');

        store.each(function (item, index, length) {
            item.set('Predeterminada', false);
        });
        record.set('Predeterminada', true);
    },

    /**
     * Actualiza los valores de cada una de las partidas respecto al tipo de cambio realizado.
     * @param moneda La moneda seleccionada.
     */
    actualizaOrden: function (moneda) {
        var me = this, precio, importe,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,        
            ordenes = Ext.getStore('Ordenes');

        if (moneda == codigoMonedaPredeterminada) {
            ordenes.each(function (item, index, length) {
                if (item.get('esOrdenRecuperada')) {
                    tipoCambio = item.get('TipoCambio');
                } else {
                    tipoCambio = me.getOpcionesOrden().tipoCambio;
                }

                precio = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) * tipoCambio;
                importe = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('importe')) * tipoCambio;
                precio = APP.core.FormatCurrency.currency(precio, moneda);
                importe = APP.core.FormatCurrency.currency(importe, moneda);

                item.set('precioConDescuento', precio);
                item.set('importe', importe);
                item.set('totalDeImpuesto', item.get('totalDeImpuesto') * tipoCambio);
            });
            me.actualizarTotales();

        } else {
            ordenes.each(function (item, index, length) {
                if (item.get('esOrdenRecuperada')) {
                    tipoCambio = item.get('TipoCambio');
                } else {
                    tipoCambio = me.getOpcionesOrden().tipoCambio;
                }
                precio = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')) / tipoCambio;
                importe = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('importe')) / tipoCambio;
                precio = APP.core.FormatCurrency.currency(precio, moneda);
                importe = APP.core.FormatCurrency.currency(importe, moneda);

                item.set('precioConDescuento', precio);
                item.set('importe', importe);
                item.set('totalDeImpuesto', item.get('totalDeImpuesto') / tipoCambio);
            });
            me.actualizarTotales();
        }
    },

    /**
     * Elimina la partida seleccionada del store de órdenes.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    eliminaPartida: function (list, index, target, record) {
        var me = this,
            ordenes = Ext.getStore('Ordenes'),
            titulo = APP.core.config.Locale.config.lan.Ordenes.eliminarPartidaTitulo,
            mensaje = APP.core.config.Locale.config.lan.Ordenes.eliminarPartidaMsg,
            ancho = 300;

        me.confirma(titulo, mensaje, ancho,
            function (buttonId) {
                if (buttonId == 'yes') {
                    var ind = ordenes.find('id', record.data.id);
                    ordenes.removeAt(ind);

                    me.actualizarTotales();
                }
            }
        );
    },

    /**
     * Muestra la lista de direcciones según se haya elegido, fiscal o de entrega.
     * @param list Ésta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    muestraDirecciones: function (list, index, target, record) {
        var me = this,
            view = me.getNavigationOrden(),
            direcciones = Ext.getStore('Direcciones');

        direcciones.clearFilter();

        if (record.data.action == 'entrega') {
            direcciones.filter('TipoDireccion', 'S');
            me.getOpcionesOrden().entrega = true;
        } else {
            direcciones.filter('TipoDireccion', 'B');
            me.getOpcionesOrden().entrega = false;
        }

        view.push({
            xtype: 'tpldirecciones'
        });

        view.getNavigationBar().down('#agregarProductos').hide();
    },

    /**
     * Muestra la lista de productos.
     */
    mostrarListaProductos: function () {
        var me = this,
            productos = Ext.getStore('Productos'),
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle();

        productos.clearFilter();
        productos.resetCurrentPage();

        productos.setParams({
            CardCode: idCliente,
            Criterio: ""
        });

        productos.load();

        me.getProductosOrden().setItems({xtype: 'productoslist'});
    },


    /**
     * Muestra el panel de productos.
     */
    mostrarPanelProductos: function () {
        var me = this,
            productos = Ext.getStore('Productos');

        me.lista(true);

        me.getProductosOrden().setItems({xtype: 'productosview'});

        setTimeout(function () { //Función para esperar algunos milisegundos y se pinten de colores los cuadros
            productos.each(function (item, index, length) {
                item.set('color', me.dameColorAleatorio());
            })
        }, 100)
    },

    /**
    * Obtiene un número aleatorio entre inferior y superior.
    * @param inferior El límite inferior.
    * @param superior El límite superior.
    * @return El número aleatorio obtenido.
    */
    aleatorio: function (inferior, superior) {
        var numPosibilidades = superior - inferior,
            aleat = Math.random() * numPosibilidades,
            aleat = Math.floor(aleat);

        return parseInt(inferior) + aleat;
    },

    /**
    * Obtiene la representación Hexadecimal de un color de manera aleatoria.
    * @return La representación Hexadecimal del color obtenido.
    */
    dameColorAleatorio: function () {
        var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"),
            color_aleatorio = "#",
            posarray;

        for (i = 0; i < 6; i++) {
            posarray = this.aleatorio(0, hexadecimal.length)
            color_aleatorio += hexadecimal[posarray]
        }
        return color_aleatorio
    },


    /**
     * Agrega el producto a la orden
     * @btn Este botón
     */
    agregaProductos: function (btn) {
        var form, values, descripcion, cantidad, ordenes,
            me = this,
            ordenes = Ext.getStore('Ordenes'),
            productos = Ext.getStore('Productos'),
            menu = me.getNavigationOrden(),     //NavigationOrden
            form = btn.up('agregarproductosform'),
            values = form.getValues(),
            descripcion = values.NombreArticulo,
            cantidad = values.cantidad,
            moneda = values.moneda,
            importe = values.importe,
            modo = me.getOpcionesOrden().modoForm,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada;

        Ext.getStore('Productos').resetCurrentPage();
//        if (Ext.isEmpty(descripcion) || Ext.isEmpty(cantidad)) {
        if (cantidad <= 0 || Ext.isEmpty(cantidad)) {
            me.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.agregarProductosCamposInvalidosTitle,
             APP.core.config.Locale.config.lan.Ordenes.agregarProductosCamposInvalidosMsg);
        } else {
            if (modo != 'edicion') {
                if (moneda != codigoMonedaSeleccionada) {
                    if (moneda == codigoMonedaPredeterminada) {
                        me.mandaMensaje(APP.core.config.Locale.config.lan.Ordenes.agregaProductosImposibleAgregarTitle,
                        APP.core.config.Locale.config.lan.Ordenes.agregaProductosImposibleAgregarMsg1 + 
                        codigoMonedaSeleccionada + APP.core.config.Locale.config.lan.Ordenes.agregaProductosImposibleAgregarMsg2 + moneda + '.');
                    } else {
                        me.obtenerTipoCambio(moneda); // Aquí esperamos a que obtenga el tipo de cambio y realizamos el cálculo del nuevo precio.
                    }
                } else {
                    me.ayudaAAgregar(form, 'cantidad');
                    me.ayudaAAgregar(form, 'monedaIgual');
                }
            } else {
                me.ayudaAAgregar(form, 'edicion');
            }
        }
    },

    /**
     * Función auxiliar para agregar los productos a la orden, en sí ésta hace toda la chamba de acuerdo al flujo en turno.
     */

    ayudaAAgregar: function (form, caso) {
        var values, descripcion, cantidad, ordenes, indPro, productoAgregado, cantidadActual, precio,
            me = this,
            ordenes = Ext.getStore('Ordenes'),
            productos = Ext.getStore('Productos'),
            menu = me.getNavigationOrden(),     //NavigationOrden
            values = form.getValues(),
            descripcion = values.NombreArticulo,
            cantidad = values.cantidad,
            moneda = values.moneda,
            codigo = values.CodigoArticulo,
            importe = values.importe,
            indPro = productos.find('CodigoArticulo', codigo),
            productoAgregado = productos.getAt(indPro),
            totalDeImpuesto = me.getOpcionesOrden().totalDeImpuesto,
            tipoCambio = me.getOpcionesOrden().tipoCambio,
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada;

        switch (caso) {
            case 'monedaIgual':
                values.totalDeImpuesto = totalDeImpuesto;
                values.Imagen = productoAgregado.get('Imagen');
                values.nombreMostrado = Ext.String.ellipsis(descripcion, 25, false);
                values.SujetoImpuesto = me.getOpcionesOrden().sujetoImpuesto;
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'monedaDiferente':
                precio = APP.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) * tipoCambio;
                values.importe = precio * cantidad;
                precio = APP.core.FormatCurrency.currency(precio, codigoMonedaSeleccionada);
                values.precioConDescuento = precio;
                values.importe = APP.core.FormatCurrency.currency(values.importe, codigoMonedaSeleccionada);
                values.totalDeImpuesto = totalDeImpuesto * tipoCambio;
                values.SujetoImpuesto = me.getOpcionesOrden().sujetoImpuesto;
                //values.descuento = values.descuento;
                values.Imagen = productoAgregado.get('Imagen');
                values.nombreMostrado = Ext.String.ellipsis(descripcion, 25, false);
                values.TipoCambio = tipoCambio;
                ordenes.add(values);
                menu.pop();
                me.actualizarTotales();
                break;

            case 'edicion':
                var ind = me.getOpcionesOrden().ind,
                    datosProducto = ordenes.getAt(ind),
                    totaldeimpuesto,
                    moneda = values.moneda;

                if (moneda != codigoMonedaSeleccionada) {
                    precio = APP.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) * datosProducto.get('TipoCambio');
                    importe = precio * cantidad;
                    precio = APP.core.FormatCurrency.currency(precio, codigoMonedaSeleccionada);
                    importe = APP.core.FormatCurrency.currency(importe, codigoMonedaSeleccionada);
                    totaldeimpuesto = totalDeImpuesto * tipoCambio;//totalDeImpuesto * datosProducto.get('TipoCambio');
                    datosProducto.set('precioConDescuento', precio);
                    datosProducto.set('cantidad', cantidad);
                    datosProducto.set('importe', importe);
                    datosProducto.set('totalDeImpuesto', /*Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$')*/ totaldeimpuesto);
                    //datosProducto.set('Imagen', cantidadProducto.get('Imagen'));
                    menu.pop();
                    me.actualizarTotales();
                } else {
                    datosProducto.set('cantidad', cantidad);
                    datosProducto.set('importe', importe);
                    datosProducto.set('totalDeImpuesto', /*Imobile.core.FormatCurrency.currency(me.totalDeImpuesto, '$')*/ totalDeImpuesto);
                    //datosProducto.set('Imagen', cantidadProducto.get('Imagen'));
                    menu.pop();
                    me.actualizarTotales();
                }
                break;

            case 'cantidad':
                var codigo = values.CodigoArticulo;
                indPro = productos.find('CodigoArticulo', codigo),
                    productoAgregado = productos.getAt(indPro),
                    cantidadActual = productoAgregado.get('cantidad');

                productoAgregado.set('cantidad', cantidadActual + cantidad);
                break;
        }
    },

    /**
     * Obtiene desde el backend la lista de clientes.
     */
    muestraClientes: function () {
        var clientes = Ext.getStore('Clientes');

        clientes.resetCurrentPage();
        clientes.clearFilter();
        clientes.load();
    },

    /**
     * Muestra la lista de órdenes.
     */
    muestralistaOrden: function () {
        Ext.getStore('Ordenes').load();
    },

    /**
    * Busca el producto que le pasan al selectfield asociado.
    * @param t Éste botón
    */
    onBuscaProductos: function (t) {
        var me = this,
            store = Ext.getStore('Productos'),
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle(),
            value = t.up('toolbar').down('#buscarProductos').getValue();


        store.resetCurrentPage();

        store.setParams({
            Criterio: value,
            CardCode: idCliente
        });

        store.load();
    },

    /**
    * Limpia el textfield de la búsqueda de productos.
    * @param t Éste botón.
    */
    limpiaBusquedaProductos: function (t) {
        var me = this,
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle(),
            store = Ext.getStore('Productos');

        store.resetCurrentPage();

        store.setParams({
            Criterio: '',
            CardCode: idCliente
        });

        store.load();
    },

    /**
     * Filtra el store de productos por la variable DesplegarEnPanel.
     * @param desplegarEnPanel Variable booleana para indicar si se despliega en panel (true) o no (false).
     */
    lista: function (desplegarEnPanel) {
        var productos = Ext.getStore('Productos'),
            me = this;

        productos.clearFilter(); //Para limpiar todos los filtros por si tiene alguno el store
        productos.filter('DesplegarEnPanel', desplegarEnPanel);
    },

    /**
     * Muestra un mensaje al ususario con un alert.
     * @param titulo El título del alert.
     * @param mensaje El mensaje a mostrar.
     */
    mandaMensaje: function (titulo, mensaje) {
        Ext.Msg.alert(titulo, mensaje);
    },

    /**
     * Muestra el formulario para agregar un producto a la orden.
     * @param list Esta lista, productoslist.
     * @param index El índice del item tapeado.
     * @param target El elemento o DataItem tapeado.
     * @param record El record asociado al ítem.
     */
    onAgregarProducto: function (list, index, target, record, e) {
        var me = this,
            productos = Ext.getStore('Productos'),
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle(),
            valores = record.data;

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Articulo/ObtenerArticuloiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                CardCode: idCliente,
                Criterio: valores.CodigoArticulo
            },
            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada;

                if (procesada) {
                    var ind = productos.find('CodigoArticulo', valores.CodigoArticulo),
                        productoSeleccionado = productos.getAt(ind);

                    productoSeleccionado.set(response.Data[0]);

                    me.llenaAgregarProductos(response.Data[0]); 
                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSelecionarCliente, response.Descripcion, Ext.emptyFn);
                }
            }
        });
    },

    /**
     * Establece los valores del agregarproductosform
     * @param valores Los valores para el formulario.
     */
    llenaAgregarProductos: function (valores) {
        var me = this,
            view = me.getNavigationOrden(),
            idCliente = view.getNavigationBar().getTitle(),
            almacenes = me.getMenuNav().almacenes,//localStorage.getItem("Almacenes"),
            precio,
            form,
            cantidad,
            valoresForm,
            desc,
            preciocondescuento,
            importe,
            codigoAlmacen,
            sujetoImpuesto = me.getOpcionesOrden().sujetoImpuesto,
            totalDeImPuesto = me.getOpcionesOrden().totalDeImpuesto,
            tasaImpuesto = me.getOpcionesOrden().tasaImpuesto,
            moneda = valores.ListaPrecios[0].CodigoMoneda + ' ';
        
        valores.Disponible = APP.core.FormatCurrency.formatValue(valores.Disponible);

        if (view.getActiveItem().xtype == 'agregarproductosform') {
            return;
        }

        view.push({
            xtype: 'agregarproductosform',
            title: idCliente
        });

        me.getOpcionesOrden().modoForm = 'agregar';

        Ext.Array.forEach(almacenes, function (item, index) {
            var predeterminado = item.Predeterminado;

            if (predeterminado) {
                valores.NombreAlmacen = item.NombreAlmacen;
                codigoAlmacen = item.CodigoAlmacen;
            }
        });

        form = view.getActiveItem();

        form.setValues(valores);

        //Se establece el valor de cantidad, precio y moneda
        precio = APP.core.FormatCurrency.currency(valores.ListaPrecios[0].Precio, moneda);
        cantidad = 1;

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.ClientesList.cargando);
        Ext.Viewport.setMasked(true);

        
        //Se calcula descuento
        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Consultas/ObtenerPrecioEspecialiMobile",

            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                ItemCode: valores.CodigoArticulo,
                CardCode: idCliente,
                ListaPrecio: valores.ListaPrecios[0].CodigoLista,
                Cantidad: cantidad
            },

            callbackKey: 'callback',
            success: function (response) {
                var procesada = response.Procesada,
                    precio2 = APP.core.FormatCurrency.formatCurrencytoNumber(precio);

                if (precio2 == 0) {
                    desc = 0;
                } else {
                    desc = (precio2 - response.Data[0]).toFixed(2);
                    //
                    desc = (desc * 100 / precio2);
                    //
                }

                if (procesada) {

                    //Se establece precio con descuento
                    preciocondescuento = response.Data[0];
                    me.getOpcionesOrden().sujetoImpuesto = valores.SujetoImpuesto;
                    sujetoImpuesto = me.getOpcionesOrden().sujetoImpuesto;
                    //Se valida si el producto es sujeto de impuesto
                    if (sujetoImpuesto) {
                        //Se calcula total de impuesto
                        me.getOpcionesOrden().totalDeImpuesto = preciocondescuento * tasaImpuesto / 100;
                    } else {
                        me.getOpcionesOrden().totalDeImpuesto = 0;
                    }

                    //Se calcula importe
                    importe = preciocondescuento * cantidad;

                    // Se establecen los valores al formulario
                    form.setValues({
                        Precio: precio,
                        cantidad: cantidad,
                        moneda: moneda,
                        PorcentajeDescuento: desc + '%',
                        importe: APP.core.FormatCurrency.currency(importe, moneda),
                        precioConDescuento: APP.core.FormatCurrency.currency(preciocondescuento, moneda),
                        CodigoAlmacen: codigoAlmacen
                    });

                    form.getValues();

                    me.actualizaCantidad(cantidad);

                } else {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.alSelecionarCliente, response.Descripcion, Ext.emptyFn);
                }
                Ext.Viewport.setMasked(false);
            }
        });
    },

    /**
     * Muestra el formulario para editar un producto (agregarproductosform).
     * @param list Ësta lista.
     * @param index El índice del ítem tapeado.
     * @param target El elemento tapeado.
     * @param record El record asociado al ítem.
     */
    editarPartida: function (list, index, target, record) {
        var me = this,
            view = me.getNavigationOrden(),
            form,
            field,
            valuesForm,
            values = record.data,
            id = record.data.id,
            ordenes = Ext.getStore('Ordenes'),
            ind = ordenes.find('id', id),
            idCliente = view.getNavigationBar().getTitle(),
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada;

        me.getOpcionesOrden().sujetoImpuesto = values.SujetoImpuesto;

        if (view.getActiveItem().xtype == 'agregarproductosform') {
            return;
        }

        view.push({
            xtype: 'agregarproductosform',
            title: idCliente
        });

        me.getOpcionesOrden().modoForm = 'edicion'; // Para visualizar el modo del form, edición o agregar.
        me.getOpcionesOrden().ind = ind; // Para guardar el índice de la orden que se va a editar.
        form = view.getActiveItem();
        field = form.down('fieldset');

        field.setTitle('Editar producto');
        //field.down('#descripcion').setDisabled(true);
        view.getNavigationBar().down('#agregarProductos').hide();

        if (values.moneda != codigoMonedaSeleccionada) {
            valuesForm = me.ponValoresOriginalesAAgregarProductoForm(values); // Por si la moneda del producto es diferente a la del documento.
            form.setValues(valuesForm);
            form.setValues({
                importe: valuesForm.importe
            });
        } else {
            var precio = APP.core.FormatCurrency.formatCurrencytoNumber(values.Precio);
            values.Precio = APP.core.FormatCurrency.currency(precio, codigoMonedaSeleccionada);

            form.setValues(values);
        }
        //form.setValues(values);
    },

    /**
     * Establece los valores originales a agregarproductosform, esta funcion se llama cuando la moneda del documento es distinta a la
     * moneda del producto.
     * @param values Los valores a cambiar en el form.
     * @return Un nuevo objeto con los nuevos valores
     */
    ponValoresOriginalesAAgregarProductoForm: function (values) {
        var me = this,
            precio, importe, newObject, totaldeimpuesto, precioConDescuento, descuento,
            moneda = values.moneda,
            tipoCambio = me.getOpcionesOrden().tipoCambio,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada,

            newObject = {
                Precio: values.Precio,
                importe: values.importe,
                totalDeImpuesto: values.totalDeImpuesto,
                CodigoArticulo: values.CodigoArticulo,
                CodigoSocio: values.CodigoSocio,
                Disponible: values.Disponible,
                Imagen: values.Imagen,
                NombreAlmacen: values.NombreAlmacen,
                CodigoAlmacen: values.CodigoAlmacen,
                NombreArticulo: values.NombreArticulo,
                cantidad: values.cantidad,
                PorcentajeDescuento: values.PorcentajeDescuento,
                id: values.id,
                moneda: values.moneda,
                precioConDescuento: values.precioConDescuento
            };

        if (!values.esOrdenRecuperada) {
            if (moneda != codigoMonedaPredeterminada && codigoMonedaSeleccionada == codigoMonedaPredeterminada) {
                descuento = APP.core.FormatCurrency.formatCurrencytoNumber(values.PorcentajeDescuento);
                precio = APP.core.FormatCurrency.formatCurrencytoNumber(values.Precio);

                importe = APP.core.FormatCurrency.formatCurrencytoNumber(values.importe) / tipoCambio;//values.TipoCambio;
                precioConDescuento = APP.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) / tipoCambio; // values.TipoCambio;

                newObject.totalDeImpuesto = newObject.totalDeImpuesto / tipoCambio; //values.TipoCambio;
                //
            }
        } else {
            precio = APP.core.FormatCurrency.formatCurrencytoNumber(values.Precio);
            precioConDescuento = APP.core.FormatCurrency.formatCurrencytoNumber(values.precioConDescuento) / tipoCambio; //values.TipoCambio;
            importe = APP.core.FormatCurrency.formatCurrencytoNumber(values.importe) / tipoCambio; //values.TipoCambio; //precioConDescuento * values.cantidad; 
            
            newObject.precioConDescuento = APP.core.FormatCurrency.currency(precioConDescuento, moneda);
        }

        totalDeImpuesto = values.totalDeImpuesto;
        newObject.importe = APP.core.FormatCurrency.currency(importe, moneda);
        newObject.Precio = APP.core.FormatCurrency.currency(precio, moneda);
        newObject.precioConDescuento = APP.core.FormatCurrency.currency(precioConDescuento, moneda);

        return newObject;
    },

    /**
     * Actualiza el valor del importe al modificarse la cantidad
     * @param numberField Éste NumberField
     * @param newValue El nuevo valor
     * @param oldValue El valor original
     */
    actualizaCantidad: function (newValue) {
        var me = this,
            view = me.getNavigationOrden(),
            valoresForm = view.getActiveItem().getValues(),
            preciocondescuento = APP.core.FormatCurrency.formatCurrencytoNumber(valoresForm.precioConDescuento) * newValue,
            importe = preciocondescuento,
            sujetoImpuesto = me.getOpcionesOrden().sujetoImpuesto,
            totalDeImpuesto = me.getOpcionesOrden().totalDeImpuesto;

        if (sujetoImpuesto) {
            me.getOpcionesOrden().totalDeImpuesto = preciocondescuento * me.getOpcionesOrden().tasaImpuesto / 100;
        }

        view.getActiveItem().setValues({
            importe: APP.core.FormatCurrency.currency(importe, valoresForm.moneda)
        });
    },

    /**
     * Manda llamar al método actualizaCantidad previa validación del valor que se le ingresa al numberfield.
     * Si el valor empieza con un punto (.) se le agrega un cero (0) al principio, si es cero, se limpia el campo.
     */
    actualizaCantidadK: function (numberfield) {
        var me = this,
            valor = numberfield.getValue();

        me.actualizaCantidad(valor);
    },

    /**
     * Determina la siguiente vista productosorden o partidacontainer dependiendo del ítem activo, si no está en
     * partidacontainer este boton dice "Back".
     * @param button Este botón.
     */
    onAgregarPartida: function (button) {
        var me = this,
            view = me.getNavigationOrden(),
            itemActivo = me.getOpcionesOrden().getActiveItem(),
            idCliente = view.getNavigationBar().getTitle(),
            store = Ext.getStore('Productos');

        if (itemActivo.isXType('partidacontainer')) {

            store.resetCurrentPage();

            store.setParams({
                CardCode: idCliente,
                Criterio: ""
            });
            store.load();            
            view.push({
                xtype: 'productosorden',
                title: idCliente
            });            

            view.getNavigationBar().down('#agregarProductos').hide()
        } else {
            view.getActiveItem().setActiveItem(0);
        }
    },

    /**
     * Le establece la cantidad a cada uno de los elementos del store de productos, esto sucede al refrescar el store
     * pues desde el backend no traen cantidad.
     * @param productos El store de datos.
     * @param data La colección de records.
     */
    estableceCantidadAProductos: function (productos) {
        var ordenes = Ext.getStore('Ordenes'),
            codigo,
            ind,
            cantidadActual,
            cantidad;

        if (ordenes.getCount() > 0) {
            ordenes.each(function (item, index, length) {
                codigo = item.get('CodigoArticulo');
                cantidad = item.get('cantidad');
                ind = productos.find('CodigoArticulo', codigo);
                if (ind != -1) { // Validamos que el elemento de la orden esté en los elementos actuales del store.
                    cantidadActual = productos.getAt(ind).get('cantidad');
                    productos.getAt(ind).set('cantidad', cantidadActual + cantidad);
                }
            });
        }
    },

    /**
     * Al dispararse el evento pop de navigationorden muestra el botón agregarProductos si el ítem activo es
     * clientecontainer o editarpedidoform, esto sucede cuando se selecciona la moneda o la dirección.
     * @param t Éste navigationview.
     * @param v La vista que ha sido popeada.
     */
    onPopNavigationOrden: function (t, v) {
        if (this.getOpcionesOrden() == undefined) {
            return;
        }

        var me = this,
            tabPanel = me.getOpcionesOrden(),
            itemActivo = t.getActiveItem().getActiveItem(),
            idCliente = tabPanel.idCliente,
            store = Ext.getStore('Ordenes');

        if (itemActivo.isXType('partidacontainer') || itemActivo.isXType('clientecontainer') || itemActivo.isXType('editarpedidoform')) {            
            t.getNavigationBar().down('#agregarProductos').show();
            t.getNavigationBar().setTitle(idCliente);
        }
    },

    /**
     * Confirma si se desea terminar la orden de venta.
     */
    confirmaTerminarOrden: function (newActiveItem, t, oldActiveItem, eOpts) {
        var me = this,
            opcionesOrden = me.getOpcionesOrden(),
            titulo,
            mensaje,
            ancho = 300;

        if (opcionesOrden.actionOrden == 'crear') {
            titulo = APP.core.config.Locale.config.lan.Ordenes.confirmaTerminarOrdenTitulo;
            mensaje = APP.core.config.Locale.config.lan.Ordenes.confirmaTerminarOrdenMsg;

        } else {
            titulo = APP.core.config.Locale.config.lan.Ordenes.confirmaActualizarOrdenTitulo;
            mensaje = APP.core.config.Locale.config.lan.Ordenes.confirmaActualizarOrdenMsg;
        }

        me.confirma(titulo, mensaje, ancho,
            function (buttonId) {
                if (buttonId == 'yes') {
                    me.onTerminarOrden();
                } else {
                    me.getOpcionesOrden().setActiveItem(0);
                }
            }
        );
    },

    /**
     * Termina la orden del pedido.
     */
    onTerminarOrden: function () {
        var me = this,
            opcionesOrden = me.getOpcionesOrden(),
            total = 0,
            store = Ext.getStore('Ordenes'),
            array = store.getData().items,
            url, msg,
            clienteSeleccionado = me.getOpcionesOrden().clienteSeleccionado,
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle(),
            titulo = me.getNavigationOrden().down('toolbar').getTitle().getTitle(),
            codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            codigoImpuesto = me.getOpcionesOrden().codigoImpuesto,
            direccionEntrega = me.getOpcionesOrden().direccionEntrega,
            direccionFiscal = me.getOpcionesOrden().direccionFiscal,
            tipoCambio = me.getOpcionesOrden().tipoCambio;

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.Ordenes.enviandoOrden);
        Ext.Viewport.setMasked(true);

        if (array.length > 0) {
            var params = {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                "Orden.CodigoSocio": idCliente,
                "Orden.NombreSocio": titulo,
                "Orden.FechaCreacion": Ext.DateExtras.dateFormat(new Date(), 'Y-m-d'),
                "Orden.FechaEntrega": Ext.DateExtras.dateFormat(new Date(), 'Y-m-d'),
                "Orden.CodigoMoneda": codigoMonedaSeleccionada.trim(),
                "Orden.CodigoImpuesto": codigoImpuesto,
                "Orden.RFCSocio": clienteSeleccionado.RFC,
                "Orden.DireccionEntrega": direccionEntrega,
                "Orden.DireccionFiscal": direccionFiscal,
                "Orden.TipoCambio": tipoCambio
            };

            Ext.Array.forEach(array, function (item, index, allItems) {
                var moneda = item.get('moneda'),
                    precio = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('Precio')),
                    precioConDescuento = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('precioConDescuento')),
                    importe;

                if (moneda != codigoMonedaSeleccionada) { // Si la moneda del artículo es diferente a la predeterminada hay que hacer una conversión.                    
                    precio *= tipoCambio;
                    moneda = codigoMonedaSeleccionada;                    
                }

                importe = precioConDescuento * item.get('cantidad');
                total += precioConDescuento * item.get('cantidad') + item.get('totalDeImpuesto');

                params["Orden.Partidas[" + index + "].CodigoArticulo"] = item.get('CodigoArticulo');
                params["Orden.Partidas[" + index + "].NombreArticulo"] = item.get('NombreArticulo');
                params["Orden.Partidas[" + index + "].Cantidad"] = item.get('cantidad');
                params["Orden.Partidas[" + index + "].Precio"] = precio;
                params["Orden.Partidas[" + index + "].CodigoAlmacen"] = item.get('CodigoAlmacen');
                params["Orden.Partidas[" + index + "].Linea"] = index;
                params["Orden.Partidas[" + index + "].Moneda"] = moneda.trim();
                params["Orden.Partidas[" + index + "].Importe"] = parseFloat(importe.toFixed(2));
                params["Orden.Partidas[" + index + "].PorcentajeDescuento"] = APP.core.FormatCurrency.formatCurrencytoNumber(item.get('PorcentajeDescuento'));
            });

            params["Orden.TotalDocumento"] = parseFloat(total.toFixed(2));

            if (opcionesOrden.actionOrden == 'crear') {
                url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_OrdenVenta/AgregarOrdenMobile";
                msg = APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenAgregar;
            } else {
                params["Orden.NumeroDocumento"] = me.getOpcionesOrden().NumeroDocumento;
                url = "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_OrdenVenta/ActualizarOrdenVentaiMobile";
                msg = APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenActualizar;
            }

            //console.log(params);

            Ext.data.JsonP.request({
                url: url,
                params: params,
                callbackKey: 'callback',
                success: function (response) {
                    if (response.Procesada) {                        
                        Ext.Viewport.setMasked(false);
                        me.getMainCard().setActiveItem(0);
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenProcesada, msg + response.CodigoUnicoDocumento);
                        store.clearData();
                        me.getNavigationOrden().remove(me.getNavigationOrden().down('toolbar'), true);
                        me.getMenuNav().remove(me.getMenuNav().down('toolbar'), true);

                        if (opcionesOrden.actionOrden == 'crear') {
                            me.getMainCard().getActiveItem().pop();
                        } else {
                            me.getMainCard().getActiveItem().pop(2);
                        }

                    } else {                        
                        Ext.Viewport.setMasked(false);
                        Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenNoProcesadaTitle, 
                            APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenNoProcesadaMsg + response.Descripcion);
                        me.getOpcionesOrden().setActiveItem(0);
                    }
                },

                failure: function () {
                    Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenFalloTitle, 
                        APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenFalloMsg, function () {                        
                        Ext.Viewport.setMasked(false);
                        me.getOpcionesOrden().setActiveItem(0);
                    });
                }
            });
        } else {            
            Ext.Viewport.setMasked(false);
            setTimeout(function(){
                me.getOpcionesOrden().setActiveItem(0);
                Ext.Msg.alert(APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenSinProductosTitle, APP.core.config.Locale.config.lan.Ordenes.onTerminarOrdenSinProductosMsg);
            }, 10)
        }
    },

    /**
    * Responde al seleccionar una transacción de la lista de transacciones.
    * Recupera la orden de venta asociada a la transacción elegida.
    * @param t Éste list
    * @param index El índice asociado al ítem.
    * @param target El elemento o DataItem tapeado.
    * @param record El record asociado al ítem.
    */
    onSeleccionarTransaccion: function (t, index, target, record) {
        var me = this,
            view = me.getMenuNav(),
            codigoMonedaSeleccionada,
            codigoMonedaPredeterminada = me.getOpcionesOrden().codigoMonedaPredeterminada,
            idCliente = me.getMenuNav().getNavigationBar().getTitle(),
            store = Ext.getStore('Ordenes'),
            productos = Ext.getStore('Productos'),
            boton = me.getNavigationOrden().getNavigationBar().down('#agregarProductos'),
            index,
            barraTitulo = ({
                xtype: 'toolbar',
                docked: 'top',
                title: 'titulo'
            });

        Ext.Viewport.getMasked().setMessage(APP.core.config.Locale.config.lan.ClientesList.cargando);
        Ext.Viewport.setMasked(true);

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Consultas/RegresarOrdenVentaiMobile",
            params: {
                CodigoUsuario: localStorage.getItem("CodigoUsuario"),
                CodigoSociedad: localStorage.getItem("CodigoSociedad"),
                CodigoDispositivo: localStorage.getItem("CodigoDispositivo"),
                Token: localStorage.getItem("Token"),
                Criterio: record.get('NumeroDocumento')
            },
            callbackKey: 'callback',
            success: function (response) {
                var response = response.Data[0],
                    partidas = response.Partidas;

                Ext.Viewport.setMasked(false);
                me.getOpcionesOrden().codigoMonedaSeleccionada = response.CodigoMoneda + ' ';
                codigoMonedaSeleccionada = me.getOpcionesOrden().codigoMonedaSeleccionada;
                me.getOpcionesOrden().NumeroDocumento = record.get('NumeroDocumento');

                for (index = 0; index < partidas.length; index++) {

                    var item = partidas[index],
                        moneda = item.Moneda + ' ',
                        precio = item.Precio,
                        precioConDescuento = item.PrecioDescuento,
                        importe = item.Importe,
                        tipoCambio = item.TipoCambio;

                    if (codigoMonedaSeleccionada != codigoMonedaPredeterminada && moneda == codigoMonedaPredeterminada) { // Si orden viene en USD y producto en MXP
                        me.mandaMensaje(APP.core.config.Locale.config.lan.onSeleccionarTransaccionTitle,
                        APP.core.config.Locale.config.lan.onSeleccionarTransaccionMsg);
                        return;
                    }                    

                    partidas[index].cantidad = partidas[index].Cantidad;
                    partidas[index].importe = APP.core.FormatCurrency.currency(importe, codigoMonedaSeleccionada);
                    partidas[index].totalDeImpuesto = partidas[index].TotalImpuesto;
                    partidas[index].Imagen = 'http://' + localStorage.getItem("dirIP") + partidas[index].Imagen;
                    partidas[index].moneda = partidas[index].Moneda + ' ';
                    partidas[index].precioConDescuento = APP.core.FormatCurrency.currency(precioConDescuento, codigoMonedaSeleccionada);
                    partidas[index].Precio = APP.core.FormatCurrency.currency(precio, codigoMonedaSeleccionada);
                    partidas[index].nombreMostrado = Ext.String.ellipsis(partidas[index].NombreArticulo, 25, false);
                    partidas[index].PorcentajeDescuento = partidas[index].PorcentajeDescuento + '%';
                    partidas[index].esOrdenRecuperada = true;
                }

                var monedas = Ext.getStore('Monedas'),
                    indMoneda = monedas.find('CodigoMoneda', codigoMonedaSeleccionada.trim());

                me.estableceMonedaPredeterminada(monedas.getAt(indMoneda));

                store.setData(partidas);

                store.each(function (item, index, length) {
                    codigo = item.get('CodigoArticulo');                    
                    ind = productos.find('CodigoArticulo', codigo);
                    if (ind != -1) { // Validamos que el elemento de la orden esté en los elementos actuales del store.
                    } else {
                        productos.add(item); // Si no está lo agregamos.
                    }
                });

                boton.setText(APP.core.config.Locale.config.lan.NavigationOrden.agregar);
                me.getMainCard().setActiveItem(1); // Activamos el item 1 del menu principal navigationorden                
                me.getMainCard().getActiveItem().getNavigationBar().setTitle(idCliente); //Establecemos el title del menu principal como el mismo del menu de opciones
                me.getMainCard().getActiveItem().down('opcionesorden').setActiveItem(0); //Establecemos como activo el item 0 del tabpanel.
                me.actualizarTotales();
                barraTitulo.title = view.down('toolbar').getTitle();
                me.getMainCard().getActiveItem().add(barraTitulo);
            }
        });

    },

    /**
    * Busca la transacción representada por la cadena establecida en el textfield.
    * @param button Éste botón.
    */
    onBuscarTransaccion: function (button) {
        var me = this,
            store = Ext.getStore('Transacciones'),
            idCliente = me.getMenuNav().getNavigationBar().getTitle(),
            value = button.up('toolbar').down('#buscarTransacciones').getValue();

        store.resetCurrentPage();
        store.setParams({
            Criterio: value,
            CardCode: idCliente
        });

        store.load();
    },

    /**
    * LImpia el textfield asociado a las transacciones.
    */
    limpiaBusquedaTransacciones: function () {
        var me = this,
            store = me.getTransaccionList().getStore(),
            idCliente = me.getMenuNav().getNavigationBar().getTitle();


        store.resetCurrentPage();

        store.setParams({
            Criterio: '',
            CardCode: idCliente
        });

        store.load();
    },

    /**
     * Muestra la lista de los almacenes disponibles.
     */
    onListAlmacen: function (t, e, eOpts) {
        var me = this,
            view = me.getMainCard().getActiveItem(),
            value = view.down('agregarproductosform').getValues(),
            idCliente = me.getNavigationOrden().getNavigationBar().getTitle(),
            almacenes = me.getMenuNav().almacenes;//localStorage.getItem('Almacenes');

        view.push({
            xtype: 'almacenlist',
            title: idCliente
        });

        me.getOpcionesOrden().codigoArticulo = value.CodigoArticulo;

        view.down('almacenlist').setData(almacenes);
    },

    /**
    * Reacciona al seleccionar un ítem de la lista de almacenes.
    * Obtiene el disponible del almacén recuperado y lo establece en la form.
    * @param t Ésta list.
    * @param index El índice del ítem tapeado.
    * @param target El elemento o DataItem tapeado.
    * @param El record asociado al ítem.
    */
    onSeleccionarAlmacen: function (t, index, target, record) {
        var me = this,
            view = me.getMainCard().getActiveItem(),
            almacenes = me.getMenuNav().almacenes;

        Ext.Array.forEach(almacenes, function (item, index) {
            item.Predeterminado = false;
        });

        almacenes[index].Predeterminado = true;

        Ext.data.JsonP.request({
            url: "http://" + localStorage.getItem("dirIP") + "/iMobile/COK1_CL_Consultas/ObtenerDisponibleiMobile",
            params: {
                CodigoUsuario: localStorage.getItem('CodigoUsuario'),
                CodigoSociedad: '001',
                CodigoDispositivo: '004',
                ItemCode: me.getOpcionesOrden().codigoArticulo,
                Token: localStorage.getItem("Token"),
                Almacen: record.get('CodigoAlmacen')
            },
            callbackKey: 'callback',
            success: function (response) {

                var procesada = response.Procesada,
                    valor = {
                        Disponible: 'Disponible',
                        NombreAlmacen: record.get('NombreAlmacen'),
                        CodigoAlmacen: record.get('CodigoAlmacen')
                    };

                if (procesada) {
                    valor.Disponible = APP.core.FormatCurrency.formatValue(response.Data[0]);
                } else {
                    valor.Disponible = 'Error al obtener disponible';
                }

                view.down('agregarproductosform').setValues(valor);
                view.pop();
            }
        });
    },

    launch: function () {
        var me = this;
        Ext.getStore('Productos').on('load', me.estableceCantidadAProductos);
    },

    onShowMenu: function () {
        var me = this;        
        document.addEventListener("backbutton", function () {
            me.back = this;
            me.getMainCard().setActiveItem(0);
        }, false);
    },

    onShowListOrden: function () {
        this.getOpcionesOrden().down('partidacontainer').down('panel').bodyElement.getFirstChild().setStyle('background-color', 'gray')
        var list = this.getOpcionesOrden().down('partidacontainer').down('panel').bodyElement;
        if (list.down('#datos_orden') == undefined) {
            list.createChild('<div id="datos_orden" style="margin-top: -91%; height: 100%; background-color: gray; text-align: center;">' +
                '<img src="" width="30%" height="30%" style="margin-bottom: 3%; margin-top: 7%;">' +
                '<div style="display: table; text-align: left; font-size: 10px; z-index: 0;">' +
                '<div style="display: table-row;">' +
                '<div id="cliente_id" style="display: table-cell;  padding-left: 10px; width: 50%;">' + APP.core.config.Locale.config.lan.onShowListOrden.transaccion + '</div>' +
                '<div style="display: table-cell; padding-right: 10px; width: 50%; padding-left: 15px;">' + APP.core.config.Locale.config.lan.onShowListOrden.fecha + ' ' + Ext.DateExtras.dateFormat(new Date(), 'd/m/Y') + '</div>' +
                '</div>' +
                '<div style="display: table-row;">' +
                '<div id="codigo_id" style="display: table-cell;  padding-left: 10px; width: 50%;">' + APP.core.config.Locale.config.lan.onShowListOrden.codigoDispositivo + ' ' + localStorage.getItem("CodigoDispositivo") + '</div>' +
                '<div style="display: table-cell; padding-right: 10px; width: 50%; padding-left: 15px;">' + APP.core.config.Locale.config.lan.onShowListOrden.codigoUsuario + ' ' + localStorage.getItem("CodigoUsuario") + '</div>' +
                '</div>' +
                '<div style="display: table-row;">' +
                '<div id="codigo_dispositivo" style="display: table-cell;  padding-left: 10px; width: 50%;">' + APP.core.config.Locale.config.lan.onShowListOrden.nombreDispositivo + ' ' + localStorage.getItem("NombreDispositivo") + '</div>' +
                '<div style="display: table-cell; padding-right: 10px; width: 50%; padding-left: 15px;">' + APP.core.config.Locale.config.lan.onShowListOrden.nombreUsuario + ' ' + localStorage.getItem("NombreUsuario") + '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
        }

        if (localStorage.getItem('imagenorden') != null) {
            list.down('#datos_orden img').dom.setAttribute("src", localStorage.getItem('imagenorden'))
        }
    }
});