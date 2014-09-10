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
            'Rutas',
            'Cobranza',
            'Informes',
            'Configuracion',
            'Prospectos',
            'Informes'
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
            'RutaCalendario',
//            'APP.core.data.Language',

            'ActividadCalendario'
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
            'RutasCalendario',
//            'APP.core.data.Languages',

            'ActividadesCalendario'
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
            'informes.InformesList',
            'informes.AnalisisVentasList',            
            'APP.form.phone.informes.InformesForm',

            'rutas.OpcionRutasActividades',
            'rutas.actividades.ActividadesCalendario',
            'rutas.actividades.ActividadesCalendarioCont',
            'rutas.actividades.ActividadesCalendarioDia',
            'APP.form.phone.rutas.ActividadesForm',

            'rutas.OpcionRutasList',
            'rutas.RutasCalendario',
            'rutas.RutasCalendarioCont',
            'rutas.RutasCalendarioDia',
            'rutas.RutasMapa',

            'APP.form.phone.pedidos.EditarPedidoForm',
            'APP.form.phone.clientes.ClienteForm',
            'APP.form.phone.productos.AgregarProductosForm',
            'APP.form.phone.cobranza.MontoAPagarForm',
            'APP.form.phone.prospectos.ProspectosForm',

            'APP.form.phone.rutas.RutasForm'
        ]
    },

    isActive: function () {
        return Ext.os.is.Phone;
    },

    launch: function(){
        var me = this; 
    
        Ext.Viewport.add(Ext.create('APP.view.phone.login.LoginPanel'));



/*        setTimeout(function (){
            console.log(Ext.getStore('Languages'));
        }, 200);*/
    }
});