/**
 * Created by Alí on 9/1/14.
 */
Ext.define('APP.controller.phone.Informes', {
    extend: 'Ext.app.Controller',    
    config:{
    	refs:{
            menuNav: 'menunav'    		
    	},

    	control: {
    		'list':{
    			itemtap: 'muestraOpcionElegida'
    		}/*,
    		'analisisventaslist':{
    			itemtap: 'muestraOpcionElegida'
    		}*/
    	}
    },

    muestraOpcionElegida: function (list, index, target, record){
    	var me = this,
    		view = me.getMenuNav();

    	switch (record.data.action){
    		case 'bitacoraVendedores':
    			view.push({
    				html: 'Bitácora de vendedores'
    			});

    			break;

    		case 'analisisVentas':
    			view.push({
    				xtype: 'analisisventaslist'
    				//title: 'Análisis de Ventas'
    			});
    			
    			break;

    		case 'analisisClientes':
    			view.push({
    				xtype: 'informesform'
    			})

    			me.estableceFechaDesde(view.getActiveItem().down('#fechaDesde').getValue());
    	}
    },

    estableceFechaDesde: function (fechaInicio){

    	if(fechaInicio.getMonth() == 0){
    		fechaInicio.setMonth(11);
    		fechaInicio.setYear(fechaInicio.getYear() - 1);
    	}

    	fechaInicio.setMonth(fechaInicio.getMonth() - 1);
    }
});