/**
 * Created by th3gr4bb3r on 7/21/14.
 */
Ext.define('APP.profile.Phone',{
    extend:'Ext.app.Profile',

    config:{
        name:'phone',
        namespace:'phone',
        controllers:[
            'Login',
            'Menu',
            'Clientes',
            'Ordenes',

            //Rutas y Actividadaes
            'Rutas',

            'Cobranza',
            'Informes',
            'Configuracion',
            'Prospectos'
        ],
        models:[
            'Menu',
            'Cliente',
            'Direccion',
            'Producto',
            'Orden',
            'Moneda',
            'Factura',
            'Total',
            'FormaDePago',
            'Prospecto',
            'Transaccion',

            // Actividades
            'ActividadCalendario',

            // Rutas
            'RutaCalendario',
            'RutaCalendarioDirecciones'
        ],
        stores:[
            'Menu',
            'Clientes',
            'Productos',
            'Direcciones',
            'Ordenes',
            'Monedas',
            'Facturas',
            'Anticipos',
            'Totales',
            'FormasDePago',
            'Prospectos',
            'Transacciones',

            // Actividades
            'ActividadesCalendario',

            // Rutas
            'RutasCalendario'
        ],
        views:[
            'MainCard',
            'configuracion.ConfiguracionPanel',
            'menu.MenuNav',
            'menu.MenuList',
            'login.LoginPanel',
            'login.LoginForm',
            'clientes.ClientesList',
            'ordenes.OpcionOrdenesList',
            'ordenes.OrdenList',

            'ordenes.AlmacenList',
            'ordenes.ClienteContainer',
            'ordenes.DireccionEntregaContainer',
            'ordenes.DireccionEntregaList',
            'ordenes.DireccionesContainer',            
            'ordenes.DireccionesList',
            'ordenes.DireccionFiscalContainer',
            'ordenes.DireccionFiscalList',
            'ordenes.MonedasList',
            'ordenes.NavigationOrden',
            'ordenes.OpcionesOrdenPanel',
            'ordenes.OrdenContainer',
            'ordenes.PartidaContainer',
            'ordenes.TplDirecciones',
            'ordenes.TransaccionList',
            'productos.ProductosOrden',
            'productos.ProductosView',
            'productos.ProductosList',
            'cobranza.CobranzaList',
            'cobranza.FacturasContainer',
            'cobranza.FacturasList',
            'cobranza.FormasDePagoList',
            'cobranza.MontoAPagarFormContainer',
            'cobranza.NavigationCobranza',
            'cobranza.TotalAPagarContainer',
            'cobranza.TotalesContainer',
            'cobranza.VisualizacionCobranzaList',
            'cobranza.TotalAPagarList',            
            'prospectos.ProspectosList',

            //Rutas y actividades
            'rutas.OpcionRutasActividades',

            //Actividades
            'rutas.actividades.ActividadesCalendario',
            'rutas.actividades.ActividadesCalendarioCont',
            'rutas.actividades.ActividadesCalendarioDia',
            'APP.form.phone.rutas.ActividadesForm',

            //Rutas
            'rutas.rutas.RutasCalendarioCont',
            'rutas.rutas.RutasCalendario',
            'rutas.rutas.RutasCalendarioDia',
            'rutas.rutas.RutasCalendarioDirecciones',
            'rutas.rutas.RutasCalendarioMapa',
            'APP.form.phone.rutas.RutasForm',

            'APP.form.phone.pedidos.EditarPedidoForm',
            'APP.form.phone.clientes.ClienteForm',
            'APP.form.phone.productos.AgregarProductosForm',
            'APP.form.phone.cobranza.MontoAPagarForm',
            'APP.form.phone.prospectos.ProspectosForm'


        ]
    },

    isActive: function () {
        return Ext.os.is.Phone;
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));
    }
});