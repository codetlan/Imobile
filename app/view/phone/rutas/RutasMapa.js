/**
 * @class Imobile.view.clientes.OpcionClienteList
 * @extends Ext.dataview.List
 * Esta es la lista de las opciones que tiene un cliente
 */
Ext.define('APP.view.phone.rutas.RutasMapa', {
    extend: 'Ext.Container',
    xtype: 'rutasmapa',

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'map',
                mapOptions: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 14
                },
                useCurrentLocation: true
            }
        ]
    },

    initialize: function(){
        var me = this;
        me.callParent(arguments);
        this.initMap();
    },

    initMap: function(){

        var mapPanel = this.down('map');
        var gMap = mapPanel.getMap();

        var geo = Ext.create('Ext.util.Geolocation');
        geo.updateLocation(function (g) {
            var marker = new google.maps.Marker({
                map: gMap,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(g._latitude, g._longitude)
            });
        },this);





    }
});